<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengajuan_kerja_praktiks', function (Blueprint $table) {
            $table->string('surat_pengantar')->nullable()->after('cv_path');
        });
    }

    public function down(): void
    {
        Schema::table('pengajuan_kerja_praktiks', function (Blueprint $table) {
            $table->dropColumn('surat_pengantar');
        });
    }
};
