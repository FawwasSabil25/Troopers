<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lowongan_kerja_praktiks', function (Blueprint $table) {
            $table->id();
            $table->string('divisi');
            $table->string('lokasi');
            $table->string('durasi')->nullable();
            $table->date('tanggal_tutup')->nullable();
            $table->json('skills');
            $table->json('requirement');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lowongan_kerja_praktiks');
    }
};




