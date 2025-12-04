<?php

namespace App\Http\Controllers;

use App\Models\PengajuanMagang;
use App\Models\PengajuanKerjaPraktik;
use Inertia\Inertia;

class PendaftarDetailController extends Controller
{
    public function magang($id)
    {
        $p = PengajuanMagang::findOrFail($id);
        return Inertia::render('admin/pendaftarMagangDetail', [
            'pengajuan' => [
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
            ]
        ]);
    }

    public function kerjaPraktik($id)
    {
        $p = PengajuanKerjaPraktik::findOrFail($id);
        return Inertia::render('admin/pendaftarKerjaPraktikDetail', [
            'pengajuan' => [
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
            ]
        ]);
    }
}
