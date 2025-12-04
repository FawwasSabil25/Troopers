import { usePage } from '@inertiajs/react';
import AdminLayout from '../../layouts/troopers/AdminLayout';

type Pengajuan = {
    id: number;
    nama: string;
    email: string;
    telepon: string;
    domisili: string;
    universitas: string;
    jurusan: string;
    semester: string;
    ipk: string;
    durasi: string;
    tanggal_mulai: string;
    minat: string[] | string;
    skill_opsional?: string | null;
    motivasi: string;
    cv_path: string;
    portfolio_url?: string | null;
    portfolio_file?: string | null;
    surat_pengantar?: string | null;
    pengalaman?: string | null;
    tujuan?: string | null;
    tanggal_submit: string;
    status: string;
    catatan_interview?: string | null;
    catatan_tes?: string | null;
};

export default function PendaftarKerjaPraktikDetail() {
    const { props } = usePage();
    const p = props.pengajuan as Pengajuan;

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 mt-8 shadow text-black">
                <button onClick={() => window.history.back()} className="mb-6 text-sm text-gray-500 hover:underline hover:text-[#7c0000]">&lt; Kembali</button>
                <h2 className="text-2xl font-bold mb-6">Informasi Pribadi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-600 mb-1">Nama Lengkap</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.nama}</div>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.email}</div>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">No. Telepon</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.telepon}</div>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Kota Domisili</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.domisili}</div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-6">Informasi Pendidikan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-600 mb-1">Universitas</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.universitas}</div>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Jurusan</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.jurusan}</div>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Semester Saat Ini</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.semester}</div>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">IPK</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.ipk}</div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-6">Preferensi Magang</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-600 mb-1">Durasi Magang</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.durasi}</div>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Tanggal Mulai</label>
                        <div className="bg-gray-100 rounded px-4 py-2">{p.tanggal_mulai}</div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-6">Skill & Minat</h2>
                <div className="mb-6">
                    <label className="block text-gray-600 mb-1">Skill yang dimiliki</label>
                    <div className="bg-gray-100 rounded px-4 py-2">{p.skill_opsional || '-'}</div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 mb-1">Motivasi</label>
                    <div className="bg-gray-100 rounded px-4 py-2 whitespace-pre-line">{p.motivasi}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-600 mb-1">CV</label>
                        <a href={`/storage/${p.cv_path}`} target="_blank" className="text-blue-600 underline block">CV.pdf</a>
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Portfolio</label>
                        <div className="flex gap-2">
                            {p.portfolio_url && (
                                <a href={p.portfolio_url} target="_blank" className="text-blue-600 underline">{p.portfolio_url}</a>
                            )}
                            {p.portfolio_file && (
                                <a href={`/storage/${p.portfolio_file}`} target="_blank" className="text-blue-600 underline">File</a>
                            )}
                        </div>
                    </div>
                </div>
                {p.surat_pengantar && (
                    <div className="mb-8">
                        <label className="block text-gray-600 mb-1">Surat Pengantar</label>
                        <a href={`/storage/${p.surat_pengantar}`} target="_blank" className="text-blue-600 underline">Lihat Surat</a>
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-6">Pertanyaan</h2>
                <div className="mb-6">
                    <label className="block text-gray-600 mb-1">Pengalaman relevan</label>
                    <div className="bg-gray-100 rounded px-4 py-2 whitespace-pre-line">{p.pengalaman || '-'}</div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 mb-1">Tujuan</label>
                    <div className="bg-gray-100 rounded px-4 py-2 whitespace-pre-line">{p.tujuan || '-'}</div>
                </div>
            </div>
        </AdminLayout>
    );
}
