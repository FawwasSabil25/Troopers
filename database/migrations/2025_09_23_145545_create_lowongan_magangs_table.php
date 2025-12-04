<?php
// This migration file is a renamed version of the original create_lowongan_magangs_table migration.
// The timestamp is set to be before pengajuan_magangs to ensure correct foreign key order.

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
        Schema::create('lowongan_magangs', function (Blueprint $table) {
            $table->id();
            $table->string('divisi');
            $table->string('lokasi');
            $table->string('durasi');
            $table->date('tanggal_tutup');
            $table->json('skills');
            $table->json('requirement');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lowongan_magangs');
    }
};
