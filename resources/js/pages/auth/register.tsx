import React, { useState } from 'react';
import { AuthFooter, AuthHeader } from '../../layouts/troopers/AuthLayout';

export default function Register() {
    const [step, setStep] = useState(1);
    const [form1, setForm1] = useState({
        name: '',
        ktp: '',
        email: '',
        phone: '',
        password: '',
    });
    const [form2, setForm2] = useState({
        city: '',
        education: '',
        university: '',
        major: '',
        semester: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm1({ ...form1, [e.target.name]: e.target.value });
    };
    const handleChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm2({ ...form2, [e.target.name]: e.target.value });
    };

    // Validasi frontend step 1
    const isValidKtp = /^\d{16}$/.test(form1.ktp);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form1.email);
    const isValidPhone = /^08\d{8,11}$/.test(form1.phone);
    const isValidPasswordLength = form1.password.length >= 8;
    const isValidPasswordUpper = /[A-Z]/.test(form1.password);
    const isValidPasswordLower = /[a-z]/.test(form1.password);
    const isValidPasswordNumber = /[0-9]/.test(form1.password);
    const isValidPassword = isValidPasswordLength && isValidPasswordUpper && isValidPasswordLower && isValidPasswordNumber;
    const canProceedStep1 = form1.name && isValidKtp && isValidEmail && isValidPhone && isValidPassword;

    // Validasi frontend step 2
    const canSubmitStep2 = form2.city && form2.education && form2.university && form2.major && form2.semester;

    // Handler untuk submit form register
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...form1, ...form2, password_confirmation: form1.password };
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setErrors({});
                window.location.href = '/';
            } else if (response.status === 422) {
                const err = await response.json();
                setErrors(err.errors || {});
            } else {
                setErrors({ general: ['Registrasi gagal.'] });
            }
        } catch (error) {
            setErrors({ general: ['Terjadi kesalahan jaringan.'] });
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#a73138] via-[#a33977] to-[#762896]">
            <AuthHeader />
            <main className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-10">
                <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-10 lg:flex-row">
                    {/* Left Side - Illustration & Tagline */}
                    <div className="w-full text-center text-white lg:w-1/2 lg:text-left">
                        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Mulai Akselerasikan Karirmu!</h1>
                        <p className="text-base text-white/80 sm:text-lg">
                            Troopers Sebagai Platform Magang Telkomsel untuk Talenta Muda Pilihan
                        </p>
                        <div className="mt-8 w-full max-w-xs mx-auto sm:max-w-sm lg:max-w-md lg:mx-0">
                            <img src="/Home/ilus.png" alt="Ilustrasi" className="h-auto w-full object-contain" />
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="w-full max-w-xl rounded-2xl bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-10 lg:w-1/2">
                        <h2 className="text-2xl font-bold text-black sm:text-3xl">Daftar</h2>
                        <p className="mb-6 text-sm text-gray-500 sm:text-base">
                            Selamat datang! Pastikan informasi yang anda masukkan benar.
                        </p>
                        {step === 1 && (
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label htmlFor="name" className="mb-2 block font-medium text-black">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Masukkan nama lengkap"
                                        value={form1.name}
                                        onChange={handleChange1}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    />
                                    {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="ktp" className="mb-2 block font-medium text-black">
                                        Nomor KTP
                                    </label>
                                    <input
                                        type="text"
                                        id="ktp"
                                        name="ktp"
                                        placeholder="Masukkan Nomor KTP"
                                        value={form1.ktp}
                                        onChange={handleChange1}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    />
                                    {!isValidKtp && form1.ktp && <div className="mt-1 text-sm text-red-600">Nomor KTP harus 16 digit angka.</div>}
                                    {errors.ktp && <div className="mt-1 text-sm text-red-600">{errors.ktp[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block font-medium text-black">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="nama@gmail.com"
                                        value={form1.email}
                                        onChange={handleChange1}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    />
                                    {!isValidEmail && form1.email && <div className="mt-1 text-sm text-red-600">Format email tidak valid.</div>}
                                    {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="mb-2 block font-medium text-black">
                                        Nomor Handphone (WhatsApp)
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Masukkan nomor"
                                        value={form1.phone}
                                        onChange={handleChange1}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    />
                                    {!isValidPhone && form1.phone && (
                                        <div className="mt-1 text-sm text-red-600">Nomor handphone harus 11 - 13 digit angka dan harus diawali dengan 08.</div>
                                    )}
                                    {errors.phone && <div className="mt-1 text-sm text-red-600">{errors.phone[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="mb-2 block font-medium text-black">
                                        Kata Sandi
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Minimal 8 karakter"
                                        value={form1.password}
                                        onChange={handleChange1}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    />
                                    {form1.password && !isValidPasswordLength && <div className="mt-1 text-sm text-red-600">Password minimal 8 karakter.</div>}
                                    {form1.password && !isValidPasswordUpper && <div className="mt-1 text-sm text-red-600">Password harus mengandung huruf besar.</div>}
                                    {form1.password && !isValidPasswordLower && <div className="mt-1 text-sm text-red-600">Password harus mengandung huruf kecil.</div>}
                                    {form1.password && !isValidPasswordNumber && <div className="mt-1 text-sm text-red-600">Password harus mengandung angka.</div>}
                                    {errors.password && <div className="mt-1 text-sm text-red-600">{errors.password[0]}</div>}
                                </div>
                                <button
                                    type="button"
                                    disabled={!canProceedStep1}
                                    onClick={() => setStep(2)}
                                    className={`w-full rounded-lg bg-[#df0011] py-3 text-lg font-semibold text-white transition hover:bg-[#810000] ${!canProceedStep1 ? 'cursor-not-allowed opacity-50' : ''}`}
                                >
                                    Selanjutnya
                                </button>
                            </form>
                        )}
                        {step === 2 && (
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="city" className="mb-2 block font-medium text-black">
                                        Kota Domisili
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={form2.city}
                                        onChange={handleChange2}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    >
                                        <option value="">Pilih Kota</option>
                                        <option value="Jakarta">Jakarta</option>
                                        <option value="Bandung">Bandung</option>
                                        <option value="Surabaya">Surabaya</option>
                                    </select>
                                    {errors.city && <div className="mt-1 text-sm text-red-600">{errors.city[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="education" className="mb-2 block font-medium text-black">
                                        Jenjang Pendidikan
                                    </label>
                                    <select
                                        id="education"
                                        name="education"
                                        value={form2.education}
                                        onChange={handleChange2}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    >
                                        <option value="">Pilih Jenjang Pendidikan</option>
                                        <option value="D3">D3</option>
                                        <option value="S1">S1</option>
                                        <option value="S2">S2</option>
                                    </select>
                                    {errors.education && <div className="mt-1 text-sm text-red-600">{errors.education[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="university" className="mb-2 block font-medium text-black">
                                        Perguruan Tinggi
                                    </label>
                                    <select
                                        id="university"
                                        name="university"
                                        value={form2.university}
                                        onChange={handleChange2}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    >
                                        <option value="">Pilih Perguruan Tinggi</option>
                                        <option value="UI">Universitas Indonesia</option>
                                        <option value="ITB">Institut Teknologi Bandung</option>
                                        <option value="UGM">Universitas Gadjah Mada</option>
                                    </select>
                                    {errors.university && <div className="mt-1 text-sm text-red-600">{errors.university[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="major" className="mb-2 block font-medium text-black">
                                        Jurusan
                                    </label>
                                    <select
                                        id="major"
                                        name="major"
                                        value={form2.major}
                                        onChange={handleChange2}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    >
                                        <option value="">Pilih Jurusan</option>
                                        <option value="Teknik Informatika">Teknik Informatika</option>
                                        <option value="Manajemen">Manajemen</option>
                                        <option value="Akuntansi">Akuntansi</option>
                                    </select>
                                    {errors.major && <div className="mt-1 text-sm text-red-600">{errors.major[0]}</div>}
                                </div>
                                <div>
                                    <label htmlFor="semester" className="mb-2 block font-medium text-black">
                                        Semester Saat Ini
                                    </label>
                                    <select
                                        id="semester"
                                        name="semester"
                                        value={form2.semester}
                                        onChange={handleChange2}
                                        className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-[#df0011]"
                                    >
                                        <option value="">Pilih Semester</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                    </select>
                                    {errors.semester && <div className="mt-1 text-sm text-red-600">{errors.semester[0]}</div>}
                                </div>
                                {errors.general && errors.general.length > 0 && <div className="mt-2 text-sm text-red-600">{errors.general[0]}</div>}
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-full rounded-lg border border-[#df0011] px-4 py-3 text-lg font-semibold text-[#df0011] transition hover:border-[#810000] hover:text-[#810000]"
                                    >
                                        Kembali
                                    </button>
                                    <button
                                        type="submit"
                                        className={`w-full rounded-lg bg-[#df0011] py-3 text-lg font-semibold text-white transition hover:bg-[#810000] ${!canSubmitStep2 ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!canSubmitStep2}
                                    >
                                        Daftar
                                    </button>
                                </div>
                            </form>
                        )}
                        <div className="mt-6 text-center">
                            <span className="text-sm text-gray-500 sm:text-base">
                                Sudah punya akun?{' '}
                                <a href="login" className="font-semibold text-[#df0011] underline transition hover:text-[#810000]">
                                    Masuk
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </main>
            <AuthFooter />
        </div>
    );
}
