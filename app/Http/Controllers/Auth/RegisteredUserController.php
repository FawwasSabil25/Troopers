<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
    {

    $request->validate([
            'name' => 'required|string|max:255',
            'ktp' => ['required', 'digits:16', 'numeric'],
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => ['required', 'string', 'max:32', 'regex:/^08\d{8,11}$/'],
            'password' => [
                'required',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
                'confirmed',
            ],
            'city' => 'required|string|max:64',
            'education' => 'required|string|max:16',
            'university' => 'required|string|max:64',
            'major' => 'required|string|max:64',
            'semester' => 'required|string|max:2',
        ], [
            'password.regex' => 'Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka.',
            'ktp.digits' => 'Nomor KTP harus terdiri dari 16 digit angka.',
            'ktp.numeric' => 'Nomor KTP hanya boleh berisi angka.',
            'phone.regex' => 'Nomor handphone harus 11-13 digit dan diawali dengan 08.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'ktp' => $request->ktp,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'city' => $request->city,
            'education' => $request->education,
            'university' => $request->university,
            'major' => $request->major,
            'semester' => $request->semester,
            'role' => 'mahasiswa',
        ]);

        event(new Registered($user));
        Auth::login($user);

    if ($request->wantsJson() || $request->expectsJson() || $request->header('Accept') === 'application/json') {
            return response()->json(['success' => true]);
        }

        return redirect()->intended(route('/', absolute: false));   
    }
}
