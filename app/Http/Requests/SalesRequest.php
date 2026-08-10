<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',

            'quantity' => 'required|integer|min:1',

            'sales_date' => 'required|date|before_or_equal:today',
        ];
    }

    /**
     * Get the custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'product_id.required' =>
                'Product is required.',

            'quantity.required' =>
                'Quantity is required.',

            'quantity.integer' =>
                'Quantity must be a whole number.',

            'quantity.min' =>
                'Quantity must be at least 1.',

            'sales_date.required' =>
                'Sales Date is required.',

            'sales_date.date' =>
                'Sales Date must be a valid date.',

            'sales_date.before_or_equal' =>
                'Sales Date cannot be in the future.',
        ];
    }
}