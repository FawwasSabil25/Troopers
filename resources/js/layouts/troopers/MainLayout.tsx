﻿﻿﻿import { usePage } from '@inertiajs/react';
import React from 'react';
import FlashMessage from '../../components/FlashMessage';

type AuthUser = {
    name: string;
    email: string;
    // add other user properties if needed
};

type PageProps = {
    auth?: {
        user?: AuthUser;
    };
    // add other props if needed
};

export function MainHeader({ activePage = '' }: { activePage?: string }) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;
    const [showPopup, setShowPopup] = React.useState(false);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const navItems = [
        { key: 'home', label: 'Beranda', href: '/' },
        { key: 'jobs', label: 'Lowongan', href: '/lowongan' },
        { key: 'faq', label: 'FAQ', href: '/faq' },
    ];
    const [showJobsDropdown, setShowJobsDropdown] = React.useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

    function handleNavigate(href: string) {
        setIsMobileNavOpen(false);
        setShowPopup(false);
        window.location.href = href;
    }

    function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/logout';
        form.style.display = 'none';
        const csrf = document.createElement('input');
        csrf.type = 'hidden';
        csrf.name = '_token';
        csrf.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        form.appendChild(csrf);
        document.body.appendChild(form);
        form.addEventListener('submit', function () {
            setTimeout(() => {
                window.location.href = '/';
            });
        });
        form.submit();
    }
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white py-4 text-lg shadow-lg">
            <div className="mx-auto flex w-full max-w-10xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="flex items-center gap-2">
                    <img src="/troopers.png" alt="Troopers" className="h-8" />
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-[#df0011] p-2 text-[#df0011] hover:bg-[#df0011] hover:text-white focus:outline-none md:hidden"
                    onClick={() => {
                        setIsMobileNavOpen((open) => !open);
                        setShowPopup(false);
                    }}
                    aria-label="Toggle navigation"
                    aria-expanded={isMobileNavOpen}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <nav className="hidden items-center gap-6 font-medium md:flex">
                    {navItems.map((item) => {
                        if (item.key !== 'jobs') {
                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className={
                                        item.key === activePage
                                            ? 'justify-cente relative flex items-center text-xl font-semibold text-[#df0011]'
                                            : 'text-[#000000] hover:text-[#C02425]'
                                    }
                                >
                                    {item.label}
                                    {item.key === activePage && (
                                        <span className="absolute -bottom-5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#df0011]"></span>
                                    )}
                                </a>
                            );
                        }
                        return (
                            <div key={item.key} className="relative">
                                <button
                                    onClick={() => {
                                        if (activePage !== 'jobs') {
                                            window.location.href = '/lowongan';
                                        } else {
                                            setShowJobsDropdown((prev) => !prev);
                                        }
                                    }}
                                    className={
                                        item.key === activePage
                                            ? 'relative flex items-center justify-center text-xl font-semibold text-[#df0011]'
                                            : 'text-[#000000] hover:text-[#C02425]'
                                    }
                                >
                                    <span className="flex items-center">
                                        Lowongan
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`ml-1 h-4 w-4 transition-transform duration-200 ${showJobsDropdown ? 'rotate-180' : ''}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                    {item.key === activePage && (
                                        <span className="absolute -bottom-5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#df0011]"></span>
                                    )}
                                </button>
                                {activePage === 'jobs' && showJobsDropdown && (
                                    <div className="absolute top-9 left-1/2 z-50 min-w-[220px] -translate-x-1/2 rounded-lg border border-[#bebebe] bg-white p-2 shadow-lg">
                                        {['reguler', 'kerja_praktik'].map((type) => {
                                            const isActive = new URLSearchParams(window.location.search).get('type') === type;
                                            const label = type === 'reguler' ? 'Lowongan Magang' : 'Lowongan Kerja Praktik';
                                            return (
                                                <button
                                                    key={type}
                                                    onClick={() => {
                                                        window.location.href = `/lowongan?type=${type}`;
                                                    }}
                                                    className={`w-full text-sm rounded-md px-4 py-2 text-left text-[#000000] hover:bg-gray-100 ${isActive ? 'bg-[#a70000] text-white' : ''}`}
                                                >
                                                    {label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {user && (
                        <a
                            key="My Dashboard"
                            href="/myDashboard"
                            className={
                                activePage === 'myDashboard'
                                    ? 'relative flex items-center justify-center text-xl font-semibold text-[#df0011]'
                                    : 'text-[#000000] hover:text-[#C02425]'
                            }
                        >
                            <span className="relative flex w-full items-center justify-center">
                                My Dashboard
                                {activePage === 'myDashboard' && (
                                    <span className="absolute -bottom-5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#df0011]"></span>
                                )}
                            </span>
                        </a>
                    )}
                </nav>
                <nav className="hidden items-center gap-2 md:flex lg:pr-12">
                    {!user ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleNavigate('/register')}
                                className="ml-2 rounded-md bg-[#df0011] px-8 py-2 font-semibold text-white hover:bg-[#850c0c]"
                            >
                                Daftar
                            </button>
                            <button
                                onClick={() => handleNavigate('/login')}
                                className="ml-2 rounded-md border border-[#C02425] bg-white px-8 py-2 font-semibold text-[#C02425] hover:bg-[#850202] hover:text-white"
                            >
                                Masuk
                            </button>
                        </div>
                    ) : (
                        <div className="relative flex items-center gap-2">
                            <button
                                className={`flex items-center gap-2 focus:outline-none ${showPopup ? 'rounded-lg bg-[#f1f1f1]' : ''}`}
                                onClick={() => setShowPopup((show) => !show)}
                                aria-label="User menu"
                            >
                                <img src="/userIcon.png" alt="User" className="w-10 rounded-full" />
                                <span className="font-semibold text-[#df0011]">{user?.name ?? ''}</span>
                            </button>
                            {showPopup && (
                                <div
                                    ref={popupRef}
                                    className="absolute top-11 -right-8 z-50 flex min-w-[220px] flex-col items-center rounded-lg border border-[#bebebe] bg-white p-6 shadow-lg"
                                >
                                    <img src="/userIcon.png" alt="User" className="mb-4 w-16 rounded-full" />
                                    <div className="mb-2 w-full text-center text-lg font-semibold text-[#df0011]">{user?.name ?? ''}</div>
                                    <div className="mb-4 w-full text-center text-sm text-gray-500">{user?.email ?? ''}</div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full rounded-md bg-[#df0011] py-2 font-semibold text-white hover:bg-[#850c0c]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </div>
            {isMobileNavOpen && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <nav className="flex flex-col gap-4 px-4 py-4 text-base font-medium">
                        {navItems.map((item) => {
                            if (item.key !== 'jobs') {
                                const isActive = item.key === activePage;
                                return (
                                    <button
                                        key={item.key}
                                        onClick={() => handleNavigate(item.href)}
                                        className={`rounded-md px-3 py-2 text-left ${isActive ? 'bg-[#fde7ed] font-semibold text-[#df0011]' : 'text-[#000000]'}`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            }
                            
                            // Special handling for jobs dropdown on mobile
                            const isJobsActive = item.key === activePage;
                            const currentType = new URLSearchParams(window.location.search).get('type');
                            const isRegulerActive = currentType === 'reguler';
                            const isKerjaPraktikActive = currentType === 'kerja_praktik';
                            
                            return (
                                <div key={item.key} className="flex flex-col">
                                    <button
                                        onClick={() => {
                                            if (isJobsActive) {
                                                setShowJobsDropdown(!showJobsDropdown);
                                            } else {
                                                handleNavigate('/lowongan');
                                            }
                                        }}
                                        className={`flex items-center justify-between rounded-md px-3 py-2 text-left ${isJobsActive ? 'bg-[#fde7ed] font-semibold text-[#df0011]' : 'text-[#000000]'}`}
                                    >
                                        <span>Lowongan</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`h-4 w-4 transition-transform duration-200 ${isJobsActive && showJobsDropdown ? 'rotate-180' : ''}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {isJobsActive && showJobsDropdown && (
                                        <div className="ml-4 mt-2 flex flex-col gap-2 border-l-2 border-gray-200 pl-3">
                                            <button
                                                onClick={() => handleNavigate('/lowongan?type=reguler')}
                                                className={`rounded-md px-3 py-2 text-left text-sm ${isRegulerActive ? 'bg-[#fde7ed] font-semibold text-[#df0011]' : 'text-[#000000]'}`}
                                            >
                                                Lowongan Magang
                                            </button>
                                            <button
                                                onClick={() => handleNavigate('/lowongan?type=kerja_praktik')}
                                                className={`rounded-md px-3 py-2 text-left text-sm ${isKerjaPraktikActive ? 'bg-[#fde7ed] font-semibold text-[#df0011]' : 'text-[#000000]'}`}
                                            >
                                                Lowongan Kerja Praktik
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {user && (
                            <button
                                onClick={() => handleNavigate('/myDashboard')}
                                className={`rounded-md px-3 py-2 text-left ${activePage === 'myDashboard' ? 'bg-[#fde7ed] font-semibold text-[#df0011]' : 'text-[#000000]'}`}
                            >
                                My Dashboard
                            </button>
                        )}
                    </nav>
                    <div className="flex flex-col gap-3 px-4 pb-4">
                        {!user ? (
                            <>
                                <button
                                    onClick={() => handleNavigate('/register')}
                                    className="w-full rounded-md bg-[#df0011] px-4 py-2 font-semibold text-white hover:bg-[#850c0c]"
                                >
                                    Daftar
                                </button>
                                <button
                                    onClick={() => handleNavigate('/login')}
                                    className="w-full rounded-md border border-[#C02425] px-4 py-2 font-semibold text-[#C02425] hover:bg-[#850202] hover:text-white"
                                >
                                    Masuk
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <div className="text-sm text-gray-600">Masuk sebagai <span className="font-semibold text-[#df0011]">{user?.name ?? ''}</span></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full rounded-md bg-[#df0011] px-4 py-2 font-semibold text-white hover:bg-[#850c0c]"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export function MainFooter() {
    return (
        <footer className="bg-[#525252] px-6 py-10 text-gray-300 sm:px-10 md:px-20">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-2 sm:px-4 md:flex-row md:items-start md:justify-between">
                <div className="text-center md:max-w-md md:text-left">
                    <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Telkomsel</h3>
                    <p className="mb-2 text-sm sm:text-base">
                        Jl. Gatot Subroto No.Kav. 52, RT.6/RW.1, Kuningan Bar., Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota
                        Jakarta 12710
                    </p>
                    <p className="mt-6 text-xs sm:mt-10 sm:text-sm">Copyright 2023 All rights reserved</p>
                </div>
                <div className="text-center md:max-w-md md:text-left">
                    <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
                        Temukan lebih banyak tentang <br className="hidden md:block" />
                        <span className="text-2xl text-white sm:text-3xl">#LifeAtTelkomsel</span>
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-y-3 text-base sm:grid-cols-2 sm:gap-x-8 sm:text-lg">
                        <a href="#" className="flex items-center justify-center gap-2 hover:text-white md:justify-start">
                            <img src="/insta.png" alt="Instagram" />
                            @lifeattelkomsel
                        </a>
                        <a href="#" className="flex items-center justify-center gap-2 hover:text-white md:justify-start">
                            <img src="/tt.png" alt="TikTok" />
                            @lifeattelkomsel
                        </a>
                        <a href="#" className="flex items-center justify-center gap-2 hover:text-white md:justify-start">
                            <img src="/yt.png" alt="YouTube" />
                            Telkomsel
                        </a>
                        <a href="#" className="flex items-center justify-center gap-2 hover:text-white md:justify-start">
                            <img src="/x.png" alt="X" />
                            @telkomsel
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function MainLayout({ children, activePage }: { children: React.ReactNode; activePage?: string }) {
    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
            <MainHeader activePage={activePage} />
            <FlashMessage />
            <main className="flex-1 pt-20">{children}</main>
            <MainFooter />
        </div>
    );
}
