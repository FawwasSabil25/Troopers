import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/troopers/AdminLayout';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    education: string;
    university: string;
    major: string;
    semester: string;
    role: string;
    ktp: string;
}





export default function UsersPage() {
    const { props } = usePage();
    const users: User[] = (props.users as User[]) ?? [];
    const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
    const [formData, setFormData] = useState<Partial<User & { password?: string; password_confirmation?: string }>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Live validation for email, phone, ktp
    useEffect(() => {
        const newErrors: Record<string, string> = { ...formErrors };
        // Required validation
        const requiredFields = [
            'name', 'email', 'phone', 'city', 'education', 'university', 'major', 'semester', 'role', 'ktp',
        ];
        requiredFields.forEach((field) => {
            if (!formData[field as keyof typeof formData] || String(formData[field as keyof typeof formData]).trim() === '') {
                newErrors[field] = 'Wajib diisi';
            } else {
                newErrors[field] = '';
            }
        });
        // Email validation
        if (formData.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }
        // Phone validation (Indonesian, starts 08, 10-13 digits)
        if (formData.phone && !/^08\d{8,11}$/.test(formData.phone)) {
            newErrors.phone = 'No. telepon harus diawali 08 dan 10-13 digit';
        }
        // KTP validation (16 digits)
        if (formData.ktp && !/^\d{16}$/.test(formData.ktp)) {
            newErrors.ktp = 'Nomor KTP harus 16 digit angka';
        }
        // Password validation (hanya saat create)
        if (formMode === 'create') {
            if (!formData.password || formData.password.length < 8) {
                newErrors.password = 'Password minimal 8 karakter';
            } else {
                newErrors.password = '';
            }
            if (formData.password !== formData.password_confirmation) {
                newErrors.password_confirmation = 'Konfirmasi password tidak sama';
            } else {
                newErrors.password_confirmation = '';
            }
        }
        setFormErrors(newErrors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, formMode]);

    function openDeleteModal(id: number) {
        setShowDeleteId(id);
    }
    function closeDeleteModal() {
        setShowDeleteId(null);
    }
    function handleDelete() {
        if (showDeleteId) {
            router.delete(`/users/${showDeleteId}`, {
                onSuccess: closeDeleteModal,
            });
        }
    }

    function openCreateModal() {
        setFormMode('create');
        setFormData({});
        setFormErrors({});
        setShowForm(true);
    }
    function openEditModal(user: User) {
        setFormMode('edit');
        setFormData({ ...user });
        setFormErrors({});
        setShowForm(true);
    }
    function closeFormModal() {
        setShowForm(false);
        setFormData({});
        setFormErrors({});
    }

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
    // Prevent submit if any live error
    if (Object.values(formErrors).some((err) => err)) return;
        setFormErrors({});
        if (formMode === 'create') {
            router.post('/users', formData, {
                onError: (errors: unknown) => setFormErrors(errors as Record<string, string>),
                onSuccess: closeFormModal,
            });
        } else if (formMode === 'edit' && formData.id) {
            router.put(`/users/${formData.id}`, formData, {
                onError: (errors: unknown) => setFormErrors(errors as Record<string, string>),
                onSuccess: closeFormModal,
            });
        }
    }

    return (
        <AdminLayout>
            <div className="rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow text-black max-w-7xl mx-auto w-full px-2 md:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Daftar Pengguna</h1>
                    <button
                        className="rounded bg-[#ff0000] px-4 py-2 font-semibold text-white hover:brightness-85 w-full md:w-auto"
                        onClick={openCreateModal}
                    >Tambah</button>
                </div>
                {/* Desktop Table */}
                <div className="hidden md:block">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2">No</th>
                                    <th className="px-4 py-2">Nama</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Telepon</th>
                                    <th className="px-4 py-2">Kota</th>
                                    <th className="px-4 py-2">Pendidikan</th>
                                    <th className="px-4 py-2">Universitas</th>
                                    <th className="px-4 py-2">Jurusan</th>
                                    <th className="px-4 py-2">Semester</th>
                                    <th className="px-4 py-2">Role</th>
                                    <th className="px-4 py-2">KTP</th>
                                    <th className="px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={12} className="py-8 text-center text-gray-500">Belum ada pengguna.</td>
                                    </tr>
                                )}
                                {users.map((u: User, idx: number) => (
                                    <tr key={u.id} className="border-b">
                                        <td className="px-4 py-2">{idx + 1}</td>
                                        <td className="px-4 py-2">{u.name}</td>
                                        <td className="px-4 py-2">{u.email}</td>
                                        <td className="px-4 py-2">{u.phone}</td>
                                        <td className="px-4 py-2">{u.city}</td>
                                        <td className="px-4 py-2">{u.education}</td>
                                        <td className="px-4 py-2">{u.university}</td>
                                        <td className="px-4 py-2">{u.major}</td>
                                        <td className="px-4 py-2">{u.semester}</td>
                                        <td className="px-4 py-2">{u.role}</td>
                                        <td className="px-4 py-2">{u.ktp}</td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                className="rounded bg-[#fff2a9] px-3 py-1 font-semibold text-black hover:brightness-85"
                                                onClick={() => openEditModal(u)}
                                            >Edit</button>
                                            <button
                                                className="rounded bg-[#ff0000] px-3 py-1 font-semibold text-white hover:brightness-85"
                                                onClick={() => openDeleteModal(u.id)}
                                            >Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Mobile Card List */}
                <div className="md:hidden flex flex-col gap-4">
                    {users.length === 0 ? (
                        <div className="py-8 text-center text-gray-500 bg-white rounded-xl shadow">Belum ada pengguna.</div>
                    ) : (
                        users.map((u: User, idx: number) => (
                            <div key={u.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-base">{idx + 1}. {u.name}</span>
                                    <span className="text-xs px-2 py-1 rounded-full font-semibold bg-gray-200 text-gray-700">{u.role}</span>
                                </div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">Email:</span> {u.email}</div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">Telepon:</span> {u.phone}</div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">Kota:</span> {u.city}</div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">Pendidikan:</span> {u.education}</div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">Universitas:</span> {u.university}</div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">Jurusan:</span> {u.major}</div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">Semester:</span> {u.semester}</div>
                                <div className="text-xs text-gray-700"><span className="font-semibold">KTP:</span> {u.ktp}</div>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        className="rounded bg-[#fff2a9] px-3 py-1 font-semibold text-black hover:brightness-85 w-full"
                                        onClick={() => openEditModal(u)}
                                    >Edit</button>
                                    <button
                                        className="rounded bg-[#ff0000] px-3 py-1 font-semibold text-white hover:brightness-85 w-full"
                                        onClick={() => openDeleteModal(u.id)}
                                    >Hapus</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* === MODAL FORM (CREATE/EDIT) === */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
                    <div className="relative w-full max-w-2xl rounded-xl bg-white p-8 text-black shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">{formMode === 'create' ? 'Tambah Pengguna' : 'Edit Pengguna'}</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Nama</label>
                                    <input type="text" name="name" value={formData.name || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2" />
                                    {formErrors.name && <div className="text-xs text-red-600">{formErrors.name}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input type="email" name="email" value={formData.email || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2" />
                                    {formErrors.email && <div className="text-xs text-red-600">{formErrors.email}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Telepon</label>
                                    <input type="text" name="phone" value={formData.phone || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2" />
                                    {formErrors.phone && <div className="text-xs text-red-600">{formErrors.phone}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Kota</label>
                                    <select name="city" value={formData.city || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2">
                                        <option value="" disabled>Pilih Kota</option>
                                        <option value="Jakarta">Jakarta</option>
                                        <option value="Bandung">Bandung</option>
                                        <option value="Surabaya">Surabaya</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {formErrors.city && <div className="text-xs text-red-600">{formErrors.city}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Pendidikan</label>
                                    <select name="education" value={formData.education || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2">
                                        <option value="" disabled>Pilih Pendidikan</option>
                                        <option value="D3">D3</option>
                                        <option value="D4">D4</option>
                                        <option value="S1">S1</option>
                                    </select>
                                    {formErrors.education && <div className="text-xs text-red-600">{formErrors.education}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Universitas</label>
                                    <select name="university" value={formData.university || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2">
                                        <option value="" disabled>Pilih Universitas</option>
                                        <option value="Universitas Indonesia">Universitas Indonesia</option>
                                        <option value="Institut Teknologi Bandung">Institut Teknologi Bandung</option>
                                        <option value="Universitas Gadjah Mada">Universitas Gadjah Mada</option>
                                        <option value="Institut Pertanian Bogor">Institut Pertanian Bogor</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {formErrors.university && <div className="text-xs text-red-600">{formErrors.university}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Jurusan</label>
                                    <select name="major" value={formData.major || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2">
                                        <option value="" disabled>Pilih Jurusan</option>
                                        <option value="Informatika">Informatika</option>
                                        <option value="Statistika">Statistika</option>
                                    </select>
                                    {formErrors.major && <div className="text-xs text-red-600">{formErrors.major}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Semester</label>
                                    <select name="semester" value={formData.semester || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2">
                                        <option value="">Pilih Semester</option>
                                        {[...Array(8)].map((_, i) => (
                                            <option key={i+1} value={String(i+1)}>{i+1}</option>
                                        ))}
                                    </select>
                                    {formErrors.semester && <div className="text-xs text-red-600">{formErrors.semester}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Role</label>
                                    <select name="role" value={formData.role || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2">
                                        <option value="" disabled>Pilih Role</option>
                                        <option value="mahasiswa">Mahasiswa</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {formErrors.role && <div className="text-xs text-red-600">{formErrors.role}</div>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">KTP</label>
                                    <input type="text" name="ktp" value={formData.ktp || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2" />
                                    {formErrors.ktp && <div className="text-xs text-red-600">{formErrors.ktp}</div>}
                                </div>
                                {formMode === 'create' && (
                                    <>
                                    <div>
                                        <label className="block mb-1 font-medium">Password</label>
                                        <input type="password" name="password" value={formData.password || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2" autoComplete="new-password" />
                                        {formErrors.password && <div className="text-xs text-red-600">{formErrors.password}</div>}
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Konfirmasi Password</label>
                                        <input type="password" name="password_confirmation" value={formData.password_confirmation || ''} onChange={handleFormChange} className="w-full rounded border px-3 py-2" autoComplete="new-password" />
                                        {formErrors.password_confirmation && <div className="text-xs text-red-600">{formErrors.password_confirmation}</div>}
                                    </div>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" className="rounded border px-5 py-2 bg-[#ffffff] hover:brightness-85 w-auto" onClick={closeFormModal}>
                                    Batal
                                </button>
                                <button type="submit" className="rounded bg-[[#df0011] px-5 py-2 font-semibold text-white hover:brightness-85 w-auto">
                                    {formMode === 'create' ? 'Tambah' : 'Simpan'}
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
                        <p className="mb-6 text-center">Apakah Anda yakin ingin menghapus akun pengguna ini?</p>
                        <div className="flex gap-4">
                            <button type="button" className="rounded border px-5 py-2 bg-[#ffffff] hover:brightness-85" onClick={closeDeleteModal}>
                                Batal
                            </button>
                            <button type="button" className="rounded bg-[#df0011] px-5 py-2 font-semibold text-white hover:brightness-85" onClick={handleDelete}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
