import { useMemo, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import NotesModal from '../../components/NotesModal';
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
    pengalaman?: string | null;
    tujuan?: string | null;
    tanggal_submit: string;
    status: string;
    catatan_interview?: string | null;
    catatan_tes?: string | null;
    surat_pengantar?: string | null;
    jenis: 'Magang' | 'Kerja Praktik';
    divisi?: string; // nama divisi lowongan
};

type StatusOption = {
    value: string;
    label: string;
    color: string;
    optionBg: string;
    optionText: string;
};

const statusOptions: StatusOption[] = [
    {
        value: 'Belum Diproses',
        label: 'Belum Diproses',
        color: 'bg-gray-100 text-gray-800',
        optionBg: '#f3f4f6',
        optionText: '#374151',
    },
    {
        value: 'Interview',
        label: 'Interview',
        color: 'bg-blue-100 text-blue-800',
        optionBg: '#e0f2fe',
        optionText: '#2563eb',
    },
    {
        value: 'Tes',
        label: 'Tes',
        color: 'bg-yellow-100 text-yellow-800',
        optionBg: '#fef9c3',
        optionText: '#ca8a04',
    },
    {
        value: 'Ditolak',
        label: 'Ditolak',
        color: 'bg-red-100 text-red-800',
        optionBg: '#fee2e2',
        optionText: '#dc2626',
    },
    {
        value: 'Diterima',
        label: 'Diterima',
        color: 'bg-green-100 text-green-800',
        optionBg: '#dcfce7',
        optionText: '#16a34a',
    },
];

const fallbackStatusOption: StatusOption = {
    value: '',
    label: '',
    color: 'bg-gray-100 text-gray-800',
    optionBg: '#f3f4f6',
    optionText: '#374151',
};

function getStatusOption(status: string): StatusOption {
    return statusOptions.find((opt) => opt.value === status) || fallbackStatusOption;
}

export default function Pendaftar({ pengajuan_magangs = [] }: { pengajuan_magangs: Pengajuan[] }) {
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [filterJenis, setFilterJenis] = useState('Semua');
    const [notesModal, setNotesModal] = useState({
        isOpen: false,
        pengajuanId: null as number | null,
        noteType: '',
        currentNote: '',
        applicantName: '',
        anchorEl: null as HTMLElement | null,
    });

    const [statusLoading, setStatusLoading] = useState<number | null>(null);

    const closeNotesModal = () =>
        setNotesModal({
            isOpen: false,
            pengajuanId: null,
            noteType: '',
            currentNote: '',
            applicantName: '',
            anchorEl: null,
        });

    const openNotesModal = (id: number, type: string, note: string, name: string, anchor: HTMLElement) => {
        setNotesModal({
            isOpen: true,
            pengajuanId: id,
            noteType: type,
            currentNote: note,
            applicantName: name,
            anchorEl: anchor,
        });
    };

    const filtered = useMemo(() => {
        return pengajuan_magangs.filter(
            (p) => (filterStatus === 'Semua' || p.status === filterStatus) && (filterJenis === 'Semua' || p.jenis === filterJenis),
        );
    }, [pengajuan_magangs, filterStatus, filterJenis]);

    const handleStatusSelect = (id: number, value: string) => {
        setStatusLoading(id);
        // Cari pengajuan berdasarkan id
        const pengajuan = pengajuan_magangs.find((p) => p.id === id);
        let endpoint = '';
        if (pengajuan?.jenis === 'Kerja Praktik') {
            endpoint = `/pengajuan-kerja-praktik/${id}/status`;
        } else {
            endpoint = `/pengajuan-magang/${id}/status`;
        }
        router.put(
            endpoint,
            { status: value },
            {
                preserveScroll: true,
                onFinish: () => setStatusLoading(null),
            }
        );
    };

    return (
        <AdminLayout>
            <div className="rounded-2xl bg-white p-4 text-black shadow sm:p-6 lg:p-8">
                {/* Header + Filter */}
                <div className="mb-6 flex flex-col gap-2 md:gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Kelola Lamaran</h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="rounded-lg border px-3 py-2 text-sm"
                        >
                            <option value="Semua">Semua Status</option>
                            {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filterJenis}
                            onChange={(e) => setFilterJenis(e.target.value as 'Semua' | 'Magang' | 'Kerja Praktik')}
                            className="rounded-lg border px-3 py-2 text-sm"
                        >
                            <option value="Semua">Jenis</option>
                            <option value="Magang">Magang</option>
                            <option value="Kerja Praktik">Kerja Praktik</option>
                        </select>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 text-xs tracking-wider text-gray-500 uppercase">
                                <tr className="border-b">
                                    <th className="px-4 py-3">No</th>
                                    <th className="px-4 py-3">Nama</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Divisi</th>
                                    <th className="px-4 py-3">Jenis</th>
                                    <th className="px-4 py-3">Tanggal Submit</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Catatan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-gray-500">
                                            Belum ada pendaftar.
                                        </td>
                                    </tr>
                                )}
                                {filtered.map((p: Pengajuan, idx: number) => {
                                    const statusOption = getStatusOption(p.status);
                                    return (
                                        <tr key={p.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                            <td className="px-4 py-3">{idx + 1}</td>
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={p.jenis === 'Magang'
                                                        ? `/pendaftar/${p.id}`
                                                        : `/pendaftar-kerja-praktik/${p.id}`}
                                                    className="text-blue-600 hover:underline cursor-pointer"
                                                >
                                                    {p.nama}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">{p.email}</td>
                                            <td className="px-4 py-3">{p.divisi ?? '-'}</td>
                                            <td className="px-4 py-3">{p.jenis === 'Magang' ? 'Regular' : 'Praktik Kerja'}</td>
                                            <td className="px-4 py-3">{p.tanggal_submit}</td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={p.status}
                                                    onChange={e => handleStatusSelect(p.id, e.target.value)}
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusOption.color} ${statusLoading === p.id ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                    style={{ backgroundColor: statusOption.optionBg, color: statusOption.optionText }}
                                                    disabled={statusLoading === p.id}
                                                >
                                                    {statusOptions.map(opt => (
                                                        <option
                                                            key={opt.value}
                                                            value={opt.value}
                                                            style={{ backgroundColor: opt.optionBg, color: opt.optionText }}
                                                        >
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                {(p.status === 'Interview' || p.status === 'Tes') && (
                                                    <div className="flex gap-2">
                                                        {p.status === 'Interview' && (
                                                            <button
                                                                onClick={e => openNotesModal(p.id, 'interview', p.catatan_interview || '', p.nama, e.currentTarget)}
                                                                className="rounded bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-600"
                                                                title="Catatan Interview"
                                                            >
                                                                Catatan Interview
                                                            </button>
                                                        )}
                                                        {p.status === 'Tes' && (
                                                            <button
                                                                onClick={e => openNotesModal(p.id, 'tes', p.catatan_tes || '', p.nama, e.currentTarget)}
                                                                className="rounded bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-green-600"
                                                                title="Catatan Tes"
                                                            >
                                                                Catatan Tes
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card List */}
                <div className="flex flex-col gap-4 md:hidden">
                    {filtered.length === 0 ? (
                        <div className="rounded-xl bg-white py-8 text-center text-gray-500 shadow">Belum ada pendaftar.</div>
                    ) : (
                        filtered.map((p: Pengajuan, idx: number) => (
                            <div key={p.id} className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-base font-bold">
                                        {idx + 1}. 
                                        <Link
                                            href={p.jenis === 'Magang'
                                                ? `/pendaftar/${p.id}`
                                                : `/pendaftar-kerja-praktik/${p.id}`}
                                            className="text-blue-600 hover:underline cursor-pointer"
                                        >
                                            {p.nama}
                                        </Link>
                                    </span>
                                    <select
                                        value={p.status}
                                        onChange={e => handleStatusSelect(p.id, e.target.value)}
                                        className={`rounded-full px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusOption(p.status).color} ${statusLoading === p.id ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        style={{ backgroundColor: getStatusOption(p.status).optionBg, color: getStatusOption(p.status).optionText }}
                                        disabled={statusLoading === p.id}
                                    >
                                        {statusOptions.map(opt => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                                style={{ backgroundColor: opt.optionBg, color: opt.optionText }}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-xs text-gray-700">
                                    <span className="font-semibold">Email:</span> {p.email}
                                </div>
                                <div className="text-xs text-gray-700">
                                    <span className="font-semibold">Divisi:</span> {p.divisi ?? '-'}
                                </div>
                                <div className="text-xs text-gray-700">
                                    <span className="font-semibold">Jenis:</span> {p.jenis === 'Magang' ? 'Regular' : 'Praktik Kerja'}
                                </div>
                                <div className="text-xs text-gray-700">
                                    <span className="font-semibold">Tanggal Submit:</span> {p.tanggal_submit}
                                </div>
                                {(p.status === 'Interview' || p.status === 'Tes') && (
                                    <div className="flex gap-2 mt-2">
                                        {p.status === 'Interview' && (
                                            <button
                                                onClick={e => openNotesModal(p.id, 'interview', p.catatan_interview || '', p.nama, e.currentTarget)}
                                                className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600 w-full"
                                                title="Catatan Interview"
                                            >
                                                📝 Interview
                                            </button>
                                        )}
                                        {p.status === 'Tes' && (
                                            <button
                                                onClick={e => openNotesModal(p.id, 'tes', p.catatan_tes || '', p.nama, e.currentTarget)}
                                                className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600 w-full"
                                                title="Catatan Tes"
                                            >
                                                📝 Tes
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Notes Modal */}
            {notesModal.isOpen && (
                <NotesModal
                    isOpen={notesModal.isOpen}
                    onClose={closeNotesModal}
                    pengajuanId={notesModal.pengajuanId ?? 0}
                    pengajuanType={(() => {
                        const pengajuan = pengajuan_magangs.find((p) => p.id === notesModal.pengajuanId);
                        if (pengajuan?.jenis === 'Kerja Praktik') return 'kerja-praktik';
                        return 'magang';
                    })()}
                    noteType={notesModal.noteType as 'interview' | 'tes'}
                    currentNote={notesModal.currentNote}
                    applicantName={notesModal.applicantName}
                    anchorRef={notesModal.anchorEl ? { current: notesModal.anchorEl } : undefined}
                />
            )}
        </AdminLayout>
    );
}
