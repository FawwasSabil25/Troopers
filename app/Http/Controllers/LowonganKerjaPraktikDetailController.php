<?php

namespace App\Http\Controllers;

use App\Models\LowonganKerjaPraktik;
use Inertia\Inertia;

class LowonganKerjaPraktikDetailController extends Controller
{
    public function show($id)
    {
        $lowongan = LowonganKerjaPraktik::findOrFail($id);
        $lowongan->jenis = 'Kerja Praktik';

        return Inertia::render('main/lowonganDetails', [
            'lowongan' => $lowongan,
            'jobType' => 'kerja_praktik',
        ]);
    }
}

