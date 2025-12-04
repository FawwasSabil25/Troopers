import MainLayout from '../../layouts/troopers/MainLayout';

type Pengajuan = {
    divisi: string;
    durasi: string;
    tanggal_mulai: string;
    status: string;
    catatan_interview?: string | null;
    catatan_tes?: string | null;
};

type Props = {
    pengajuan_magang: Pengajuan[];
    pengajuan_kerja_praktik: Pengajuan[];
};

// Function to get image and content based on status
const getStatusContent = (status: string, catatan_interview?: string | null, catatan_tes?: string | null) => {
    switch (status) {
        case 'Ditolak':
            return {
                image: '/Home/program/ditolak.png',
                title: 'Maaf, Pengajuan Ditolak',
                subtitle: 'Pengajuan magang kamu tidak dapat diproses',
                message: 'Jangan berkecil hati! Coba lagi di kesempatan mendatang.',
                titleColor: 'text-red-600',
                borderColor: 'border-none',
            };
        case 'Interview':
            return {
                image: '/Home/program/interview.png',
                title: 'Selamat! Kamu Lolos ke Tahap Interview',
                subtitle: 'Pengajuan kamu telah diterima untuk tahap interview',
                titleColor: 'text-blue-600',
                borderColor: 'border-blue-500',
                message:
                    catatan_interview && catatan_interview.trim() !== ''
                        ? catatan_interview
                        : 'Siapkan diri untuk sesi interview',
            };
        case 'Tes':
            return {
                image: '/Home/program/tes.png',
                title: 'Selamat! Kamu Lolos ke Tahap Tes',
                subtitle: 'Pengajuan kamu telah diterima untuk tahap tes',
                titleColor: 'text-green-600',
                borderColor: 'border-green-500',
                message:
                    catatan_tes && catatan_tes.trim() !== ''
                        ? catatan_tes
                        : 'Siapkan diri untuk sesi tes',
            };
        case 'Diterima':
            return {
                image: '/Home/program/onboard.png',
                title: 'Selamat! kamu Diterima',
                message: 'Cek Email kamu untuk info selengkapnya.',
                titleColor: 'text-green-600',
                borderColor: 'border-green-500',
            };
        case 'Belum Diproses':
            return {
                image: '/Home/program/regis.png',
                title: 'Pendaftaran Berhasil!',
                message: 'Lamaran kamu sedang dalam proses pengecekan',
                titleColor: 'text-yellow-600',
                borderColor: 'border-yellow-500',
            };
        case 'Administration':
        default:
            return {
                image: '/Home/program/admin.png',
                title: 'Stay Tuned!',
                subtitle: 'Pengajuan kamu sedang diproses',
                message: 'Tunggu info selanjutnya di email kamu',
                titleColor: 'text-green-600',
                borderColor: 'border-green-500',
            };
    }
};

export default function myDashboard(props: Props) {
    const { pengajuan_magang, pengajuan_kerja_praktik } = props;
    const hasAnyApplication = (pengajuan_magang && pengajuan_magang.length > 0) || (pengajuan_kerja_praktik && pengajuan_kerja_praktik.length > 0);

    return (
        <MainLayout activePage="myDashboard">
            <div className="-mt-5 flex items-center justify-center bg-[#f9fafb] px-2 py-15 shadow">
                <div className="flex w-full max-w-5xl flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow">
                    {!hasAnyApplication ? (
                        // Show welcome message when no applications
                        <>
                            <h1 className="pt-20 text-center text-5xl font-bold text-[#d23c43]">Mulai Karir mu bersama kami!</h1>
                            <p className="mb-8 pb-30 text-center text-xl text-gray-600">
                                Belum ada pengajuan yang disubmit. Yuk mulai melamar sekarang!
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="/lowongan"
                                    className="rounded-xl bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-8 py-3 text-xl font-semibold text-white shadow hover:brightness-85"
                                >
                                    Lihat Lowongan
                                </a>
                                <a
                                    href="/"
                                    className="rounded-xl border border-gray-300 bg-white px-8 py-3 text-xl font-semibold text-gray-700 shadow hover:bg-gray-50"
                                >
                                    Beranda
                                </a>
                            </div>
                        </>
                    ) : (

                        <>
                            <h1 className="text-center text-4xl font-bold text-black">Status Pengajuan</h1>
                            <div
                                className={`w-full flex justify-center`}
                            >
                                {/* If both magang and kerja praktik exist, show side by side. If only one, center it. */}
                                {pengajuan_magang && pengajuan_kerja_praktik && pengajuan_magang.length > 0 && pengajuan_kerja_praktik.length > 0 ? (
                                    <div className="grid w-full gap-8 md:grid-cols-2">
                                        {/* Card Magang Reguler */}
                                        {pengajuan_magang.map((magang, idx) => {
                                            const statusMagang = getStatusContent(magang.status, magang.catatan_interview, magang.catatan_tes);
                                            return (
                                                <div key={idx} className="flex w-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow">
                                                    {/* ...existing code... */}
                                                    <h2 className={`text-center text-3xl font-bold ${statusMagang.titleColor}`}>{statusMagang.title}</h2>
                                                    <h3 className={`mb-2 text-center text-2xl font-bold ${statusMagang.titleColor}`}>{statusMagang.subtitle}</h3>
                                                    <img src={statusMagang.image} alt="status magang" className="mb-4 h-56" />
                                                    <div className={`w-full rounded-xl border-3 ${statusMagang.borderColor} p-5 text-black`}>
                                                        <div className="mb-3 text-xl font-bold">Summary Magang Reguler</div>
                                                        <div className="mb-2 grid grid-cols-2 gap-y-1 text-base">
                                                            <div>Divisi</div>
                                                            <div className="font-semibold">: {magang.divisi}</div>
                                                            <div>Durasi</div>
                                                            <div className="font-semibold">: {magang.durasi}</div>
                                                            <div>link</div>
                                                            <div className="font-semibold col-span-2">
                                                                <span className="inline-block min-w-[1.5ch]">:</span>{' '}
                                                                <span className="block break-words">
                                                                    {(() => {
                                                                        const val = statusMagang.message?.trim() || '';
                                                                        let isUrl = false;
                                                                        try {
                                                                            const url = new URL(val);
                                                                            isUrl = url.protocol === 'http:' || url.protocol === 'https:';
                                                                        } catch { /* ignore invalid URL */ }
                                                                        if (isUrl) {
                                                                            return (
                                                                                <a
                                                                                    href={val}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-blue-600 hover:underline text-smbreak-all"
                                                                                >
                                                                                    {val}
                                                                                </a>
                                                                            );
                                                                        } else {
                                                                            return <span>{val}</span>;
                                                                        }
                                                                    })()}
                                                                </span>
                                                            </div>
                                                            <div>Tanggal Mulai</div>
                                                            <div className="font-semibold">: {magang.tanggal_mulai}</div>
                                                            <div>Status</div>
                                                            <div className="font-semibold">: {magang.status}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {/* Card Kerja Praktik */}
                                        {pengajuan_kerja_praktik.map((kp, idx) => {
                                            const statusKP = getStatusContent(kp.status, kp.catatan_interview, kp.catatan_tes);
                                            return (
                                                <div key={idx} className="flex w-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow">
                                                    {/* ...existing code... */}
                                                    <h2 className={`text-center text-3xl font-bold ${statusKP.titleColor}`}>{statusKP.title}</h2>
                                                    <h3 className={`mb-2 text-center text-2xl font-bold ${statusKP.titleColor}`}>{statusKP.subtitle}</h3>
                                                    <img src={statusKP.image} alt="status kerja praktik" className="mb-4 h-56" />
                                                    <div className={`w-full rounded-xl border-3 ${statusKP.borderColor} p-5 text-black`}>
                                                        <div className="mb-3 text-xl font-bold">Summary Kerja Praktik</div>
                                                        <div className="mb-2 grid grid-cols-2 gap-y-1 text-base">
                                                            <div>Divisi</div>
                                                            <div className="font-semibold">: {kp.divisi}</div>
                                                            <div>Durasi</div>
                                                            <div className="font-semibold">: {kp.durasi}</div>
                                                            <div>link</div>
                                                            <div className="font-semibold col-span-2">
                                                                <span className="inline-block min-w-[1.5ch]">:</span>{' '}
                                                                <span className="block break-words">
                                                                    {(() => {
                                                                        const val = statusKP.message?.trim() || '';
                                                                        let isUrl = false;
                                                                        try {
                                                                            const url = new URL(val);
                                                                            isUrl = url.protocol === 'http:' || url.protocol === 'https:';
                                                                        } catch { /* ignore invalid URL */ }
                                                                        if (isUrl) {
                                                                            return (
                                                                                <a
                                                                                    href={val}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-blue-600 hover:underline break-all"
                                                                                >
                                                                                    {val}
                                                                                </a>
                                                                            );
                                                                        } else {
                                                                            return <span>{val}</span>;
                                                                        }
                                                                    })()}
                                                                </span>
                                                            </div>
                                                            <div>Tanggal Mulai</div>
                                                            <div className="font-semibold">: {kp.tanggal_mulai}</div>
                                                            <div>Status</div>
                                                            <div className="font-semibold">: {kp.status}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex w-full justify-center">
                                        {/* Only one type exists, show all cards centered */}
                                        {pengajuan_magang && pengajuan_magang.length > 0 && pengajuan_magang.map((magang, idx) => {
                                            const statusMagang = getStatusContent(magang.status, magang.catatan_interview, magang.catatan_tes);
                                            return (
                                                <div key={idx} className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow">
                                                    {/* ...existing code... */}
                                                    <h2 className={`text-center text-3xl font-bold ${statusMagang.titleColor}`}>{statusMagang.title}</h2>
                                                    <h3 className={`mb-2 text-center text-2xl font-bold ${statusMagang.titleColor}`}>{statusMagang.subtitle}</h3>
                                                    <img src={statusMagang.image} alt="status magang" className="mb-4 h-56" />
                                                    <div className={`w-full rounded-xl border-3 ${statusMagang.borderColor} p-5 text-black`}>
                                                        <div className="mb-3 text-xl font-bold">Summary Magang Reguler</div>
                                                        <div className="mb-2 grid grid-cols-2 gap-y-1 text-base">
                                                            <div>Divisi</div>
                                                            <div className="font-semibold">: {magang.divisi}</div>
                                                            <div>Durasi</div>
                                                            <div className="font-semibold">: {magang.durasi}</div>
                                                            <div>Tanggal Mulai</div>
                                                            <div className="font-semibold">: {magang.tanggal_mulai}</div>
                                                            <div>Status</div>
                                                            <div className="font-semibold">: {magang.status}</div>
                                                            <div>Link</div>
                                                            <div className="font-semibold break-all">
                                                                :{' '}
                                                                {(() => {
                                                                    const val = statusMagang.message?.trim() || '';
                                                                    let isUrl = false;
                                                                    try {
                                                                        const url = new URL(val);
                                                                        isUrl = url.protocol === 'http:' || url.protocol === 'https:';
                                                                    } catch { /* ignore invalid URL */ }
                                                                    if (isUrl) {
                                                                        return (
                                                                            <a
                                                                                href={val}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-600 hover:underline break-all"
                                                                            >
                                                                                {val}
                                                                            </a>
                                                                        );
                                                                    } else {
                                                                        return <span>{val}</span>;
                                                                    }
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {pengajuan_kerja_praktik && pengajuan_kerja_praktik.length > 0 && pengajuan_kerja_praktik.map((kp, idx) => {
                                            const statusKP = getStatusContent(kp.status, kp.catatan_interview, kp.catatan_tes);
                                            return (
                                                <div key={idx} className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow">
                                                    {/* ...existing code... */}
                                                    <h2 className={`text-center text-3xl font-bold ${statusKP.titleColor}`}>{statusKP.title}</h2>
                                                    <h3 className={`mb-2 text-center text-2xl font-bold ${statusKP.titleColor}`}>{statusKP.subtitle}</h3>
                                                    <img src={statusKP.image} alt="status kerja praktik" className="mb-4 h-56" />
                                                    <div className={`w-full rounded-xl border-3 ${statusKP.borderColor} p-5 text-black`}>
                                                        <div className="mb-3 text-xl font-bold">Summary Kerja Praktik</div>
                                                        <div className="mb-2 grid grid-cols-2 gap-y-1 text-base">
                                                            <div>Divisi</div>
                                                            <div className="font-semibold">: {kp.divisi}</div>
                                                            <div>Durasi</div>
                                                            <div className="font-semibold">: {kp.durasi}</div>
                                                            <div>Link</div>
                                                            <div className="font-semibold break-all">
                                                                :{' '}
                                                                {(() => {
                                                                    const val = statusKP.message?.trim() || '';
                                                                    let isUrl = false;
                                                                    try {
                                                                        const url = new URL(val);
                                                                        isUrl = url.protocol === 'http:' || url.protocol === 'https:';
                                                                    } catch { /* ignore invalid URL */ }
                                                                    if (isUrl) {
                                                                        return (
                                                                            <a
                                                                                href={val}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-600 hover:underline break-all"
                                                                            >
                                                                                {val}
                                                                            </a>
                                                                        );
                                                                    } else {
                                                                        return <span>{val}</span>;
                                                                    }
                                                                })()}
                                                            </div>
                                                            <div>Tanggal Mulai</div>
                                                            <div className="font-semibold">: {kp.tanggal_mulai}</div>
                                                            <div>Status</div>
                                                            <div className="font-semibold">: {kp.status}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                )}
                            </div>

                            <a
                                href="/"
                                className="w-80 rounded-xl bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-8 py-3 text-center text-xl font-semibold text-white shadow hover:brightness-85"
                            >
                                Beranda
                            </a>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
