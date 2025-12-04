<?php

namespace App\Http\Controllers;

use App\Models\LowonganMagang;
use Inertia\Inertia;

class LowonganMagangDetailController extends Controller
{
    public function show($id)
    {
        $lowongan = LowonganMagang::findOrFail($id);
        $lowongan->jenis = 'Magang';

        return Inertia::render('main/lowonganDetails', [
            'lowongan' => $lowongan,
            'jobType' => 'magang',
        ]);
    }
}

