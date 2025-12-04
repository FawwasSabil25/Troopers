<?php

use function Pest\Laravel\get;

it('menampilkan detail lowongan magang', function () {
    $lowongan = \App\Models\LowonganMagang::factory()->create();
    $response = get('/lowongan/detail/' . $lowongan->id);
    $response->assertOk();
    $response->assertSee($lowongan->divisi);
    $response->assertSee('Magang');
});

it('menampilkan detail lowongan kerja praktik', function () {
    $lowongan = \App\Models\LowonganKerjaPraktik::factory()->create();
    $response = get('/lowongan/detail/' . $lowongan->id);
    $response->assertOk();
    $response->assertSee($lowongan->divisi);
    $response->assertSee('Kerja Praktik');
});

it('404 jika id tidak ditemukan', function () {
    $response = get('/lowongan/detail/999999');
    $response->assertNotFound();
});
