<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePengajuanMagangRequest;
use App\Mail\PengajuanStatusChanged;
use App\Models\LowonganMagang;
use App\Models\PengajuanKerjaPraktik;
use App\Models\PengajuanMagang;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PengajuanMagangController extends Controller
{
    public function store(StorePengajuanMagangRequest $request)
    {
        try {
            // Check if user is authenticated
            if (!Auth::check()) {
                return redirect()->route('login')
                    ->with('message', 'Anda harus login untuk mengajukan magang.');
            }

            $data = $request->validated();
            Log::info('PengajuanMagangController@store validated data', $data);
            $data['user_id'] = Auth::id();
            $data['jenis'] = 'Magang';

            // Cek apakah user sudah pernah mengajukan ke lowongan ini
            $existingApplication = PengajuanMagang::where('user_id', Auth::id())
                ->where('lowongan_id', $request->lowongan_id)
                ->first();

            if ($existingApplication) {
                return redirect()->route('My Dashboard')
                    ->with('warning', 'Anda sudah pernah mengajukan ke lowongan ini. Hanya boleh satu pengajuan per lowongan.');
            }
            $data['lowongan_id'] = $request->lowongan_id;

            if ($request->hasFile('cv_path')) {
                $data['cv_path'] = $request->file('cv_path')->store('cv', 'public');
            }

            if ($request->hasFile('portfolio_file')) {
                $data['portfolio_file'] = $request->file('portfolio_file')->store('portfolio', 'public');
            }

            PengajuanMagang::create($data);

            return redirect()->route('My Dashboard')
                ->with('success', 'Pengajuan magang berhasil disimpan');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('PengajuanMagangController@store validation error', [
                'errors' => $e->errors(),
                'input' => $request->all(),
            ]);
            throw $e;
        } catch (\Throwable $e) {
            Log::error('PengajuanMagangController@store general error', [
                'message' => $e->getMessage(),
                'input' => $request->all(),
            ]);
            throw $e;
        }
    }

    public function index()
    {
        $magang = PengajuanMagang::with('lowonganMagang')->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'nama' => $p->nama,
                'email' => $p->email,
                'telepon' => $p->telepon,
                'domisili' => $p->domisili,
                'universitas' => $p->universitas,
                'jurusan' => $p->jurusan,
                'semester' => $p->semester,
                'ipk' => $p->ipk,
                'durasi' => $p->durasi,
                'tanggal_mulai' => $p->tanggal_mulai,
                'minat' => $p->minat,
                'skill_opsional' => $p->skill_opsional,
                'motivasi' => $p->motivasi,
                'cv_path' => $p->cv_path,
                'portfolio_url' => $p->portfolio_url,
                'portfolio_file' => $p->portfolio_file,
                'pengalaman' => $p->pengalaman,
                'tujuan' => $p->tujuan,
                'tanggal_submit' => $p->created_at->format('d/m/Y'),
                'status' => $p->status,
                'catatan_interview' => $p->catatan_interview,
                'catatan_tes' => $p->catatan_tes,
                'jenis' => 'Magang',
                'divisi' => $p->lowonganMagang?->divisi ?? 'N/A',
            ];
        });

        $kp = \App\Models\PengajuanKerjaPraktik::with('lowonganKerjaPraktik')->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'nama' => $p->nama,
                'email' => $p->email,
                'telepon' => $p->telepon,
                'domisili' => $p->domisili,
                'universitas' => $p->universitas,
                'jurusan' => $p->jurusan,
                'semester' => $p->semester,
                'ipk' => $p->ipk,
                'durasi' => $p->durasi,
                'tanggal_mulai' => $p->tanggal_mulai,
                'minat' => $p->minat,
                'skill_opsional' => $p->skill_opsional,
                'motivasi' => $p->motivasi,
                'cv_path' => $p->cv_path,
                'portfolio_url' => $p->portfolio_url,
                'portfolio_file' => $p->portfolio_file,
                'surat_pengantar' => $p->surat_pengantar,
                'pengalaman' => $p->pengalaman,
                'tujuan' => $p->tujuan,
                'tanggal_submit' => $p->created_at->format('d/m/Y'),
                'status' => $p->status,
                'catatan_interview' => $p->catatan_interview,
                'catatan_tes' => $p->catatan_tes,
                'jenis' => 'Kerja Praktik',
                'divisi' => $p->lowonganKerjaPraktik?->divisi ?? 'N/A',
            ];
        });

        $all = $magang->concat($kp);

        return Inertia::render('admin/pendaftar', [
            'pengajuan_magangs' => $all,
        ]);
    }

    public function updateStatus($id)
    {
        request()->validate([
            'status' => ['required', 'string', 'max:50'],
        ]);

        $pengajuan = PengajuanMagang::findOrFail($id);
        $newStatus = request('status');
        $oldStatus = $pengajuan->status;

        if ($newStatus !== $oldStatus) {
            $pengajuan->status = $newStatus;
            $pengajuan->save();

            if (!empty($pengajuan->email)) {
                $pengajuan->load('lowonganMagang');

                Mail::to($pengajuan->email)->send(
                    new PengajuanStatusChanged(
                        $pengajuan->nama,
                        $oldStatus,
                        $newStatus,
                        url('/login'),
                        $pengajuan->lowonganMagang?->divisi,
                        'Magang'
                    )
                );
            }
        }

        return back()->with('success', 'Status berhasil diupdate');
    }

    public function updateNotes($id)
    {
        request()->validate([
            'note_type' => ['required', 'string', 'in:interview,tes'],
            'note_content' => ['nullable', 'string'],
        ]);

        $pengajuan = PengajuanMagang::findOrFail($id);
        
        $noteType = request('note_type');
        $noteContent = request('note_content');
        
        if ($noteType === 'interview') {
            $pengajuan->catatan_interview = $noteContent;
        } elseif ($noteType === 'tes') {
            $pengajuan->catatan_tes = $noteContent;
        }
        
        $pengajuan->save();

        return back()->with('success', 'Catatan berhasil disimpan');
    }

    public function create($id)
    {
        // Check if user is authenticated (middleware should handle this, but double-check)
        if (!Auth::check()) {
            return redirect()->route('login')
                ->with('message', 'Anda harus login terlebih dahulu untuk mengakses form pengajuan magang.');
        }

        $lowongan = LowonganMagang::find($id);
        if (!$lowongan) {
            abort(404, 'Lowongan magang tidak ditemukan');
        }

        // Cek apakah user sudah pernah mengajukan ke lowongan ini
        $existingApplication = PengajuanMagang::where('user_id', Auth::id())
            ->where('lowongan_id', $id)
            ->first();

        if ($existingApplication) {
            return redirect()->route('My Dashboard')
                ->with('warning', 'Anda sudah pernah mengajukan ke lowongan ini. Hanya boleh satu pengajuan per lowongan.');
        }

        return Inertia::render('main/magangFormPage', [
            'lowongan' => $lowongan,
        ]);
    }
    
    public function dashboard()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        // Ambil semua pengajuan magang milik user
        $pengajuanMagangList = PengajuanMagang::where('user_id', $user->id)
            ->with('lowonganMagang')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($p) {
                return [
                    'divisi' => $p->lowonganMagang?->divisi ?? 'N/A',
                    'durasi' => $p->durasi,
                    'tanggal_mulai' => $p->tanggal_mulai instanceof CarbonInterface
                        ? $p->tanggal_mulai->format('d-m-Y')
                        : ($p->tanggal_mulai ? (string) $p->tanggal_mulai : null),
                    'status' => $p->status,
                    'catatan_interview' => $p->catatan_interview,
                    'catatan_tes' => $p->catatan_tes,
                ];
            });

        // Ambil semua pengajuan kerja praktik milik user
        $pengajuanKerjaPraktikList = PengajuanKerjaPraktik::where('user_id', $user->id)
            ->with('lowonganKerjaPraktik')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($p) {
                return [
                    'divisi' => $p->lowonganKerjaPraktik?->divisi ?? 'N/A',
                    'durasi' => $p->durasi,
                    'tanggal_mulai' => $p->tanggal_mulai instanceof CarbonInterface
                        ? $p->tanggal_mulai->format('d-m-Y')
                        : ($p->tanggal_mulai ? (string) $p->tanggal_mulai : null),
                    'status' => $p->status,
                    'catatan_interview' => $p->catatan_interview,
                    'catatan_tes' => $p->catatan_tes,
                ];
            });

        return Inertia::render('main/myDashboard', [
            'pengajuan_magang' => $pengajuanMagangList,
            'pengajuan_kerja_praktik' => $pengajuanKerjaPraktikList,
        ]);
    }
}
