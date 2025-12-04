import MainLayout from '../../layouts/troopers/MainLayout';

export default function ApplySuccess() {
    return (
        <MainLayout activePage="jobs">
            <div className="bg-[#f9fafb] flex items-center justify-center py-15 px-2 shadow">
                <div className="flex w-full max-w-2xl flex-col items-center rounded-2xl bg-white p-8 shadow">
                    <h1 className=" text-5xl font-bold text-green-600">Terima Kasih!</h1>
                    <h1 className="mb-2 text-4xl font-bold text-green-600">Pengajuanmu Sudah Kami Terima</h1>
                    <p className="py-6 text-center text-2xl text-black">Tunggu info selanjutnya di email kamu</p>
                    <img src="/success-illustration.png" alt="icon" className="mb-6 h-48" />
                    <div className="mb-8 w-full rounded-xl border-3 border-[#df0011] p-6 text-black">
                        <h2 className="mb-4 text-2xl font-bold">Summary</h2>
                        <div className="mb-4 grid grid-cols-2 gap-y-2 text-xl">
                            <div>Divisi</div>
                            <div className="font-semibold">: ...</div>
                            <div>Durasi</div>
                            <div className="font-semibold">: ... bulan</div>
                            <div>Tanggal Mulai</div>
                            <div className="font-semibold">: tgl-bulan-tahun</div>
                            <div>Status</div>
                            <div className="font-semibold">: Administration</div>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold">Catatan</h2>
                        <ul className="space-y-2 text-xl">
                            <li className="flex items-center gap-2">
                                <span className="text-[#df0011]">&#10004;</span> Pastikan email & WhatsApp kamu aktif untuk menerima notifikasi.
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#df0011]">&#10004;</span> Jika ada kendala teknis, hubungi telkomsel@tsel.co.id
                            </li>
                        </ul>
                    </div>
                    <a href="/" className="rounded-xl bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-8 py-3 text-xl font-semibold text-white shadow w-60 text-center">
                        My Dashboard
                    </a>
                </div>
            </div>
        </MainLayout>
    );
}
