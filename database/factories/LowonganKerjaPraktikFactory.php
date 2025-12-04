<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\LowonganKerjaPraktik;
use Illuminate\Database\Eloquent\Factories\Factory;

class LowonganKerjaPraktikFactory extends Factory
{
    protected $model = LowonganKerjaPraktik::class;

    public function definition(): array
    {
        return [
            'divisi' => $this->faker->word(),
            'lokasi' => $this->faker->city(),
            'durasi' => $this->faker->numberBetween(1, 12) . ' bulan',
            'tanggal_tutup' => $this->faker->date(),
            'skills' => [$this->faker->word(), $this->faker->word()],
            'requirement' => [$this->faker->sentence(3), $this->faker->sentence(3)],
            'deskripsi' => $this->faker->paragraph(),
        ];
    }
}
