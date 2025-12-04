import { useState } from 'react';
import MainLayout from '../../layouts/troopers/MainLayout';

export default function Home() {
    const [activeProgram, setActiveProgram] = useState<'reguler' | 'kp'>('reguler');
    return (
        <MainLayout activePage="home">
            {/* Section: Mulai Magang */}
            <section className="relative bg-gradient-to-r from-[#ff000d] via-[#cd4695] to-[#9330bd] px-4 py-12 text-center text-white md:-mt-10 md:py-16 lg:py-20">
                <div className="mx-auto flex w-full max-w-8xl flex-col items-center">
                    <h1 className="mb-6 text-3xl leading-tight font-bold sm:text-4xl md:mb-15 md:text-7xl">
                        Bersama <span className="text-yellow-400">Telkomsel</span> <br />
                        Wujudkan Potensimu
                    </h1>
                    <p className="mx-auto mb-10 max-w-3xl text-base sm:text-lg md:mb-20 md:text-3xl">
                         Telkomsel membuka ruang bagi talenta muda untuk berinovasi, berkolaborasi, dan menciptakan dampak melalui pengalaman magang profesional.

                        <br />
                        <span className="block">sesuai kebutuhanmu</span>
                    </p>
                    <button
                        onClick={() => (window.location.href = '/lowongan')}
                        className="mb-12 h-12 w-40 rounded-2xl bg-white py-3 text-base font-semibold text-[#df0011] shadow hover:brightness-80 sm:w-48 sm:text-lg md:mb-30 md:h-[70px] md:w-[250px] md:text-xl"
                    >
                        Mulai Magang
                    </button>

                    {/* Card benefit */}
                    <div className="mb-16 grid w-full grid-cols-1 gap-6 sm:px-4 md:mb-30 md:grid-cols-4 md:gap-8 md:px-10">
                        <div className="flex flex-col items-start rounded-3xl bg-white/20 px-6 py-6 md:px-8 md:py-7">
                            <img src="/Home/koper.png" alt="Project Nyata" className="mb-4 h-10 w-10" />
                            <div className="mb-2 text-xl font-bold text-white">Project Nyata</div>
                            <div className="text-lg text-white">Terlibat langsung dalam project yang berdampak pada pengguna Telkomsel</div>
                        </div>
                        <div className="flex flex-col items-start rounded-3xl bg-white/20 px-6 py-6 md:px-8 md:py-7">
                            <img src="/Home/grafik.png" alt="Skill Development" className="mb-4 h-10 w-10" />
                            <div className="mb-2 text-xl font-bold text-white">Skill Development</div>
                            <div className="text-lg text-white">Mengasah keterampilan praktis yang relevan dengan industri</div>
                        </div>
                        <div className="flex flex-col items-start rounded-3xl bg-white/20 px-6 py-6 md:px-8 md:py-7">
                            <img src="/Home/ide.png" alt="Kolaborasi Profesional" className="mb-4 h-10 w-10" />
                            <div className="mb-2 text-xl font-bold text-white">Kolaborasi Profesional</div>
                            <div className="text-lg text-white">Bekerja bersama tim ahli dan profesional industri telekomunikasi</div>
                        </div>
                        <div className="flex flex-col items-start rounded-3xl bg-white/20 px-6 py-6 md:px-8 md:py-7">
                            <img src="/Home/jempol.png" alt="Great Experience" className="mb-4 h-10 w-10" />
                            <div className="mb-2 text-xl font-bold text-white">Great Experience</div>
                            <div className="text-lg text-white">Pengalaman ini menjadi modal penting untuk karir mahasiswa ke depannya</div>
                        </div>
                    </div>

                    {/* Counter*/}
                    <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-base font-bold md:mt-0 md:-mb-35 md:flex-row md:gap-0 md:text-lg">
                        <div className="flex h-[120px] w-full max-w-sm items-center justify-center rounded-2xl bg-[#fad1e9] px-6 text-center md:h-[150px] md:w-[300px] md:rounded-l-2xl md:rounded-r-none md:px-0">
                            <div>
                                <div className="mb-2 text-center text-2xl text-[#ef444b] md:mb-3 md:text-4xl">10.000+</div>
                                <div className="text-center text-base text-black md:text-xl">Pendaftar</div>
                            </div>
                        </div>
                        <div className="flex h-[120px] w-full max-w-sm items-center justify-center rounded-2xl bg-[#fad1e9] px-6 text-center md:h-[150px] md:w-[200px] md:rounded-none md:px-0">
                            <div>
                                <div className="mb-2 text-center text-2xl text-[#ef444b] md:mb-3 md:text-4xl">30</div>
                                <div className="text-center text-base text-black md:text-xl">Posisi</div>
                            </div>
                        </div>
                        <div className="flex h-[120px] w-full max-w-sm items-center justify-center rounded-2xl bg-[#fad1e9] px-6 text-center md:h-[150px] md:w-[300px] md:rounded-l-none md:rounded-r-2xl md:px-0">
                            <div>
                                <div className="mb-2 text-center text-2xl text-[#ef444b] md:mb-3 md:text-4xl">50+</div>
                                <div className="text-center text-base text-black md:text-xl">Universitas Bergabung</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Telkomsel */}
            <section className="text-bold bg-[#f8eff0] px-4 py-12 text-center md:py-16 md:pb-30">
                <div className="mt-14 flex flex-col items-center text-center md:mt-30">
                    <img src="/Home/telkomsel-logo.png" alt="Telkomsel" className="mb-6 w-40 pb-6 sm:w-56 md:mb-4 md:w-80 md:pb-10" />
                    <p className="mb-6 max-w-4xl text-xl leading-snug text-black sm:text-2xl md:text-4xl">
                        Telkomsel memberikan kesempatan untuk <span className="font-bold text-[#df0011]">mahasiswa</span> dari berbagai
                        <br />
                        <span className="font-bold text-[#df0011]">universitas</span> mendapatkan{' '}
                        <span className="font-bold text-[#df0011]">peluang magang</span> yang sesuai
                    </p>
                    <p className="mx-auto mt-4 w-full max-w-4xl text-base leading-relaxed text-gray-700 md:w-[70%] md:text-xl">
                        Setiap mahasiswa berkesempatan untuk terjun langsung ke proyek nyata di dalam divisi industri, mulai dari mendukung
                        operasional harian hingga berkolaborasi pada mini project yang berdampak langsung bagi pengguna. Mahasiswa tidak hanya
                        memperoleh pengalaman administratif, tetapi juga mengasah keterampilan praktis dan berkolaborasi bersama profesional industri.
                    </p>
                </div>
            </section>

            {/* Section: Jenis Program */}
            <section className="w-full bg-white px-4 py-16 md:px-12 md:py-24 lg:px-24 xl:px-40 2xl:px-56">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-6 text-center text-3xl font-bold text-black sm:text-4xl md:text-5xl">Jenis Program</h2>
                    <div className="mb-6 flex justify-center px-4">
                        <div className="flex flex-col gap-2 rounded-2xl bg-[#ededed] p-2 sm:flex-row">
                            <button
                                onClick={() => setActiveProgram('reguler')}
                                className={`flex w-full items-center justify-between rounded-xl px-5 py-3 text-sm shadow sm:px-6 sm:text-base md:px-8 md:text-lg ${
                                    activeProgram === 'reguler'
                                        ? 'bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] text-white'
                                        : 'bg-[#eaeaea] text-gray-700'
                                }`}
                            >
                                <img
                                    src={activeProgram === 'reguler' ? '/Home/school-a.png' : '/Home/school.png'}
                                    alt="Project Nyata"
                                    className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10"
                                />
                                <span className="flex-1 text-center text-sm font-semibold sm:text-base md:text-lg">Reguler</span>
                            </button>

                            <button
                                onClick={() => setActiveProgram('kp')}
                                className={`flex w-full items-center justify-between rounded-xl px-5 py-3 text-sm shadow sm:px-6 sm:text-base md:px-8 md:text-lg ${
                                    activeProgram === 'kp'
                                        ? 'bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] text-white'
                                        : 'bg-[#eaeaea] text-gray-700'
                                }`}
                            >
                                <img
                                    src={activeProgram === 'kp' ? '/Home/kp-a.png' : '/Home/kp.png'}
                                    alt="Project Nyata"
                                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                                />
                                <span className="flex-1 text-center text-sm font-semibold sm:text-base md:text-lg">Kerja Praktik</span>
                            </button>
                        </div>
                    </div>

                    {/* Card Jenis Program */}
                    {activeProgram === 'reguler' && (
                        <div
                            className="mx-auto w-full max-w-6xl rounded-2xl border border-[#a33977] bg-white p-6 md:w-[95%] md:p-8"
                            style={{ borderWidth: '4px' }}
                        >
                            <p className="mb-4 px-4 text-base font-semibold text-gray-700 md:px-20 md:text-lg">
                                Program Magang Reguler adalah program magang jangka pendek (biasanya 3–6 bulan) yang ditujukan bagi mahasiswa aktif
                                untuk mendapatkan pengalaman langsung di dunia kerja. Program ini lebih fleksibel dan disesuaikan dengan kebutuhan
                                divisi industri, baik dalam bentuk project tertentu maupun dukungan operasional harian.
                            </p>
                            <h3 className="mt-10 mb-4 pl-4 text-2xl font-bold text-black md:pl-20 md:text-3xl">Requirement</h3>
                            <ul className="mb-8 list-none space-y-3 px-4 text-base md:px-20 md:text-lg">
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Mahasiswa/i aktif minimal semester 5 atau <span className="italic">fresh graduate</span>
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Mampu berkomunikasi dengan baik serta dapat bekerja secara mandiri maupun dalam tim.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Berkomitmen kerja penuh waktu (Senin - Jumat) sesuai durasi yang ditentukan.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Bersedia mengikuti tes seleksi dan wawancara.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Memiliki motivasi tinggi untuk belajar.
                                </li>
                            </ul>
                            <h3 className="mt-10 mb-4 pl-4 text-2xl font-bold text-black md:pl-20 md:text-3xl">Benefit</h3>
                            <ul className="mb-8 list-none space-y-3 pl-4 text-base md:pl-20 md:text-lg">
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Pengalaman nyata bekerja di lingkungan profesional.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Kesempatan terlibat dalam proyek nyata
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Serifikat magang sebagai bukti pengalaman
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Networking dengan profesional industri
                                </li>
                            </ul>

                            {/* Section: Alur Program*/}
                            <h3 className="mt-20 mb-4 pl-20 text-3xl font-bold text-black">Alur Program</h3>
                            <div
                                className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-4 text-black sm:gap-6 md:px-10"
                                style={{ scrollSnapType: 'x mandatory' }}
                            >
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/regis.png" alt="Registrasi" className="mb-2 h-50" />
                                    <div className="mb-1 text-xl font-bold md:text-2xl">Registrasi</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Kamu harus membuat akun dengan mengisi data diri yang dibutuhkan.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        1
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/admin.png" alt="Ajukan Magang" className="mb-2 h-50" />
                                    <div className="mb-1 text-center text-2xl font-bold">Ajukan Magang</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Kamu bisa memilih bidang yang diminati serta melengkapi dokumen.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        2
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/tes.png" alt="Tes Seleksi Online" className="mb-2 h-50" />
                                    <div className="mb-1 text-center text-2xl font-bold">Tes Seleksi Online</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Jika pengajuan diterima, kamu akan diminta mengerjakan tes online.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        3
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/interview.png" alt="Wawancara" className="mb-2 h-45" />
                                    <div className="mb-1 text-xl font-bold md:text-2xl">Wawancara</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Kamu akan diundang untuk mengikuti sesi wawancara dengan tim HR.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        4
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/onboard.png" alt="Onboarding" className="mb-2 h-45" />
                                    <div className="mb-1 text-xl font-bold md:text-2xl">Onboarding</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Peserta yang lolos akan mengikuti proses onboarding sebelum mulai magang.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        5
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeProgram === 'kp' && (
                        <div
                            className="mx-auto w-full max-w-6xl rounded-2xl border border-[#a33977] bg-white p-6 md:w-[95%] md:p-8"
                            style={{ borderWidth: '4px' }}
                        >
                            <p className="mb-4 px-4 text-base font-semibold text-gray-700 md:px-20 md:text-lg">
                                Program Kerja Praktik adalah program magang yang memberikan keleluasaan bagi mahasiswa untuk mengajukan permohonan
                                magang secara mandiri tanpa harus menunggu adanya pembukaan lowongan resmi dari perusahaan. Program ini dirancang agar
                                mahasiswa dapat menyesuaikan kebutuhan akademik (seperti mata kuliah Kerja Praktik/KP) dengan dunia industri, sehingga
                                lebih fleksibel dalam menentukan waktu, divisi, maupun jenis pekerjaan yang relevan dengan bidang studi mereka.
                            </p>
                            <h3 className="mt-10 mb-4 pl-4 text-2xl font-bold text-black md:pl-20 md:text-3xl">Requirement</h3>
                            <ul className="mb-8 list-none space-y-3 px-4 text-base md:px-20 md:text-lg">
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Mahasiswa/i aktif minimal semester 5
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Surat pengantar resmi dari kampus untuk kebutuhan kerja praktik.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Berkomitmen kerja penuh waktu (Senin - Jumat) sesuai durasi yang ditentukan.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Mampu berkomunikasi dengan baik serta siap bekerja sama dalam tim.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Bersedia mengikuti alur seleksi (jika dibutuhkan oleh divisi terkait).
                                </li>
                            </ul>
                            <h3 className="mt-10 mb-4 pl-4 text-2xl font-bold text-black md:pl-20 md:text-3xl">Benefit</h3>
                            <ul className="mb-8 list-none space-y-3 pl-4 text-base md:pl-20 md:text-lg">
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Pengalaman nyata bekerja di lingkungan profesional.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Kesempatan mengintegrasikan teori perkuliahan dengan praktik industri.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Sertifikat atau surat keterangan kerja praktik.
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Networking dengan profesional industri
                                </li>
                                <li className="flex items-center text-black">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ef444b]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="white"
                                            className="h-5 w-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Penilaian kerja praktik dapat digunakan untuk kebutuhan akademis.
                                </li>
                            </ul>

                            {/* Section: Alur Program*/}
                            <h3 className="mt-20 mb-4 pl-20 text-3xl font-bold text-black">Alur Program</h3>
                            <div
                                className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-4 text-black sm:gap-6 md:px-10"
                                style={{ scrollSnapType: 'x mandatory' }}
                            >
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/regis.png" alt="Registrasi" className="mb-2 h-50" />
                                    <div className="mb-1 text-xl font-bold md:text-2xl">Registrasi</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Kamu harus membuat akun dengan mengisi data diri yang dibutuhkan.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        1
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/admin.png" alt="Tes Seleksi Online" className="mb-2 h-50" />
                                    <div className="mb-1 text-center text-2xl font-bold">Ajukan Magang</div>
                                    <div className="mb-2 text-center text-base md:text-lg">Pilih program praktik kerja, lalu lengkapi dokumen.</div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        2
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/interview.png" alt="Wawancara" className="mb-2 h-45" />
                                    <div className="mb-1 text-xl font-bold md:text-2xl">Wawancara</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Kamu akan diundang untuk mengikuti sesi wawancara dengan tim HR.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        3
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/tes.png" alt="Onboarding" className="mb-2 h-45" />
                                    <div className="mb-1 text-xl font-bold md:text-2xl text-center">Tes Seleksi/Wawancara <span className='text-sm'>(Opsional)</span></div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Jika pengajuan diterima, kamu akan diminta mengerjakan tes online atau diundang wawancara.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className=" flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        4
                                    </div>
                                </div>
                                <div className="scroll-snap-align-start flex min-w-[300px] flex-col items-center rounded-xl border-2 border-[#df0011] p-4">
                                    <img src="/Home/program/onboard.png" alt="Onboarding" className="mb-2 h-45" />
                                    <div className="mb-1 text-xl font-bold md:text-2xl text-center">Hasil</div>
                                    <div className="mb-2 text-center text-base md:text-lg">
                                        Hasil seleksi diumumkan melalui dashboard dan notifikasi email.
                                    </div>
                                    <div className="flex-grow" />
                                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#df0011] text-lg font-bold text-white md:text-xl">
                                        5
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Section: Perguruan Tinggi */}
            <section className="bg-[#f1f1f2] px-4 py-12 md:py-16">
                <div className="mx-auto max-w-5xl text-black">
                    <h2 className="mb-6 text-center text-3xl font-bold sm:text-4xl md:text-5xl">Perguruan Tinggi</h2>
                    <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed md:text-lg">
                        Kami telah menjalin kerja sama dengan lebih dari 30 Perguruan Tinggi Indonesia untuk mencetak talenta digital masa depan
                        bangsa.
                    </p>
                    <div className="mb-8 flex flex-wrap justify-center gap-6">
                        {/* Logo universitas, contoh statis */}
                        <img src="/Home/tel-u.png" alt="Telkom University" className="h-20 w-20" />
                        <img src="/Home/binus.png" alt="Binus University" className="h-20" />
                        <img src="/Home/ui.png" alt="Universitas Indonesia" className="h-20 w-20" />
                        <img src="/Home/itb.png" alt="ITB" className="h-20 w-20" />
                        <img src="/Home/its.png" alt="ITS" className="h-20 w-20" />
                        <img src="/Home/unpad.png" alt="Universitas Padjajaran" className="h-20 w-20" />
                        <img src="/Home/unpas.png" alt="Universitas Pasundan" className="h-20 w-20" />
                        <img src="/Home/polban.png" alt="Politeknik Bandung" className="h-20" />
                        <img src="/Home/upn.png" alt="Universitas Pembangunan Nasional" className="h-20 w-20" />
                        <img src="/Home/unair.png" alt="Universitas Airlangga" className="h-20 w-20" />
                        <img src="/Home/unnes.png" alt="Universitas Negeri Semarang" className="h-20 w-20" />
                        <img src="/Home/gundar.png" alt="Universitas Gunadarma" className="h-20 w-20" />
                        <img src="/Home/unesa.png" alt="Universitas Negeri Surabaya" className="h-20 w-20" />
                        <img src="/Home/advent.png" alt="Universitas Advent" className="h-20 w-20" />
                        <img src="/Home/andalas.png" alt="Universitas Andalas" className="h-20 w-20" />
                        <img src="/Home/upi.png" alt="Universitas Pendidikan Indonesia" className="h-20 w-20" />
                        <img src="/Home/undip.png" alt="Universitas Diponegoro" className="h-20 w-20" />
                        <img src="/Home/unbraw.png" alt="Universitas Brawijaya" className="h-20 w-20" />
                        <img src="/Home/trisakti.png" alt="Universitas Trisakti" className="h-20 w-20" />
                    </div>
                </div>
            </section>

            {/* Section: Apa Kata Mereka */}
            <section className="bg-[#f6f2fa] px-4 py-12 md:py-16">
                <div className="mx-auto max-w-5xl text-black">
                    <h2 className="mb-6 text-center text-3xl font-bold sm:text-4xl md:text-5xl">Apa Kata Mereka?</h2>
                    <p className="mb-8 text-center text-base md:text-xl">Dengar langsung pengalaman dari para alumni Troopers</p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="flex flex-col rounded-xl bg-gradient-to-r from-[#e8ccf5] to-white p-6 shadow-xl">
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                                <img src="/Home/wahyu.png" alt="Wahyu Oktiansyah" className="h-45 rounded-xl object-cover" />
                                <div className="flex flex-1 flex-col">
                                    <div className="mb-2 text-sm text-gray-700">
                                        "Selama magang di divisi Data Analyst, aku terlibat langsung dalam analisis dataset pelanggan untuk mendukung
                                        strategi produk digital. Rasanya menantang banget."
                                    </div>
                                    <div className="text-lg font-bold">Wahyu Oktiansyah</div>
                                    <div className="text-sm text-[#a33977]">Manajemen</div>
                                    <div className="mt-2 flex justify-end text-5xl font-bold text-[#df0011] md:-mb-20 md:text-8xl">”</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col rounded-xl bg-gradient-to-r from-[#e8ccf5] to-white p-6 shadow-xl">
                            <div className="mb-4 flex items-center">
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                                    <img src="/Home/fatir.png" alt="Fathir Hidayah" className="h-45 rounded-xl object-cover" />
                                    <div className="flex flex-1 flex-col">
                                        <div className="mb-2 text-sm text-gray-700">
                                            "Selama magang di divisi Data Analyst, aku terlibat langsung dalam analisis dataset pelanggan untuk
                                            mendukung strategi produk digital. Rasanya menantang banget."
                                        </div>
                                        <div className="text-lg font-bold">Fathir Hidayah</div>
                                        <div className="text-sm text-[#df0011]">Data Analyst</div>
                                        <div className="mt-2 flex justify-end text-5xl font-bold text-[#df0011] md:-mb-20 md:text-8xl">”</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
