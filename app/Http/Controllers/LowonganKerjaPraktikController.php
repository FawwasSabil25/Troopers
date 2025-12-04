<?php

namespace App\Http\Controllers;

use App\Models\LowonganKerjaPraktik;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LowonganKerjaPraktikController extends Controller
{
    public function index()
    {
        $lowongan = LowonganKerjaPraktik::all();
        return Inertia::render('admin/posisiKerjaPraktik', [
            'lowongan' => $lowongan,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'divisi' => ['required', 'string', 'max:255'],
            'lokasi' => ['required', 'string', 'max:255'],
            'durasi' => ['nullable', 'string', 'max:255'],
            'tanggal_tutup' => ['nullable', 'date'],
            'skills' => ['required', 'array'],
            'requirement' => ['required', 'array'],
            'deskripsi' => ['nullable', 'string'],
        ]);
        LowonganKerjaPraktik::create($data);
        return back()->with('success', 'Lowongan Kerja Praktik berhasil ditambahkan');
    }

    public function update(Request $request, LowonganKerjaPraktik $lowongan)
    {
        $data = $request->validate([
            'divisi' => ['required', 'string', 'max:255'],
            'lokasi' => ['required', 'string', 'max:255'],
            'durasi' => ['nullable', 'string', 'max:255'],
            'tanggal_tutup' => ['nullable', 'date'],
            'skills' => ['required', 'array'],
            'requirement' => ['required', 'array'],
            'deskripsi' => ['nullable', 'string'],
        ]);
        $lowongan->update($data);
        return back()->with('success', 'Lowongan Kerja Praktik berhasil diupdate');
    }

    public function destroy(LowonganKerjaPraktik $lowongan)
    {
        $lowongan->delete();
        return back()->with('success', 'Lowongan Kerja Praktik berhasil dihapus');
    }
}




