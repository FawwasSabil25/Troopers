// resources/js/components/NotesModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    pengajuanId: number;
    pengajuanType: 'magang' | 'kerja-praktik';
    noteType: 'interview' | 'tes';
    currentNote?: string;
    applicantName: string;
    anchorRef?: React.RefObject<HTMLElement>;
}

export default function NotesModal({
    isOpen,
    onClose,
    pengajuanId,
    pengajuanType,
    noteType,
    currentNote = '',
    anchorRef,
}: NotesModalProps) {
    const [note, setNote] = useState(currentNote);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        setNote(currentNote);
    }, [currentNote, isOpen]);

    // Position popover near anchor
    useEffect(() => {
        if (isOpen && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            const popoverHeight = 220;
            const popoverWidth = 340;
            let top = rect.bottom + window.scrollY + 8;
            let left = rect.left + window.scrollX;
            if (top + popoverHeight > window.innerHeight + window.scrollY) {
                top = rect.top + window.scrollY - popoverHeight - 8;
            }
            if (left + popoverWidth > window.innerWidth + window.scrollX) {
                left = window.innerWidth + window.scrollX - popoverWidth - 16;
            }
            setPosition({ top, left });
        }
    }, [isOpen, anchorRef]);

    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;
        function handle(e: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                (!anchorRef?.current || !anchorRef.current.contains(e.target as Node))
            ) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, [isOpen, onClose, anchorRef]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const endpoint = pengajuanType === 'magang'
            ? `/pengajuan-magang/${pengajuanId}/notes`
            : `/pengajuan-kerja-praktik/${pengajuanId}/notes`;
        router.put(endpoint, {
            note_type: noteType,
            note_content: note
        }, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleClose = () => {
        setNote(currentNote);
        onClose();
    };

    if (!isOpen || !position) return null;

    const placeholder = noteType === 'tes'
        ? 'Masukkan link tes disini'
        : 'Masukkan link meeting disini';

    // Helper: check if value is a valid URL
    function isValidUrl(val: string): boolean {
        try {
            const url = new URL(val);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    }

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div
                ref={popoverRef}
                className="absolute pointer-events-auto w-[340px] max-w-full rounded-2xl bg-white p-6 text-black shadow-lg border border-gray-200"
                style={{ top: position.top, left: position.left }}
            >
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">Catatan</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none">×</button>
                </div>
                <p className="text-gray-600 mb-2">{placeholder}</p>
                <input
                    type="url"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="https://"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Preview note as link or plain text */}
                {note !== undefined && note !== null && note !== '' && (
                    <div className="mt-3">
                        {isValidUrl(note.trim()) ? (
                            <a
                                href={note.trim()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline break-all hover:text-blue-800"
                            >
                                {note.trim()}
                            </a>
                        ) : (
                            <span className="text-gray-800 break-all">{note}</span>
                        )}
                    </div>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-gradient-to-r from-red-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-red-600 hover:to-purple-700 transition"
                >
                    {isSubmitting ? 'Menyimpan...' : 'Kirim'}
                </button>
            </div>
        </div>
    );
}