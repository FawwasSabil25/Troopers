<?php

declare(strict_types=1);

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;
use App\Models\User;
use App\Models\LowonganKerjaPraktik;

it('can submit kerja praktik with surat pengantar', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $lowongan = LowonganKerjaPraktik::factory()->create();

    actingAs($user);

    $cv = UploadedFile::fake()->create('cv.pdf', 100, 'application/pdf');
    $surat = UploadedFile::fake()->create('surat_pengantar.pdf', 100, 'application/pdf');

    $data = [
        'lowongan_id' => $lowongan->id,
        'nama' => 'Test User',
        'email' => 'test@example.com',
        'telepon' => '08123456789',
        'domisili' => 'Jakarta',
        'universitas' => 'UI',
        'jurusan' => 'Teknik',
        'semester' => '6',
        'ipk' => 3.5,
        'durasi' => '6 bulan',
        'tanggal_mulai' => now()->toDateString(),
        'minat' => ['IT'],
        'skill_opsional' => null,
        'motivasi' => 'Motivasi',
        'cv_path' => $cv,
        'surat_pengantar' => $surat,
        'portfolio_url' => null,
        'portfolio_file' => null,
        'pengalaman' => null,
        'tujuan' => null,
        'status' => null,
    ];

    $response = post(route('kerjapraktik.store'), $data);

    $response->assertRedirect(route('My Dashboard'));
    expect(Storage::disk('public')->exists('cv/' . $cv->hashName()))->toBeTrue();
    expect(Storage::disk('public')->exists('surat_pengantar/' . $surat->hashName()))->toBeTrue();
});
