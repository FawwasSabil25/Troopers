import { useState, ChangeEvent, FormEvent } from "react";
import { router } from '@inertiajs/react';
import { AuthHeader, AuthFooter } from "../../layouts/troopers/AuthLayout";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemember = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    router.post('/login', { ...form, remember }, {
      onSuccess: (page: any) => {
        const user = page?.props?.auth?.user;
        if (user && user.role === 'admin') {
          router.visit('/pendaftar');
        } else {
          router.visit('/');
        }
      },
      onError: (err) => {
        const newErrors: { [key: string]: string[] } = {};
        let credentialError = false;
        if (err && typeof err === 'object') {
          Object.entries(err).forEach(([key, val]) => {
            if (Array.isArray(val)) {
              newErrors[key] = val
                .map(String)
                .filter((msg) => !msg.includes('credentials do not match'));
            } else if (val && typeof val === 'string' && !val.includes('credentials do not match')) {
              newErrors[key] = [String(val)];
            }
          });
          const allMessages = Object.values(err).flat();
          if (allMessages.some((msg) => typeof msg === 'string' && msg.includes('credentials do not match'))) {
            credentialError = true;
          }
        }
        if (credentialError) {
          newErrors.general = ['Email atau password salah.'];
        } else if (!newErrors.general) {
          newErrors.general = ['Login gagal.'];
        }
        setErrors(newErrors);
      },
      onFinish: () => {
        setProcessing(false);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#ac000b] via-[#a33977] to-[#762896]">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-10">
        <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-10 lg:flex-row lg:items-center">
          <div className="w-full text-white text-center lg:w-1/2 lg:text-left">
            <h1 className="text-3xl font-bold mb-4 sm:text-4xl">Mulai Akselerasikan Karirmu!</h1>
            <p className="text-base text-white/80 sm:text-lg">Troopers Sebagai Platform Magang Telkomsel untuk Talenta Muda Pilihan</p>
            <div className="mt-8 w-full max-w-xs mx-auto sm:max-w-sm lg:max-w-md lg:mx-0">
              <img src="/Home/ilus.png" alt="Ilustrasi" className="w-full h-auto object-contain" />
            </div>
          </div>

          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-6 py-8 sm:px-10 sm:py-10 lg:w-1/2">
            <h2 className="font-bold text-2xl text-black sm:text-3xl">Masuk</h2>
            <p className="text-gray-500 mb-6">Selamat datang kembali!</p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block font-medium mb-2 text-black">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="nama@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#df0011] text-black"
                />
                {errors.email && Array.isArray(errors.email) && (
                  <div className="text-red-600 text-sm mt-1">{errors.email[0]}</div>
                )}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block font-medium mb-2 text-black">Kata Sandi</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Minimal 8 karakter"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#df0011] text-black pr-12"
                />
                {errors.password && Array.isArray(errors.password) && (
                  <div className="text-red-600 text-sm mt-1">{errors.password[0]}</div>
                )}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-[#df0011]"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? (
                    <img src="/showpw.png" alt="Hide Password" className="flex py-1" />
                  ) : (
                    <img src="/hidepw.png" alt="Show Password" className="flex py-1" />
                  )}
                </button>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor="remember" className="flex items-center gap-2 text-black">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={handleRemember}
                    className="accent-[#df0011]"
                  />
                  Ingat saya
                </label>
                <a href="/forgot-password" className="text-sm text-gray-500 hover:text-[#df0011]">
                  Lupa kata sandi?
                </a>
              </div>
              {errors.general && Array.isArray(errors.general) && (
                <div className="text-red-600 text-sm">{errors.general[0]}</div>
              )}
              <button
                type="submit"
                className="w-full bg-[#df0011] text-white rounded-lg py-3 font-semibold text-lg hover:bg-[#810000]"
                disabled={processing}
              >
                {processing ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
            <div className="text-center mt-6">
              <span className="text-gray-500">
                Belum punya akun?{' '}
                <a href="register" className="text-[#df0011] font-semibold underline hover:text-[#810000]">
                  Daftar
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
