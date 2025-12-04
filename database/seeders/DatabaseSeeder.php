<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Akun admin (menggunakan kolom role = 'admin')
        User::factory()->create([
            'name' => 'Admin',
            'ktp' => '1111111111111111',
            'email' => 'admin@troopers.com',
            'phone' => '087300546277',
            'city' => 'Bernhardchester',
            'education' => 'S1',
            'university' => 'Cronin PLC University',
            'major' => 'Teknik Informatika',
            'semester' => 5,
            'role' => 'admin',
            'email_verified_at' => now(),
            'password' => bcrypt('Admin12345'),
        ]);
    }
}
