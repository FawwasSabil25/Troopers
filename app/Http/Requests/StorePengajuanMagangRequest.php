<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengajuanMagangRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'telepon' => ['required', 'string', 'max:20'],
            'domisili' => ['required', 'string', 'max:100'],
            'universitas' => ['required', 'string', 'max:255'],
            'jurusan' => ['required', 'string', 'max:255'],
            'semester' => ['required', 'string', 'max:10'],
            'ipk' => ['required', 'numeric', 'between:0,4.00'],
            'durasi' => ['required', 'string', 'max:20'],
            'tanggal_mulai' => ['required', 'date'],
            'minat' => ['required', 'array'],
            'minat.*' => ['string'],
            'skill_opsional' => ['nullable', 'string', 'max:255'],
            'motivasi' => ['required', 'string'],
            'cv_path' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'portfolio_url' => ['nullable', 'url', 'max:255'],
            'portfolio_file' => ['nullable', 'file', 'mimes:pdf,zip,rar', 'max:10240'],
            'pengalaman' => ['nullable', 'string'],
            'tujuan' => ['nullable', 'string'],
            'lowongan_id' => 'required|integer|exists:lowongan_magangs,id',
        ];
    }
}
