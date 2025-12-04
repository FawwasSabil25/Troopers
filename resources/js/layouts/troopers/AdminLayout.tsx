import { Link, usePage, router } from '@inertiajs/react';
import React from 'react';

const menu = [
    { name: 'Pendaftar', href: '/pendaftar', key: 'pendaftar', highlight: true },
    { name: 'Posisi Magang', href: '/posisiMagang', key: 'posisiMagang', highlight: true },
    { name: 'Posisi KP', href: '/posisiKerjaPraktik', key: 'posisiKerjaPraktik', highlight: true },
    { name: 'Daftar Pengguna', href: '/users', key: 'pengguna', highlight: true },
];

function classNames(...classes: (string | false | null | undefined)[]) {
    return classes.filter((c): c is string => Boolean(c)).join(' ');
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { props, url } = usePage<{ auth?: { user?: { name?: string; email?: string } } }>();
    const user = props?.auth?.user ?? null;
    const [showPopup, setShowPopup] = React.useState(false);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const activeKey = menu
        .filter((item) => url.startsWith(item.href))
        .sort((a, b) => b.href.length - a.href.length)[0]?.key ?? '';

    function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        router.post('/logout', {}, {
            onSuccess: () => {
                router.visit('/');
            },
        });
    }

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        }
        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    React.useEffect(() => {
        setIsSidebarOpen(false);
    }, [url]);

    React.useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <div className="flex min-h-screen">
                <div
                    className={classNames(
                        'fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden',
                        isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden={!isSidebarOpen}
                />

                <aside
                    className={classNames(
                        'fixed inset-y-0 left-0 z-50 w-72 max-w-full transform bg-white px-4 py-6 shadow-lg transition-transform duration-200',
                        'md:static md:flex md:w-64 md:translate-x-0 md:flex-col',
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
                    )}
                >
                    <div className="mb-10 flex items-center gap-3 px-2">
                        <img src="/troopers.png" alt="Troopers Logo" className="h-10" />
                        
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                        <ul className="space-y-2">
                            {menu.map((item) => (
                                <li key={item.key}>
                                    <Link
                                        href={item.href}
                                        className={classNames(
                                            'relative flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium transition',
                                            activeKey === item.key
                                                ? 'bg-[#ffe6e9] font-bold text-[#df0011]'
                                                : 'text-gray-700 hover:bg-gray-100',
                                        )}
                                    >
                                        {item.highlight && activeKey === item.key && (
                                            <span className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-[#df0011]" />
                                        )}
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <div className="flex flex-1 flex-col">
                    <header className="flex items-center justify-between bg-white px-4 py-4 shadow md:px-8 md:py-6">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#df0011] md:hidden"
                                onClick={() => setIsSidebarOpen((prev) => !prev)}
                                aria-label="Toggle navigation"
                                aria-expanded={isSidebarOpen}
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        <div className="relative flex items-center gap-3">
                            <button
                                className={classNames(
                                    'flex items-center gap-2 rounded-lg px-2 py-1 transition focus:outline-none focus:ring-2 focus:ring-[#df0011]',
                                    showPopup ? 'bg-gray-100' : 'hover:bg-gray-100',
                                )}
                                onClick={() => setShowPopup((show) => !show)}
                                aria-label="User menu"
                                aria-expanded={showPopup}
                            >
                                <img src="/userIcon.png" alt="User" className="h-12 w-12 rounded-full" />
                                <span className="hidden text-left text-sm font-semibold text-[#df0011] sm:block">
                                    {user?.name ?? ''}
                                </span>
                            </button>
                            {showPopup && (
                                <div
                                    ref={popupRef}
                                    className="absolute right-0 top-16 z-50 min-w-[220px] rounded-lg border border-[#bebebe] bg-white p-6 shadow-lg"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <img src="/userIcon.png" alt="User" className="h-16 w-16 rounded-full" />
                                        <div className="w-full text-center text-base font-semibold text-[#df0011]">
                                            {user?.name ?? ''}
                                        </div>
                                        <div className="w-full text-center text-sm text-gray-500">{user?.email ?? ''}</div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full rounded-md bg-[#df0011] py-2 text-sm font-semibold text-white transition hover:bg-[#850c0c]"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </div>
    );
}

export function MainFooter() {
    return (
        <footer className="bg-[#525252] px-6 py-10 text-gray-300 sm:px-12 lg:px-20 lg:py-13">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                    <h3 className="mb-2 text-2xl font-bold text-white lg:text-3xl">Telkomsel</h3>
                    <p className="mb-2 text-sm lg:text-base">
                        Jl. Gatot Subroto No.Kav. 52, RT.6/RW.1, Kuningan Bar., Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus
                        Ibukota Jakarta 12710
                    </p>
                    <p className="mt-6 text-xs lg:mt-10 lg:text-sm">Copyright 2023 All rights reserved</p>
                </div>
                <div className="max-w-md">
                    <h3 className="mb-2 text-lg font-bold text-white lg:pr-20 lg:text-lg">
                        Temukan lebih banyak tentang <br />
                        <span className="text-2xl text-white lg:text-3xl">#LifeAtTelkomsel</span>
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-3 text-base sm:grid-cols-2 sm:gap-x-8">
                        <a href="#" className="flex items-center gap-2 hover:text-white">
                            <img src="/insta.png" alt="Instagram" />
                            @lifeattelkomsel
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-white">
                            <img src="/tt.png" alt="TikTok" />
                            @lifeattelkomsel
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-white">
                            <img src="/yt.png" alt="YouTube" />
                            Telkomsel
                        </a>
                        <a href="#" className="flex items-center gap-2 hover:text-white">
                            <img src="/x.png" alt="X" />
                            @telkomsel
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
