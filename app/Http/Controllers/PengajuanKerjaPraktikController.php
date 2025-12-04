<?php

namespace App\Http\Controllers;

use App\Mail\PengajuanStatusChanged;
use App\Models\LowonganKerjaPraktik;
use App\Models\PengajuanKerjaPraktik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PengajuanKerjaPraktikController extends Controller
{
    public function store(Request $request)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login')
                ->with('message', 'Anda harus login untuk mengajukan kerja praktik.');
        }

        $data = $request->validate([
            'lowongan_id' => ['required', 'exists:lowongan_kerja_praktiks,id'],
            'nama' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'telepon' => ['required', 'string', 'max:50'],
            'domisili' => ['required', 'string', 'max:255'],
            'universitas' => ['required', 'string', 'max:255'],
            'jurusan' => ['required', 'string', 'max:255'],
            'semester' => ['required', 'string', 'max:50'],
            'ipk' => ['required', 'numeric', 'between:0,4.00'],
            'durasi' => ['required', 'string', 'max:255'],
            'tanggal_mulai' => ['required', 'date'],
            'minat' => ['required', 'array'],
            'skill_opsional' => ['nullable', 'string', 'max:255'],
            'motivasi' => ['required', 'string'],
            'cv_path' => ['required', 'file'],
            'surat_pengantar' => ['required', 'file', 'mimes:pdf', 'max:2048'],
            'portfolio_url' => ['nullable', 'string', 'max:255'],
            'portfolio_file' => ['nullable', 'file'],
            'pengalaman' => ['nullable', 'string'],
            'tujuan' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'max:50'],
        ]);

        // Cek apakah user sudah pernah mengajukan ke lowongan ini
        $existingApplication = PengajuanKerjaPraktik::where('user_id', Auth::id())
            ->where('lowongan_id', $request->lowongan_id)
            ->first();

        if ($existingApplication) {
            return redirect()->route('My Dashboard')
                ->with('warning', 'Anda sudah pernah mengajukan ke lowongan ini. Hanya boleh satu pengajuan per lowongan.');
        }

        $data['user_id'] = Auth::id();
        if (empty($data['status'])) {
            $data['status'] = 'Administration';
        }
        $data['jenis'] = 'Kerja Praktik';

        if ($request->hasFile('cv_path')) {
            $data['cv_path'] = $request->file('cv_path')->store('cv', 'public');
        }

        if ($request->hasFile('surat_pengantar')) {
            $data['surat_pengantar'] = $request->file('surat_pengantar')->store('surat_pengantar', 'public');
        }

        if ($request->hasFile('portfolio_file')) {
            $data['portfolio_file'] = $request->file('portfolio_file')->store('portfolio', 'public');
        }

        PengajuanKerjaPraktik::create($data);

        return redirect()->route('My Dashboard')->with('success', 'Pengajuan kerja praktik berhasil disimpan');
    }

    public function index()
    {
        $pengajuan = PengajuanKerjaPraktik::with('lowonganKerjaPraktik')->get()->map(function ($p) {
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
                'divisi' => $p->lowonganKerjaPraktik?->divisi ?? 'N/A',
            ];
        });
        
        return Inertia::render('admin/pendaftarKerjaPraktik', [
            'pengajuan' => $pengajuan,
        ]);
    }

    public function updateStatus($id)
    {
        request()->validate([
            'status' => ['required', 'string', 'max:50'],
        ]);

        $pengajuan = PengajuanKerjaPraktik::findOrFail($id);
        $newStatus = request('status');
        $oldStatus = $pengajuan->status;

        if ($newStatus !== $oldStatus) {
            $pengajuan->status = $newStatus;
            $pengajuan->save();

            if (!empty($pengajuan->email)) {
                $pengajuan->load('lowonganKerjaPraktik');

                Mail::to($pengajuan->email)->send(
                    new PengajuanStatusChanged(
                        $pengajuan->nama,
                        $oldStatus,
                        $newStatus,
                        url('/login'),
                        $pengajuan->lowonganKerjaPraktik?->divisi,
                        'Kerja Praktik'
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

        $pengajuan = PengajuanKerjaPraktik::findOrFail($id);
        
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
                ->with('message', 'Anda harus login terlebih dahulu untuk mengakses form pengajuan kerja praktik.');
        }

        $lowongan = LowonganKerjaPraktik::find($id);
        if (!$lowongan) {
            abort(404, 'Lowongan kerja praktik tidak ditemukan');
        }

        // Cek apakah user sudah pernah mengajukan ke lowongan ini
        $existingApplication = PengajuanKerjaPraktik::where('user_id', Auth::id())
            ->where('lowongan_id', $id)
            ->first();

        if ($existingApplication) {
            return redirect()->route('My Dashboard')
                ->with('warning', 'Anda sudah pernah mengajukan ke lowongan ini. Hanya boleh satu pengajuan per lowongan.');
        }

        return Inertia::render('main/kerjaPraktikFormPage', [
            'lowongan' => $lowongan,
        ]);
    }
}

