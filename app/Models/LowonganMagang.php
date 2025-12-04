<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LowonganMagang extends Model
{
    protected $fillable = [
        'divisi', 'lokasi', 'durasi', 'tanggal_tutup', 'skills', 'requirement', 'deskripsi'
    ];

    protected function casts(): array
    {
        return [
            'skills' => 'array',
            'requirement' => 'array',
            'tanggal_tutup' => 'date',
        ];
    }

    /**
     * Get all pengajuan magang for this lowongan.
     */
    public function pengajuanMagangs()
    {
        return $this->hasMany(PengajuanMagang::class, 'lowongan_id');
    }
}
