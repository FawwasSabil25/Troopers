<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PengajuanStatusChanged extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public ?string $oldStatus,
        public string $newStatus,
        public string $detailUrl,
        public ?string $divisi = null,
        public string $jenis = 'Pengajuan'
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pembaruan Status Pengajuan ' . $this->jenis,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.pengajuan.status-changed',
            with: [
                'name' => $this->name,
                'oldStatus' => $this->oldStatus,
                'newStatus' => $this->newStatus,
                'divisi' => $this->divisi,
                '/myDashboard' => $this->detailUrl,
                'jenis' => $this->jenis,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

