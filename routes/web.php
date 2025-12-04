<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PengajuanMagangController;
use App\Http\Controllers\LowonganMagangController;
use App\Http\Controllers\PengajuanKerjaPraktikController;
use App\Http\Controllers\LowonganKerjaPraktikController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\LowonganMagangPublicController;
use App\Http\Controllers\LowonganMagangDetailController;
use App\Http\Controllers\LowonganKerjaPraktikDetailController;



// Public lowongan magang
Route::get('/lowongan', [LowonganMagangPublicController::class, 'index'])->name('lowongan.public');

// Main Pages
Route::get('/', function () {
    return Inertia::render('main/home');
})->name('home');

// Hapus closure, gunakan controller agar data dikirim ke halaman
Route::get('/lowongan/detail/form/success', function () {
    return Inertia::render('main/applySuccess');
})->name('magang.form.success');

Route::get('/faq', function () {
    return Inertia::render('main/faq');
})->name('faq');

Route::get('/myDashboard', [PengajuanMagangController::class, 'dashboard'])->middleware('auth')->name('My Dashboard');

// Detail lowongan magang
Route::get('/lowongan/detail/{id}', [LowonganMagangDetailController::class, 'show'])->name('lowongan.detail');
Route::get('/kerja-praktik/detail/{id}', [LowonganKerjaPraktikDetailController::class, 'show'])->name('kerja-praktik.detail');



// Admin-only routes
use App\Http\Controllers\PendaftarDetailController;
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/pendaftar', [PengajuanMagangController::class, 'index'])->name('pendaftar');
    Route::get('/pendaftar/{id}', [PendaftarDetailController::class, 'magang'])->name('pendaftar.detail');
    Route::get('/pendaftar-kerja-praktik', [PengajuanKerjaPraktikController::class, 'index'])->name('pendaftar-kerja-praktik');
    Route::get('/pendaftar-kerja-praktik/{id}', [PendaftarDetailController::class, 'kerjaPraktik'])->name('pendaftar-kerja-praktik.detail');
    Route::get('/users', [UsersController::class, 'index'])->name('users.index');
    Route::post('/users', [UsersController::class, 'store'])->name('users.store');
    Route::put('/users/{id}', [UsersController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UsersController::class, 'destroy'])->name('users.destroy');
});
// Update status pengajuan magang
Route::put('/pengajuan-magang/{id}/status', [PengajuanMagangController::class, 'updateStatus'])->name('pengajuan-magang.updateStatus');
// Update notes pengajuan magang
Route::put('/pengajuan-magang/{id}/notes', [PengajuanMagangController::class, 'updateNotes'])->middleware(['auth', 'admin'])->name('pengajuan-magang.updateNotes');
// Pengajuan Magang
Route::post('/pengajuan-magang', [PengajuanMagangController::class, 'store'])->middleware('auth')->name('magang.store');
// Simplified form routes - Require authentication
Route::get('/magang/{id}/form', [PengajuanMagangController::class, 'create'])->middleware('auth')->name('magang.form');

Route::get('/kerja-praktik/{id}/form', [PengajuanKerjaPraktikController::class, 'create'])->middleware('auth')->name('kerja-praktik.form');
Route::post('/pengajuan-kerja-praktik', [PengajuanKerjaPraktikController::class, 'store'])->middleware('auth')->name('pengajuan-kerja-praktik.store');


// Lowongan Magang API
Route::post('/lowongan-magang', [LowonganMagangController::class, 'store'])->name('lowongan-magang.store');
Route::put('/lowongan-magang/{lowongan}', [LowonganMagangController::class, 'update'])->name('lowongan-magang.update');
Route::delete('/lowongan-magang/{lowongan}', [LowonganMagangController::class, 'destroy'])->name('lowongan-magang.destroy');
Route::get('/posisiMagang', [LowonganMagangController::class, 'index'])->name('posisiMagang');

// Lowongan Kerja Praktik API
Route::post('/lowongan-kerja-praktik', [LowonganKerjaPraktikController::class, 'store'])->name('lowongan-kerja-praktik.store');
Route::put('/lowongan-kerja-praktik/{lowongan}', [LowonganKerjaPraktikController::class, 'update'])->name('lowongan-kerja-praktik.update');
Route::delete('/lowongan-kerja-praktik/{lowongan}', [LowonganKerjaPraktikController::class, 'destroy'])->name('lowongan-kerja-praktik.destroy');
Route::get('/posisiKerjaPraktik', [LowonganKerjaPraktikController::class, 'index'])->name('posisiKerjaPraktik');

// Pengajuan Kerja Praktik
Route::post('/pengajuan-kerja-praktik', [PengajuanKerjaPraktikController::class, 'store'])->middleware('auth')->name('kerjapraktik.store');
Route::put('/pengajuan-kerja-praktik/{id}/status', [PengajuanKerjaPraktikController::class, 'updateStatus'])->name('pengajuan-kerja-praktik.updateStatus');
// Update notes pengajuan kerja praktik
Route::put('/pengajuan-kerja-praktik/{id}/notes', [PengajuanKerjaPraktikController::class, 'updateNotes'])->middleware(['auth', 'admin'])->name('pengajuan-kerja-praktik.updateNotes');

// Admin Pages (butuh login + verified)
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/pendaftar', function () {
//         return Inertia::render('admin/pendaftar');
//     })->name('pendaftar');
// });

// Auth Pages
Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');
Route::get('/register', fn() => Inertia::render('auth/register'))->name('register');
Route::get('/forgot-password', fn() => Inertia::render('auth/forgot-password'))->name('password.request');

// Kalau memang masih butuh
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

