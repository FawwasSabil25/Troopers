import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import MainLayout from '../../layouts/troopers/MainLayout';

interface Lowongan {
    id: number;
    divisi: string;
    lokasi: string;
    skills: string[];
    requirement: string[];
    deskripsi?: string;
}

export default function Lowongan() {
    const { props } = usePage();
    const [activeTab, setActiveTab] = useState<'reguler' | 'kerja_praktik'>('reguler');
    const [filterDivisi, setFilterDivisi] = useState<string>('');
    const [filterLokasi, setFilterLokasi] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    // Read query param ?type=reguler|kerja_praktik to decide default
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        if (type === 'kerja_praktik') setActiveTab('kerja_praktik');
        else setActiveTab('reguler');
    }, []);

    const lowonganRaw: Lowongan[] = useMemo(() => {
        const reguler: Lowongan[] = (props.lowongan_reguler as Lowongan[]) ?? [];
        const kp: Lowongan[] = (props.lowongan_kerja_praktik as Lowongan[]) ?? [];
        return activeTab === 'reguler' ? reguler : kp;
    }, [activeTab, props.lowongan_reguler, props.lowongan_kerja_praktik]);

    // Filtering logic
    const lowongan: Lowongan[] = useMemo(() => {
        return lowonganRaw.filter((l) => {
            // Divisi
            if (filterDivisi && filterDivisi !== 'Semua Divisi' && l.divisi !== filterDivisi) return false;
            // Lokasi
            if (filterLokasi && filterLokasi !== 'Semua Lokasi' && l.lokasi !== filterLokasi) return false;
            // Search (divisi or lokasi or skills)
            if (search) {
                const s = search.toLowerCase();
                if (
                    !(
                        l.divisi?.toLowerCase().includes(s) ||
                        l.lokasi?.toLowerCase().includes(s) ||
                        l.skills?.some((sk) => sk.toLowerCase().includes(s))
                    )
                ) {
                    return false;
                }
            }
            return true;
        });
    }, [lowonganRaw, filterDivisi, filterLokasi, search]);

    return (
        <MainLayout activePage="jobs">
            <section className="-mt-5 min-h-screen bg-[#f9fafb] px-4 py-8">
                <div className="mx-auto max-w-7xl px-4 text-black sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-3xl font-bold sm:text-4xl">
                            {activeTab === 'kerja_praktik' ? 'Lowongan Kerja Praktik' : 'Lowongan Magang Reguler'}
                        </h1>
                        {activeTab === 'reguler' && (
                            <input
                                type="text"
                                placeholder="Cari posisi..."
                                className="h-11 w-full max-w-md rounded-xl bg-white px-4 text-base shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        )}
                    </div>  

                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        {(activeTab === 'reguler' || activeTab === 'kerja_praktik') && (
                            <aside className="w-full flex-shrink-0 rounded-2xl bg-white p-5 shadow md:sticky md:top-32 md:w-64 md:self-start">
                                <h2 className="mb-4 text-2xl font-bold">Filter</h2>
                                {activeTab === 'reguler' && (
                                    <div className="mb-3">
                                        <label className="mb-2 block text-base font-semibold">Divisi</label>
                                        <select
                                            className="w-full rounded-lg border px-3 py-2 text-sm"
                                            value={filterDivisi}
                                            onChange={(e) => setFilterDivisi(e.target.value)}
                                        >
                                            <option value="">Semua Divisi</option>
                                            <option value="Team Management">Team Management</option>
                                            <option value="Data Analyst">Data Analyst</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Risk">Risk</option>
                                            <option value="Audit">Audit</option>
                                            <option value="Business Development">Business Development</option>
                                            <option value="Product & Marketing Management">Product & Marketing Management</option>
                                            <option value="Sales & Customer Management">Sales & Customer Management</option>
                                            <option value="Data Engineering">Data Engineering</option>
                                            <option value="Data Science & Analytics">Data Science & Analytics</option>
                                            <option value="Software Development">Software Development</option>
                                            <option value="IT Infrastructure Management">IT Infrastructure Management</option>
                                            <option value="ICT Security Management">ICT Security Management</option>
                                            <option value="IT Operation">IT Operation</option>
                                            <option value="Project Management">Project Management</option>
                                            <option value="Network Management">Network Management</option>
                                            <option value="Physical Network">Physical Network</option>
                                        </select>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label className="mb-2 block text-base font-semibold">Lokasi</label>
                                    <select
                                        className="w-full rounded-lg border px-3 py-2 text-sm"
                                        value={filterLokasi}
                                        onChange={(e) => setFilterLokasi(e.target.value)}
                                    >
                                        <option value="">Semua Lokasi</option>
                                        <option value="Jakarta">Jakarta</option>
                                        <option value="Bandung">Bandung</option>
                                        <option value="Surabaya">Surabaya</option>
                                    </select>
                                </div>
                            </aside>
                        )}

                        {/* Cards */}
                        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                            {lowongan.length === 0 && (
                                <div className="col-span-2 py-10 text-center text-base text-gray-500">Belum ada lowongan tersedia.</div>
                            )}
                            {lowongan.map((l) => {
                                if (activeTab === 'kerja_praktik') {
                                    // Card for kerja praktik: title is domisili (lokasi), hide penutupan, durasi, and skills
                                    return (
                                        <div key={l.id} className="flex h-fit flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                            {/* Title is domisili */}
                                            <div className="mb-4 flex items-start justify-between">
                                                <h3 className="text-xl font-bold text-gray-900">{l.lokasi}</h3>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                                                <button
                                                    onClick={() => (window.location.href = `/kerja-praktik/detail/${l.id}`)}
                                                    className="w-full min-w-[80px] rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
                                                >
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const formUrl = `/kerja-praktik/${l.id}/form`;
                                                        window.location.href = formUrl;
                                                    }}
                                                    className="w-full rounded-lg bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110 sm:w-auto sm:min-w-[170px]"
                                                >
                                                    Daftar Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }
                                // Card for magang reguler (default): original layout

                                return (
                                    <div key={l.id} className="flex h-fit flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                        {/* Header with title */}
                                        <div className="mb-4 flex items-start justify-between">
                                            <h3 className="text-xl font-bold text-gray-900">{l.divisi}</h3>
                                        </div>
                                        {/* Location only */}
                                        <div className="mb-4">
                                            <div className="mb-1 text-sm text-gray-600">{l.lokasi}</div>
                                        </div>

                                        {/* Skills Tags */}
                                        <div className="mb-6 flex flex-wrap gap-2">
                                            {l.skills &&
                                                l.skills.slice(0, 4).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            {l.skills && l.skills.length > 4 && (
                                                <span className="inline-flex items-center rounded-full border border-red-200 bg-gradient-to-r from-red-50 to-purple-50 px-3 py-1 text-xs font-medium text-red-700">
                                                    {l.skills.length - 4}+ lainnya
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                                            <button
                                                onClick={() => (window.location.href = `/lowongan/detail/${l.id}`)}
                                                className="w-full min-w-[80px] rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
                                            >
                                                Detail
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const formUrl = `/magang/${l.id}/form`;
                                                    window.location.href = formUrl;
                                                    
                                                }}
                                                className="w-full rounded-lg bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110 sm:w-auto sm:min-w-[170px]"
                                            >
                                                Daftar Sekarang
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
