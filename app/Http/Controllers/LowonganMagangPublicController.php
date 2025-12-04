<?php

namespace App\Http\Controllers;

use App\Models\LowonganMagang;
use App\Models\LowonganKerjaPraktik;
use Inertia\Inertia;

class LowonganMagangPublicController extends Controller
{
    public function index()
    {
        $reguler = LowonganMagang::all();
        $kerjaPraktik = LowonganKerjaPraktik::all();
        return Inertia::render('main/lowongan', [
            'lowongan_reguler' => $reguler,
            'lowongan_kerja_praktik' => $kerjaPraktik,
        ]);
    }

    public function show($id)
    {
        $lowongan = LowonganMagang::findOrFail($id);

        return Inertia::render('main/lowonganDetails', [
            'lowongan' => $lowongan,
        ]);
    }
}
