import React, { useState } from "react";
import MainLayout from '../../layouts/troopers/MainLayout';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        // TODO: handle sending reset link
        setTimeout(() => {
            setStatus("Link reset password telah dikirim ke email Anda.");
            setProcessing(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <MainLayout>
            {submitted ? (
                <div className="flex items-center justify-center bg-gradient-to-r from-[#c02425] via-[#cd4695] to-[#9330bd] py-62">
                    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto">
                        <div className="flex-1 flex flex-col justify-center items-center text-white md:items-start md:pr-12">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">Mulai Akselerasikan Karirmu!</h1>
                            <p className="mb-8 text-center md:text-left">Troopers Sebagai Platform Magang Telkomsel untuk Talenta Muda Pilihan</p>
                            <img src="/hero-illustration.png" alt="Karir" className="w-full max-w-md" />
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md flex flex-col items-center">
                                <div className="mb-4">
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="12" fill="#22C55E"/>
                                        <path d="M8 12.5L11 15.5L16 10.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-center text-black mb-2">Berhasil Terkirim!</h2>
                                <p className="text-gray-500 text-center mb-6">Silahkan periksa email kamu dan ikuti petunjuknya untuk melakukan reset kata sandi.</p>
                                <button className="w-full bg-[#df0011] text-white rounded-lg py-3 font-semibold text-lg hover:bg-[#c02425]" onClick={() => window.location.href = '/'}>Kembali ke Beranda</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#a73138] via-[#a33977] to-[#762896]">
                    <main className="flex-1 flex items-center justify-center py-12">
                        <div className="flex w-full items-center justify-center px-50">
                            {/* Left Side - Illustration & Tagline */}
                            <div className="flex-1 text-white text-left pr-0">
                                <h1 className="text-4xl font-bold mb-4 text-left">Mulai Akselerasikan Karirmu!</h1>
                                <p className="text-lg mb-8 text-left">Troopers Sebagai Platform Magang Telkomsel untuk Talenta Muda Pilihan</p>
                                <img src="/assets/illustration-login.png" alt="Ilustrasi" className="w-full max-w-md" />
                            </div>
                            {/* Right Side - Forgot Password Form */}
                            <div className="flex-1 max-w-xl bg-white rounded-2xl shadow-xl px-12 py-10 flex flex-col items-center justify-center">
                                <img src="/assets/forgot-password.png" alt="Forgot Password" className="mb-4 w-32 h-32 object-contain" />
                                <h2 className="font-bold text-3xl mb-2 text-black text-center">Lupa Kata Sandi?</h2>
                                <p className="text-gray-500 mb-6 text-center">Masukkan alamat Email yang terdaftar dengan akun Troopers. Kami akan mengirimkan link untuk melakukan reset kata sandi.</p>
                                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                                <form className="space-y-5 w-full max-w-md" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block font-medium mb-2 text-black">Email</label>
                                        <input type="email" id="email" name="email" placeholder="nama@gmail.com" value={email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#df0011] text-black" required />
                                    </div>
                                    <button type="submit" className="w-full bg-[#df0011] text-white rounded-lg py-3 font-semibold text-lg hover:bg-[#810000]" disabled={processing}>
                                        {processing ? "Mengirim..." : "Kirim"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </MainLayout>
    );
}
