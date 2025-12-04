<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengajuanKerjaPraktik extends Model
{
    protected $fillable = [
        'nama', 'email', 'telepon', 'domisili', 'universitas', 'jurusan', 'semester', 'ipk', 'durasi', 'tanggal_mulai',
        'minat', 'skill_opsional', 'motivasi', 'cv_path', 'surat_pengantar', 'portfolio_url', 'portfolio_file', 'pengalaman', 'tujuan', 'status', 'user_id', 'lowongan_id',
        'catatan_interview', 'catatan_tes',
    ];

    protected $casts = [
        'minat' => 'array',
        'tanggal_mulai' => 'date',
        'ipk' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function lowonganKerjaPraktik()
    {
        return $this->belongsTo(LowonganKerjaPraktik::class, 'lowongan_id');
    }
}

