import React, { useState } from "react";

export function AuthHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto w-full max-w-10xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <img src="/troopers.png" alt="Troopers" className="h-8 w-auto" />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 transition hover:text-[#C02425] focus:outline-none focus:ring-2 focus:ring-[#C02425] lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="auth-header-menu"
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <nav className="hidden items-center gap-6 font-medium lg:flex">
            <a href="/" className="text-[#000000] transition hover:text-[#C02425]">Beranda</a>
            <a href="/lowongan" className="text-[#000000] transition hover:text-[#C02425]">Lowongan Tersedia</a>
            <a href="#" className="text-[#000000] transition hover:text-[#C02425]">FAQ</a>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="/register"
              className="rounded-md bg-[#df0011] px-6 py-2 font-semibold text-white transition hover:bg-[#850c0c]"
            >
              Daftar
            </a>
            <a
              href="/login"
              className="rounded-md border border-[#C02425] px-6 py-2 font-semibold text-[#C02425] transition hover:bg-[#850202] hover:text-white"
            >
              Masuk
            </a>
          </div>
        </div>

        <div
          id="auth-header-menu"
          className={`lg:hidden ${menuOpen ? 'mt-4 space-y-4 border-t border-gray-200 pt-4' : 'hidden'}`}
        >
          <nav className="flex flex-col gap-3 font-medium">
            <a href="/" onClick={closeMenu} className="text-[#000000] transition hover:text-[#C02425]">Beranda</a>
            <a href="/lowongan" onClick={closeMenu} className="text-[#000000] transition hover:text-[#C02425]">Lowongan Tersedia</a>
            <a href="#" onClick={closeMenu} className="text-[#000000] transition hover:text-[#C02425]">FAQ</a>
          </nav>
          <div className="flex flex-col gap-3 pt-4">
            <a
              href="/register"
              onClick={closeMenu}
              className="rounded-md bg-[#df0011] px-4 py-2 text-center font-semibold text-white transition hover:bg-[#850c0c]"
            >
              Daftar
            </a>
            <a
              href="/login"
              onClick={closeMenu}
              className="rounded-md border border-[#C02425] px-4 py-2 text-center font-semibold text-[#C02425] transition hover:bg-[#850202] hover:text-white"
            >
              Masuk
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AuthFooter() {
  return (
    <footer className="bg-[#525252] text-gray-300">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">Telkomsel</h3>
            <p className="mt-2 text-sm sm:text-base">
              Jl. Gatot Subroto No.Kav. 52, RT.6/RW.1, Kuningan Bar., Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12710
            </p>
            <p className="mt-6 text-xs sm:text-sm">Copyright Ac2023 All rights reserved</p>
          </div>
          <div className="max-w-xl">
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Temukan lebih banyak tentang <br />
              <span className="text-2xl sm:text-3xl">#LifeAtTelkomsel</span>
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 sm:text-base">
              <a href="#" className="flex items-center gap-2 transition hover:text-white">
                <img src="/insta.png" alt="Instagram" className="h-6 w-6" />
                @lifeattelkomsel
              </a>
              <a href="#" className="flex items-center gap-2 transition hover:text-white">
                <img src="/tt.png" alt="TikTok" className="h-6 w-6" />
                @lifeattelkomsel
              </a>
              <a href="#" className="flex items-center gap-2 transition hover:text-white">
                <img src="/yt.png" alt="YouTube" className="h-6 w-6" />
                Telkomsel
              </a>
              <a href="#" className="flex items-center gap-2 transition hover:text-white">
                <img src="/x.png" alt="X" className="h-6 w-6" />
                @telkomsel
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      {children}
      <AuthFooter />
    </>
  );
}
