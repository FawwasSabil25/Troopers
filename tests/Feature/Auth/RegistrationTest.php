<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class RegistrationTest extends TestCase
{
    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get(route('register'));
        $response->assertStatus(200);
    }

    public function test_new_users_can_register()
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'ktp' => '1234567890123456',
            'email' => 'test@example.com',
            'phone' => '08123456789',
            'password' => 'password',
            'password_confirmation' => 'password',
            'city' => 'Jakarta',
            'education' => 'S1',
            'university' => 'UI',
            'major' => 'Teknik Informatika',
            'semester' => '5',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}