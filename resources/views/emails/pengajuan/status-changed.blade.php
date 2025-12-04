<x-mail::message>
# Status Pengajuan {{ $jenis }} Anda Diperbarui

Halo {{ $name }},

Status pengajuan {{ strtolower($jenis) }} Anda telah berubah dari **{{ $oldStatus ?? 'Belum ada' }}** menjadi **{{ $newStatus }}**.

@if($divisi)
Divisi tujuan: **{{ $divisi }}**
@endif

Silakan masuk ke dashboard untuk melihat detail terbaru dan mempersiapkan langkah selanjutnya.

<x-mail::button :url="$detailUrl">
Lihat Pengajuan
</x-mail::button>

Terima kasih,
<br>{{ config('app.name') }}
</x-mail::message>
