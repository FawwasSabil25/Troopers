import { useState } from 'react';
import MainLayout from '../../layouts/troopers/MainLayout';

const faqs = [
    {
        question: 'Apa perbedaan Magang Reguler dan Praktik Kerja',
        answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        question: 'Bagaimana cara mendaftar?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        question: 'Bagaimana jika saya mengalami kendala saat pendaftaran?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        question: 'Apa yang harus dilakukan jika lupa sandi?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        question: 'Bagaimana cara registrasi akun?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        question: 'Apa benefit magang di Telkomsel?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        question: 'Berapa lama durasi magang di Troopers?',
        answer: 'lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
    {
        question: 'Apa itu Troopers?',
        answer: 'lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(search.toLowerCase()));

    return (
        <MainLayout activePage="faq">
            <div className="flex min-h-screen flex-col items-center bg-[#f9fafb] px-2 py-10 text-black -mt-5">
                <h1 className="pb-10 pt-2 text-center font-bold text-4xl">FAQ (Frequently Asked Questions)</h1>
                <div className="relative mb-8 flex w-full max-w-xl items-center">
                    <input
                        type="text"
                        className="w-full rounded-xl bg-white px-4 py-3 text-lg shadow-lg"
                        placeholder="Cari Pertanyaan.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                </div>

                <div className="flex w-full max-w-300 flex-col gap-4 pt-5">
                    {filteredFaqs.map((faq, idx) => (
                        <div key={idx} className="rounded-xl bg-white shadow-sm">
                            <button
                                className="flex w-full items-center justify-between px-6 py-4 text-left text-2xl font-medium"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            >
                                {faq.question}
                                <span className="ml-2">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                            </button>
                            {openIndex === idx && <div className="px-6 pb-4 text-xl text-gray-700">{faq.answer}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
