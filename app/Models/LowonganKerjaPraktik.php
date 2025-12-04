<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LowonganKerjaPraktik extends Model
{
    use HasFactory;
    protected $fillable = [
        'divisi', 'lokasi', 'durasi', 'tanggal_tutup', 'skills', 'requirement', 'deskripsi'
    ];

    protected function casts(): array
    {
        return [
            'skills' => 'array',
            'requirement' => 'array',
            'tanggal_tutup' => 'date',
            'durasi' => 'string',
        ];
    }

    public function pengajuanKerjaPraktiks()
    {
        return $this->hasMany(PengajuanKerjaPraktik::class, 'lowongan_id');
    }
}


