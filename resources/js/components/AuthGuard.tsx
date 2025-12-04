import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

interface AuthGuardProps {
    children: React.ReactNode;
    redirectTo?: string;
    showLoginPrompt?: boolean;
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role?: string;
}

interface PageProps {
    auth: {
        user: AuthUser | null;
    };
}

export default function AuthGuard({ 
    children, 
    redirectTo = '/login',
    showLoginPrompt = true 
}: AuthGuardProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    useEffect(() => {
        if (!user) {
            // Redirect to login if user is not authenticated
            router.visit(redirectTo, {
                data: {
                    message: 'Anda harus login terlebih dahulu untuk mengakses halaman ini.'
                }
            });
        }
    }, [user, redirectTo]);

    // Show loading or login prompt while checking authentication
    if (!user) {
        if (showLoginPrompt) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-[#f9fafb]">
                    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                        <div className="mb-6">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Login Diperlukan</h2>
                            <p className="mt-2 text-gray-600">
                                Anda harus login terlebih dahulu untuk mengakses form pengajuan magang dan kerja praktik.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.visit('/login')}
                                className="w-full rounded-xl bg-gradient-to-r from-[#d23c43] via-[#cd4695] to-[#9330bd] px-6 py-3 text-white font-semibold shadow hover:shadow-lg transition-shadow"
                            >
                                Login Sekarang
                            </button>
                            <button
                                onClick={() => router.visit('/register')}
                                className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-semibold shadow hover:shadow-lg transition-shadow"
                            >
                                Daftar Akun Baru
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="w-full text-gray-500 hover:text-gray-700 font-medium"
                            >
                                ← Kembali
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return null; // Don't render anything if not showing prompt
    }

    // User is authenticated, render children
    return <>{children}</>;
}

// Hook for checking authentication status
export function useAuth() {
    const { auth } = usePage<PageProps>().props;
    return {
        user: auth?.user || null,
        isAuthenticated: !!auth?.user,
        isAdmin: auth?.user?.role === 'admin'
    };
}
