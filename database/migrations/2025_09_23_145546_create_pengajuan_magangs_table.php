<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengajuan_magangs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('lowongan_id')->constrained('lowongan_magangs')->onDelete('cascade');
            $table->string('nama');
            $table->string('email');
            $table->string('telepon');
            $table->string('domisili');
            $table->string('universitas');
            $table->string('jurusan');
            $table->string('semester');
            $table->decimal('ipk', 3, 2);
            $table->string('durasi');
            $table->date('tanggal_mulai');
            $table->json('minat');
            $table->string('skill_opsional')->nullable();
            $table->text('motivasi');
            $table->string('cv_path');
            $table->string('portfolio_url')->nullable();
            $table->string('portfolio_file')->nullable();
            $table->text('pengalaman')->nullable();
            $table->text('tujuan')->nullable();
            $table->string('status')->default('Administration');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan_magangs');
    }
};
