<?php

namespace App\Http\Controllers;

use App\Models\LowonganMagang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LowonganMagangController extends Controller
{
    public function index()
    {
        $lowongan = LowonganMagang::all();
        return Inertia::render('admin/posisiMagang', [
            'lowongan' => $lowongan,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/lowongan/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'divisi' => ['required', 'string', 'max:255'],
            'lokasi' => ['required', 'string', 'max:255'],
            'durasi' => ['required', 'string', 'max:255'],
            'tanggal_tutup' => ['required', 'date'],
            'skills' => ['required', 'array'],
            'requirement' => ['required', 'array'],
            'deskripsi' => ['nullable', 'string'],
        ]);
    LowonganMagang::create($data);
    return redirect()->route('posisiMagang')->with('success', 'Lowongan berhasil ditambahkan');
    }

    public function edit(LowonganMagang $lowongan)
    {
        return Inertia::render('admin/lowongan/Edit', [
            'lowongan' => $lowongan,
        ]);
    }

    public function update(Request $request, LowonganMagang $lowongan)
    {
        $data = $request->validate([
            'divisi' => ['required', 'string', 'max:255'],
            'lokasi' => ['required', 'string', 'max:255'],
            'durasi' => ['required', 'string', 'max:255'],
            'tanggal_tutup' => ['required', 'date'],
            'skills' => ['required', 'array'],
            'requirement' => ['required', 'array'],
            'deskripsi' => ['nullable', 'string'],
        ]);
    $lowongan->update($data);
    return redirect()->route('posisiMagang')->with('success', 'Lowongan berhasil diupdate');
    }

    public function destroy(LowonganMagang $lowongan)
    {
        $lowongan->delete();
        return redirect()->route('posisiMagang')->with('success', 'Lowongan berhasil dihapus');
    }
}
