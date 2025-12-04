<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengajuanMagang extends Model
{
    protected $fillable = [
        'nama', 'email', 'telepon', 'domisili', 'universitas', 'jurusan', 'semester', 'ipk', 'durasi', 'tanggal_mulai',
        'minat', 'skill_opsional', 'motivasi', 'cv_path', 'portfolio_url', 'portfolio_file', 'pengalaman', 'tujuan', 'status', 'user_id', 'lowongan_id',
        'catatan_interview', 'catatan_tes',
    ];

    protected $casts = [
        'minat' => 'array',
        'tanggal_mulai' => 'date',
        'ipk' => 'float',
    ];

    /**
     * Get the user that owns the pengajuan magang.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the lowongan magang for this pengajuan.
     */
    public function lowonganMagang()
    {
        return $this->belongsTo(LowonganMagang::class, 'lowongan_id');
    }
}
