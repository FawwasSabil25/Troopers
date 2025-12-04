import React, { useState } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import MainLayout from '../../layouts/troopers/MainLayout';
import AuthGuard from '../../components/AuthGuard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type FormData = {
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
    minat: string[];
    skill_opsional: string;
    motivasi: string;
    cv_path: File | null;
    portfolio_url: string;
    portfolio_file: File | null;
    pengalaman: string;
    tujuan: string;
    lowongan_id: number | null;
};


export default function MagangFormPage() {
    // Ambil user dari props inertia
    const { auth } = usePage().props as { auth: { user: any } };
    const user = auth?.user || {};
    const { lowongan } = usePage().props as { lowongan?: { id: number; divisi?: string } };
    const lowonganId = lowongan?.id ?? null;
    const divisiLowongan = lowongan?.divisi || '';

    // Step navigation logic
    const [step, setStep] = useState(0); // 0-based index for steps
    const [agree, setAgree] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);

    // Stepper steps array
    const steps = [
        { label: 'Cek Data Diri' },
        { label: 'Lengkapi Berkas' },
    ];

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const { data, setData, processing, errors } = useForm<FormData>({
        nama: user.name || '',
        email: user.email || '',
        telepon: user.phone || '',
        domisili: user.city || '',
        universitas: user.university || '',
        jurusan: user.major || '',
        semester: user.semester || '',
        ipk: user.ipk || '',
        durasi: '',
        tanggal_mulai: '',
        minat: [],
        skill_opsional: '',
        motivasi: '',
        cv_path: null,
        portfolio_url: '',
        portfolio_file: null,
        pengalaman: '',
        tujuan: '',
    lowongan_id: lowonganId,
    });




    // Helper: Validate IPK (decimal, max 4.00)
    const isValidIpk = (ipk: string) => {
        if (!ipk) return false;
        const num = Number(ipk);
        return /^\d{1}(\.\d{1,2})?$/.test(ipk) && num >= 0 && num <= 4;
    };

    // Helper: Validate email
    const isValidEmail = (email: string) => {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    };

    // Helper: Validate phone number (Indonesian format, starts with 08, 10-13 digits)
    const isValidPhone = (phone: string) => {
        return /^08\d{8,11}$/.test(phone);
    };

    // Field error states (live validation)
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({ email: '', telepon: '', ipk: '' });

    // Helper: Validate file (type, size)
    const isValidFile = (file: File | null, allowedTypes: string[], maxSizeMB: number) => {
        if (!file) return false;
        const validType = allowedTypes.includes(file.type);
        const validSize = file.size <= maxSizeMB * 1024 * 1024;
        return validType && validSize;
    };

    // Step validation logic (match DB)
    const isStepValid = [
        // Step 0: Data Diri (all required, ipk decimal, email format, live error)
        !!data.nama &&
        isValidEmail(data.email) &&
        !!data.telepon &&
        !!data.domisili &&
        !!data.universitas &&
        !!data.jurusan &&
        !!data.semester &&
        isValidIpk(data.ipk) &&
        !!data.durasi &&
        !!data.tanggal_mulai &&
        !fieldErrors.email &&
        !fieldErrors.telepon,
    // Step 1: Berkas (divisiLowongan harus ada, motivasi tidak kosong, file required/type/size, agree)
    !!divisiLowongan &&
    !!data.motivasi &&
    isValidFile(data.cv_path, ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"], 5) &&
    (data.portfolio_file == null || isValidFile(data.portfolio_file, ["application/pdf", "application/zip", "application/x-rar-compressed"], 10)) &&
    agree,
    ];

    // Live validation for email and telepon
    React.useEffect(() => {
        const newErrors = { ...fieldErrors };
        if (data.email && !isValidEmail(data.email)) {
            newErrors.email = 'Format email tidak valid';
        } else {
            newErrors.email = '';
        }
        if (data.telepon && !isValidPhone(data.telepon)) {
            newErrors.telepon = 'No. telepon harus diawali 08 dan 10-13 digit';
        } else {
            newErrors.telepon = '';
        }
        setFieldErrors(newErrors);
    }, [data.email, data.telepon]);

    // Step submit handlers
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        // Debug: log form data and validation state
        console.log('Step:', step);
        console.log('Form data:', data);
        console.log('Is step valid:', isStepValid[step]);

        if (!isStepValid[step]) {
            // Optionally show error feedback here
            return;
        }
        if (step < steps.length - 1) {
            nextStep();
        } else {
            const submitData: Partial<FormData> & { status: string } = {
                ...data,
                minat: divisiLowongan ? [divisiLowongan] : [],
                status: 'Belum Diproses',
            };
            if (!(submitData.cv_path instanceof File)) {
                delete submitData.cv_path;
            }
            if (!(submitData.portfolio_file instanceof File)) {
                delete submitData.portfolio_file;
            }
            // Debug: log submitData
            console.log('Submitting:', submitData);
            
            // Submit to magang endpoint
            router.post('/pengajuan-magang', submitData, {
                forceFormData: true,
                preserveScroll: true,
                preserveState: false,
                onStart: () => { console.log('Submit started'); },
                onSuccess: () => {
                    console.log('Submit success');
                    setStep(0);
                },
                onError: () => {
                    console.log('Submit error');
                },
                onFinish: () => { console.log('Submit finished'); },
            });
        }
    };

    return (
        <AuthGuard>
            <MainLayout activePage="jobs">
                <div className="flex min-h-screen justify-center bg-[#f9fafb] px-2 py-10 -mt-5">
                <div className="w-full max-w-7xl rounded-2xl bg-white p-8 text-black shadow">
                    <h1 className="mb-8 text-center text-5xl font-bold">Ajukan Magang Reguler</h1>

                    {/* Stepper Component */}
                    <div className="mb-10 flex items-center justify-center gap-4">
                        {steps.map((s, i) => {
                            const isActive = i <= step;
                            const isLast = i === steps.length - 1;
                            return (
                                <div key={i} className="flex items-center gap-2 text-xl">
                                    <span
                                        className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                                            isActive
                                                ? 'bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd]'
                                                : 'bg-gray-400'
                                        }`}
                                    >
                                        {i + 1}
                                    </span>
                                    <span className={`font-semibold ${isActive ? 'text-[#d23c43]' : 'text-gray-400'}`}>
                                        {s.label}
                                    </span>
                                    {!isLast && (
                                        <div
                                            className={`h-0.5 flex-1 ${
                                                i < step
                                                    ? 'bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd]'
                                                    : 'bg-gray-700'
                                            }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Step 0: Data Diri Form */}
                    {step === 0 && (
                        <form onSubmit={submitForm}>
                            <button
                                className="mb-6 flex items-center gap-2 font-semibold text-[#df0011] hover:underline text-xl"
                                type="button"
                                onClick={() => window.history.back()}
                            >
                                &larr; Kembali
                            </button>

                            <h2 className="mb-4 text-3xl font-bold">Informasi Pribadi</h2>
                            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xl">
                                <div>
                                    <label className="mb-2 block font-medium">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border px-4 py-2"
                                        placeholder="Nama Lengkap"
                                        value={data.nama}
                                        onChange={e => setData('nama', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium">Email *</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-lg border px-4 py-2"
                                        placeholder="nama@gmail.com"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                    {data.email && fieldErrors.email && (
                                        <div className="text-red-500 text-sm mt-1">{fieldErrors.email}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium">No. Telepon *</label>
                                    <input
                                        type="tel"
                                        className="w-full rounded-lg border px-4 py-2"
                                        placeholder="081234567890"
                                        value={data.telepon}
                                        onChange={e => setData('telepon', e.target.value)}
                                        required
                                    />
                                    {data.telepon && fieldErrors.telepon && (
                                        <div className="text-red-500 text-sm mt-1">{fieldErrors.telepon}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium">Kota Domisili *</label>
                                    <select
                                        className="w-full rounded-lg border px-4 py-2"
                                        value={data.domisili}
                                        onChange={e => setData('domisili', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Kota Domisili
                                        </option>
                                        <option>Jakarta</option>
                                        <option>Surabaya</option>
                                        <option>Malang</option>
                                        <option>Bandung</option>
                                    </select>
                                </div>
                            </div>

                            <h2 className="mb-4 text-3xl font-bold">Informasi Pendidikan</h2>
                            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xl">
                                <div>
                                    <label className="mb-2 block font-medium">Universitas *</label>
                                    <select
                                        className="w-full rounded-lg border px-4 py-2"
                                        value={data.universitas}
                                        onChange={e => setData('universitas', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Universitas
                                        </option>
                                        <option>Telkom University</option>
                                        <option>Institut Teknologi Bandung</option>
                                        <option>Universitas Indonesia</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium">Jurusan *</label>
                                    <select
                                        className="w-full rounded-lg border px-4 py-2"
                                        value={data.jurusan}
                                        onChange={e => setData('jurusan', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Jurusan
                                        </option>
                                        <option>Teknik Informatika</option>
                                        <option>Statistika</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium">Semester Saat Ini *</label>
                                    <select
                                        className="w-full rounded-lg border px-4 py-2"
                                        value={data.semester}
                                        onChange={e => setData('semester', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Semester
                                        </option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium">IPK *</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border px-4 py-2"
                                        placeholder="4.00"
                                        value={data.ipk}
                                        onChange={e => setData('ipk', e.target.value)}
                                        required
                                    />
                                    {fieldErrors.ipk && (
                                        <div className="text-red-500 text-sm mt-1">{fieldErrors.ipk}</div>
                                    )}
                                </div>
                            </div>

                            <h2 className="mb-4 text-3xl font-bold">Preferensi Magang</h2>
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 text-xl">
                                <div>
                                    <label className="mb-2 block font-medium">Durasi Magang *</label>
                                    <select
                                        className="w-full rounded-lg border px-4 py-2"
                                        value={data.durasi}
                                        onChange={e => setData('durasi', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Durasi Magang
                                        </option>
                                        <option>2 bulan</option>
                                        <option>3 bulan</option>
                                        <option>4 bulan</option>
                                        <option>5 bulan</option>
                                        <option>6 bulan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium">Tanggal Mulai *</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date | null) => {
                                            setStartDate(date);
                                            setData('tanggal_mulai', date ? date.toISOString().slice(0, 10) : '');
                                        }}
                                        className="rounded-lg border px-4 py-2"
                                        dateFormat="yyyy-MM-dd"
                                        required
                                    />
                                </div>
                            </div>


                            {/* Next Button */}
                            <div className="flex flex-col gap-2 justify-end">
                                <button
                                    type="submit"
                                    className={`rounded-xl bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-8 py-3 text-xl font-semibold text-white shadow ${
                                        !isStepValid[0] ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={!isStepValid[0]}
                                >
                                    Selanjutnya &rarr;
                                </button>
                                {Object.keys(errors).length > 0 && (
                                  <pre className="text-red-500 bg-red-50 rounded p-2 mt-2 text-sm overflow-x-auto">{JSON.stringify(errors, null, 2)}</pre>
                                )}
                            </div>
                        </form>
                    )}

                    {/* Step 1: Lengkapi Berkas Form */}
                    {step === 1 && (
                        <form method="post" encType="multipart/form-data" onSubmit={submitForm}>
                            <button
                                type="button"
                                className="mb-6 flex items-center gap-2 font-semibold text-[#df0011] hover:underline text-xl"
                                onClick={prevStep}
                            >
                                &larr; Kembali
                            </button>

                            {/* Skill & Minat */}
                            <h2 className="mb-4 text-3xl font-bold">Skill & Minat</h2>
                            <div className="mb-6">
                                <label className="mb-2 block font-medium text-xl">Bidang Minat</label>
                                <textarea
                                    className="w-full rounded-lg px-4 py-2 text-xl bg-gray-200 resize-none focus:outline-none focus:ring-0 h-5"
                                    value={divisiLowongan}
                                    readOnly
                                    disabled
                                    rows={2}
                                    style={{ minHeight: '48px', maxHeight: '120px' }}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block font-medium text-3xl">Skill yang dimiliki (Opsional)</label>
                                <input
                                    className="w-full rounded-lg border px-4 py-2 text-xl"
                                    placeholder="Contoh: Javascript, Leadership, Figma"
                                    value={data.skill_opsional}
                                    onChange={e => setData('skill_opsional', e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block font-medium text-3xl">Motivasi Mendaftar *</label>
                                <textarea
                                    className="w-full rounded-lg border px-4 py-2 text-xl"
                                    rows={4}
                                    placeholder="Ceritakan mengapa kamu tertarik..."
                                    required
                                    value={data.motivasi}
                                    onChange={e => setData('motivasi', e.target.value)}
                                />
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block font-medium text-3xl">Upload CV *</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="w-full rounded-lg border px-4 py-2 text-xl"
                                            required
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setData('cv_path', e.target.files[0]);
                                                } else {
                                                    setData('cv_path', null);
                                                }
                                            }}
                                        />
                                        <span className="text-gray-400 text-sm">PDF, DOC, DOCX (Max 5MB)</span>
                                        {errors.cv_path && (
                                            <div className="text-red-500 text-sm mt-2">{errors.cv_path}</div>
                                        )}
                                    </div>
                                <div>
                                    <label className="mb-2 block font-medium text-3xl">Portfolio (Opsional)</label>
                                    <input
                                        className="mb-2 w-full rounded-lg border px-4 py-2 text-xl"
                                        placeholder="https://"
                                        value={data.portfolio_url}
                                        onChange={e => setData('portfolio_url', e.target.value)}
                                    />
                                    <input
                                        type="file"
                                        accept=".pdf,.zip,.rar"
                                        className="w-full rounded-lg border px-4 py-2 text-xl"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                setData('portfolio_file', e.target.files[0]);
                                            } else {
                                                setData('portfolio_file', null);
                                            }
                                        }}
                                    />
                                    <span className="text-gray-400 text-sm">PDF, ZIP, RAR (Max 10MB)</span>
                                    {errors.portfolio_file && (
                                        <div className="text-red-500 text-sm mt-2">{errors.portfolio_file}</div>
                                    )}
                                </div>
                            </div>

                            <h2 className="mb-4 text-3xl font-bold">Pertanyaan</h2>
                            <div className="mb-6">
                                <label className="mb-2 block font-medium text-xl">Pengalaman relevan yang pernah kamu miliki?</label>
                                <textarea
                                    className="w-full rounded-lg border px-4 py-2 text-xl"
                                    rows={3}
                                    placeholder="Ceritakan pengalaman organisasi, project, atau pekerjaan yang relevan..."
                                    value={data.pengalaman}
                                    onChange={e => setData('pengalaman', e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-2 block font-medium text-xl">Apa yang ingin kamu pelajari dari magang ini?</label>
                                <textarea
                                    className="w-full rounded-lg border px-4 py-2 text-xl"
                                    rows={3}
                                    placeholder="Jelaskan tujuan dan ekspektasi kamu..."
                                    value={data.tujuan}
                                    onChange={e => setData('tujuan', e.target.value)}
                                />
                            </div>

                            <div className="mb-6 border-2 bg-[#d7ebff] border-[#90baff] rounded-lg  text-[#468dff]">
                                <label className="flex items-center gap-2 text-sm ml-5 my-5">
                                    <input type="checkbox" className="h-5 w-5" required checked={agree} onChange={e => setAgree(e.target.checked)} />
                                    Saya menyatakan bahwa semua informasi yang saya berikan adalah benar dan akurat. Saya memahami bahwa memberikan
                                    informasi palsu dapat mengakibatkan pembatalan aplikasi atau penghentian magang.
                                </label>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="rounded-xl border border-[#df0011] bg-white px-8 py-3 text-lg font-semibold text-[#df0011] shadow"
                                        onClick={prevStep}
                                    >
                                        &larr; Kembali
                                    </button>
                                    <button
                                        type="submit"
                                        className={`rounded-xl bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-8 py-3 text-lg font-semibold text-white shadow ${!isStepValid[1] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isStepValid[1] || processing}
                                    >
                                        {processing ? 'Mengirim...' : 'Submit'}
                                    </button>
                                </div>
                                {Object.keys(errors).length > 0 && (
                                  <pre className="text-red-500 bg-red-50 rounded p-2 mt-2 text-sm overflow-x-auto">{JSON.stringify(errors, null, 2)}</pre>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
            </MainLayout>
        </AuthGuard>
    );
}
