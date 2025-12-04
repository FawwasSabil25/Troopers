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
        Schema::table('pengajuan_magangs', function (Blueprint $table) {
            $table->text('catatan_interview')->nullable()->after('status');
            $table->text('catatan_tes')->nullable()->after('catatan_interview');
        });

        Schema::table('pengajuan_kerja_praktiks', function (Blueprint $table) {
            $table->text('catatan_interview')->nullable()->after('status');
            $table->text('catatan_tes')->nullable()->after('catatan_interview');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengajuan_magangs', function (Blueprint $table) {
            $table->dropColumn(['catatan_interview', 'catatan_tes']);
        });

        Schema::table('pengajuan_kerja_praktiks', function (Blueprint $table) {
            $table->dropColumn(['catatan_interview', 'catatan_tes']);
        });
    }
};