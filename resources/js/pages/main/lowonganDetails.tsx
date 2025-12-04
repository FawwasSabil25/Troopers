import MainLayout from '../../layouts/troopers/MainLayout';
import { usePage } from '@inertiajs/react';

interface Lowongan {
    id: number;
    divisi: string;
    lokasi: string;
    skills: string[];
    requirement: string[];
    deskripsi?: string;
    benefit?: string[];
    pelaksanaan?: string;
    jenis?: 'Magang' | 'Kerja Praktik';
}

export default function LowonganDetails() {
    const { props } = usePage();
    const lowongan: Lowongan = props.lowongan as Lowongan;

    // Tentukan URL form daftar sesuai jenis lowongan
    let daftarUrl = '';
    if (lowongan.jenis === 'Kerja Praktik') {
        daftarUrl = `/kerja-praktik/${lowongan.id}/form`;
    } else {
        // Default ke magang jika tidak ada jenis
        daftarUrl = `/magang/${lowongan.id}/form`;
    }

    return (
        <MainLayout activePage="jobs">
            <div className="min-h-screen bg-[#f9fafb] px-2 py-6 sm:px-4 sm:py-10 -mt-2">
                <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-3 text-black shadow sm:p-6 md:p-8 lg:p-10">
                    <button className="mb-6 text-[#df0011] font-semibold text-base sm:text-lg" onClick={() => window.history.back()}>&larr; Kembali</button>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 w-full">
                        <h1 className="w-full text-2xl font-bold leading-tight break-words sm:text-3xl md:text-4xl lg:text-5xl">{lowongan.divisi}</h1>
                        <img src="/troopers.png" alt="Telkomsel" className="hidden sm:block h-10 sm:h-12 max-w-[120px]" style={{height:'auto'}} />
                    </div>
                    <div className="mb-8 rounded-xl border border-[#cd4695] bg-white p-3 text-base sm:text-lg lg:text-xl">
                        <div className="break-words"><b>Lokasi</b> : {lowongan.lokasi}</div>
                        {lowongan.pelaksanaan && (
                            <div className="mb-2 break-words"><b>Pelaksanaan</b> : {lowongan.pelaksanaan}</div>
                        )}
                    </div>
                    <div className="mb-6 break-words">
                        <h2 className="text-2xl font-bold mb-2 sm:text-3xl">Deskripsi</h2>
                        <div className="text-base leading-relaxed sm:text-lg lg:text-xl">{lowongan.deskripsi}</div>
                    </div>
                    <div className="mb-6 break-words">
                        <h2 className="text-2xl font-bold mb-2 sm:text-3xl">Requirement</h2>
                        <ul className="list-none space-y-2">
                            {lowongan.requirement && lowongan.requirement.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base sm:text-lg">
                                    <span className="mt-1 text-[#df0011]">&#9679;</span>
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Static Benefit section for Kerja Praktik */}
                    {lowongan.jenis === 'Kerja Praktik' && (
                        <div className="mb-10 break-words">
                            <h2 className="text-2xl font-bold mb-2 sm:text-3xl">Benefit</h2>
                            <ul className="list-disc marker:text-[#df0011] pl-5 space-y-2 text-base sm:text-lg">
                                <li>Pengalaman nyata bekerja di lingkungan profesional.</li>
                                <li>Kesempatan mengintegrasikan teori perkuliahan dengan praktik industri.</li>
                                <li>Sertifikat atau surat keterangan kerja praktik.</li>
                                <li>Networking dengan profesional industri</li>
                                <li>Penilaian kerja praktik dapat digunakan untuk kebutuhan akademis.</li>
                            </ul>
                        </div>
                    )}

                    {lowongan.jenis !== 'Kerja Praktik' && (
                        <div className="mb-6 break-words">
                            <h2 className="text-2xl font-bold mb-2 sm:text-3xl">Skill</h2>
                            <div className="flex flex-wrap gap-2">
                                {lowongan.skills && lowongan.skills.map((skill, idx) => (
                                    <span key={idx} className="rounded-full bg-[#f8d7da] px-3 py-1 text-sm font-semibold text-[#df0011] sm:px-4 sm:py-1.5 sm:text-base">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row w-full">
                        <button
                            onClick={() => window.location.href = daftarUrl}
                            className="w-full rounded-xl bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-6 py-3 text-base font-semibold text-white shadow transition hover:brightness-90 sm:w-auto sm:px-10 sm:text-lg lg:px-16 lg:text-xl"
                        >
                            Daftar Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
