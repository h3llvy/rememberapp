<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePassMemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'password' => 'required|min:8|max:64',
        ];
    }
}
