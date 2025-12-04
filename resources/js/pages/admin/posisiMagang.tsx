import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AdminLayout from '../../layouts/troopers/AdminLayout';

type Lowongan = {
    id: number;
    divisi: string;
    lokasi: string;
    durasi: string;
    tanggal_tutup: string;
    skills: string[];
    requirement: string[];
    deskripsi: string;
};

type Props = {
    lowongan: Lowongan[];
};

export default function AdminDashboard({ lowongan = [] }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [showDeleteId, setShowDeleteId] = useState<number | null>(null);

    const { data, setData, errors, processing, reset } = useForm<{
        divisi: string;
        lokasi: string;
        durasi: string;
        tanggal_tutup: string;
        skills: string[];
        requirement: string[];
        deskripsi: string;
    }>({
        divisi: '',
        lokasi: '',
        durasi: '',
        tanggal_tutup: '',
        skills: [],
        requirement: [],
        deskripsi: '',
    });

    const [skillInput, setSkillInput] = useState('');
    const [requirementInput, setRequirementInput] = useState('');
    const [dateValue, setDateValue] = useState<Date | null>(null);

    // === FORM LOGIC ===
    function openForm() {
        setShowForm(true);
        setEditId(null);
        reset();
        setSkillInput('');
        setRequirementInput('');
        setDateValue(null);
    }
    function openEditForm(l: Lowongan) {
        setShowForm(true);
        setEditId(l.id);
        setData({
            divisi: l.divisi,
            lokasi: l.lokasi,
            durasi: l.durasi,
            tanggal_tutup: l.tanggal_tutup,
            skills: Array.isArray(l.skills) ? l.skills : [],
            requirement: Array.isArray(l.requirement) ? l.requirement : [],
            deskripsi: l.deskripsi || '',
        });
        setSkillInput('');
        setRequirementInput('');
        setDateValue(l.tanggal_tutup ? new Date(l.tanggal_tutup) : null);
    }
    function closeForm() {
        setShowForm(false);
        setEditId(null);
        reset();
        setSkillInput('');
        setRequirementInput('');
        setDateValue(null);
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!dateValue || dateValue < new Date(new Date().setHours(0, 0, 0, 0))) {
            setData('tanggal_tutup', '');
            return;
        }
        if (editId) {
            router.put(`/lowongan-magang/${editId}`, { ...data, tanggal_tutup: dateValue.toISOString().slice(0, 10) }, { onSuccess: closeForm });
        } else {
            router.post('/lowongan-magang', { ...data, tanggal_tutup: dateValue.toISOString().slice(0, 10) }, { onSuccess: closeForm });
        }
    }

    // === DELETE LOGIC ===
    function openDeleteModal(id: number) {
        setShowDeleteId(id);
        setShowForm(false);
        setEditId(null);
    }
    function closeDeleteModal() {
        setShowDeleteId(null);
    }
    function handleDelete() {
        if (showDeleteId) {
            router.delete(`/lowongan-magang/${showDeleteId}`, {
                onSuccess: closeDeleteModal,
            });
        }
    }

    // === LIST ADD/REMOVE ===
    function addSkill() {
        if (skillInput && !data.skills.includes(skillInput)) {
            setData('skills', [...data.skills, skillInput]);
            setSkillInput('');
        }
    }
    function removeSkill(skill: string) {
        setData(
            'skills',
            data.skills.filter((s) => s !== skill),
        );
    }
    function addRequirement() {
        if (requirementInput && !data.requirement.includes(requirementInput)) {
            setData('requirement', [...data.requirement, requirementInput]);
            setRequirementInput('');
        }
    }
    function removeRequirement(req: string) {
        setData(
            'requirement',
            data.requirement.filter((r) => r !== req),
        );
    }

    return (
        <AdminLayout>
            <div className="rounded-2xl bg-white p-8 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-black">Kelola Lowongan Magang</h1>
                    <button
                        type="button"
                        className="rounded-lg border bg-white px-5 py-2 text-base font-semibold text-black transition hover:bg-[#b4b4b4]"
                        onClick={openForm}
                    >
                        + Tambah Posisi Baru
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 text-black md:grid-cols-3">
                    {lowongan.length === 0 && <div className="col-span-3 py-8 text-center text-gray-500">Belum ada lowongan magang.</div>}
                    {lowongan.map((l) => (
                        <div key={l.id} className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow">
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold">{l.divisi}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                <div>
                                    Lokasi: <span className="font-medium">{l.lokasi}</span>
                                </div>
                                <div>
                                    Durasi: <span className="font-medium">{l.durasi}</span>
                                </div>
                                <div>
                                    Penutupan: <span className="font-medium">{l.tanggal_tutup}</span>
                                </div>
                                <div>
                                    Skill: <span className="font-medium">{Array.isArray(l.skills) ? l.skills.join(', ') : ''}</span>
                                </div>
                                <div>
                                    Requirement: <span className="font-medium">{Array.isArray(l.requirement) ? l.requirement.join(', ') : ''}</span>
                                </div>
                                <div>
                                    Deskripsi: <span className="font-medium">{l.deskripsi}</span>
                                </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                                <button className="rounded bg-gray-200 px-4 py-1 font-semibold" onClick={() => openEditForm(l)}>
                                    Edit
                                </button>
                                <button
                                    className="rounded bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-4 py-1 font-semibold text-white"
                                    onClick={() => openDeleteModal(l.id)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* === MODAL FORM (Tambah/Edit) === */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative w-full max-w-lg rounded-xl bg-white p-8 text-black shadow-lg">
                        <button onClick={closeForm} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black">
                            &times;
                        </button>
                        <h2 className="mb-6 text-2xl font-bold">{editId ? 'Edit Lowongan Magang' : 'Tambah Lowongan Magang'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Divisi */}
                            <div>
                                <label className="mb-1 block font-medium">Divisi *</label>
                                <select
                                    className="w-full rounded border px-3 py-2"
                                    value={data.divisi}
                                    onChange={(e) => setData('divisi', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Divisi
                                    </option>
                                    <option>Team Management</option>
                                    <option>Data Analyst</option>
                                    <option>Finance</option>
                                    <option>Risk</option>
                                    <option>Audit</option>
                                    <option>Business Development</option>
                                    <option>Product & Marketing Management</option>
                                    <option>Sales & Customer Management</option>
                                    <option>Data Engineering</option>
                                    <option>Data Science & Analytics</option>
                                    <option>Software Development</option>
                                    <option>IT Infrastructure Management</option>
                                    <option>ICT Security Management</option>
                                    <option>IT Operation</option>
                                    <option>Project Management</option>
                                    <option>Network Management</option>
                                    <option>Physical Network</option>
                                    <option>Lainnya</option>
                                </select>
                                {errors.divisi && <div className="mt-1 text-sm text-red-500">{errors.divisi}</div>}
                            </div>

                            {/* Lokasi */}
                            <div>
                                <label className="mb-1 block font-medium">Lokasi *</label>
                                <select
                                    className="w-full rounded border px-3 py-2"
                                    value={data.lokasi}
                                    onChange={(e) => setData('lokasi', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Lokasi
                                    </option>
                                    <option>Jakarta</option>
                                    <option>Bandung</option>
                                    <option>Surabaya</option>
                                </select>
                                {errors.lokasi && <div className="mt-1 text-sm text-red-500">{errors.lokasi}</div>}
                            </div>

                            {/* Durasi */}
                            <div>
                                <label className="mb-1 block font-medium">Durasi *</label>
                                <select
                                    className="w-full rounded border px-3 py-2"
                                    value={data.durasi}
                                    onChange={(e) => setData('durasi', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Durasi
                                    </option>
                                    <option>2 bulan</option>
                                    <option>3 bulan</option>
                                    <option>4 bulan</option>
                                    <option>5 bulan</option>
                                    <option>6 bulan</option>
                                </select>
                                {errors.durasi && <div className="mt-1 text-sm text-red-500">{errors.durasi}</div>}
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label className="mb-1 block font-medium">Tanggal Penutupan *</label>
                                <DatePicker
                                    selected={dateValue}
                                    onChange={(date) => {
                                        setDateValue(date);
                                        setData('tanggal_tutup', date ? date.toISOString().slice(0, 10) : '');
                                    }}
                                    minDate={new Date()}
                                    className="w-full rounded border px-3 py-2"
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Pilih tanggal penutupan"
                                    required
                                />
                                {errors.tanggal_tutup && <div className="mt-1 text-sm text-red-500">{errors.tanggal_tutup}</div>}
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="mb-1 block font-medium">Skill Dibutuhkan *</label>
                                <div className="mb-2 flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded border px-3 py-2"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        placeholder="Tambah skill..."
                                    />
                                    <button type="button" className="rounded bg-[#df0011] px-4 py-2 text-white" onClick={addSkill}>
                                        Tambah
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill) => (
                                        <span key={skill} className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1 text-sm">
                                            {skill}
                                            <button type="button" className="ml-1 text-red-500" onClick={() => removeSkill(skill)}>
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Requirement */}
                            <div>
                                <label className="mb-1 block font-medium">Requirement *</label>
                                <div className="mb-2 flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded border px-3 py-2"
                                        value={requirementInput}
                                        onChange={(e) => setRequirementInput(e.target.value)}
                                        placeholder="Tambah requirement..."
                                    />
                                    <button type="button" className="rounded bg-[#df0011] px-4 py-2 text-white" onClick={addRequirement}>
                                        Tambah
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.requirement.map((req) => (
                                        <span key={req} className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1 text-sm">
                                            {req}
                                            <button type="button" className="ml-1 text-red-500" onClick={() => removeRequirement(req)}>
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="mb-1 block font-medium">Deskripsi</label>
                                <textarea
                                    className="w-full rounded border px-3 py-2"
                                    rows={3}
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                />
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button type="button" className="rounded border px-5 py-2" onClick={closeForm}>
                                    Batal
                                </button>
                                <button type="submit" className="rounded bg-[#df0011] px-5 py-2 font-semibold text-white" disabled={processing}>
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* === MODAL DELETE === */}
            {showDeleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative flex w-full max-w-sm flex-col items-center rounded-xl bg-white p-8 text-black shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">Konfirmasi Hapus</h2>
                        <p className="mb-6 text-center">Apakah Anda yakin ingin menghapus lowongan ini?</p>
                        <div className="flex gap-4">
                            <button type="button" className="rounded border px-5 py-2" onClick={closeDeleteModal}>
                                Batal
                            </button>
                            <button type="button" className="rounded bg-[#df0011] px-5 py-2 font-semibold text-white" onClick={handleDelete}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
