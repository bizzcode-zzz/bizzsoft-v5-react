<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sales;
use App\Models\Product;
use App\Http\Requests\SalesRequest;
use Illuminate\Support\Facades\DB;
use App\Services\ActivityLogger;
use Inertia\Inertia;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (! auth()->user()->hasPermission('sales.view')) {
            abort(403);
        }

        // Search value
        $search = $request->input('search');

        // Get sales with product relationship
        $salesRecords = Sales::with('product')
    ->when($search, function ($query, $search) {

        $query->where(function ($q) use ($search) {

            $q->where('quantity', 'LIKE', "%{$search}%")
                ->orWhere('selling_price', 'LIKE', "%{$search}%")
                ->orWhereHas('product', function ($productQuery) use ($search) {
                    $productQuery->where(
                        'name',
                        'LIKE',
                        "%{$search}%"
                    );
                });

        });

    })
    ->get();

        // Products for dropdown
        $products = Product::all();

        return Inertia::render('Sales/Index', [
            'salesRecords' => $salesRecords,
            'products' => $products,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SalesRequest $request)
    {
        if (! auth()->user()->hasPermission('sales.create')) {
            abort(403);
        }

        // Hanapin ang product
        $product = Product::findOrFail($request->product_id);

        // Prevent negative stock
        if ($product->stock < $request->quantity) {

            return redirect()
                ->back()
                ->withErrors([
                    'quantity' =>
                        'Insufficient stock! Only ' .
                        $product->stock .
                        ' units left in the inventory.'
                ])
                ->withInput();
        }

        DB::transaction(function () use ($request, $product) {

            // Get validated data
            $data = $request->validated();

            // Trusted selling price from Product
            $data['selling_price'] = $product->price;

            // Compute line total
            $data['line_total'] =
                $data['quantity'] * $data['selling_price'];

            // Create sale
            $sale = Sales::create($data);

            // Decrease product stock
            $product->stock -= $request->quantity;
            $product->save();

            // Activity Log
            $description =
                "Sold {$sale->quantity} units of {$sale->product->name}.";

            ActivityLogger::log(
                'Created',
                'Sales',
                $description
            );
        });

        return redirect()
            ->route('sales.index')
            ->with(
                'success',
                'Sales transaction saved and product stock updated!'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sales $sale)
    {
        if (! auth()->user()->hasPermission('sales.delete')) {
            abort(403);
        }

        DB::transaction(function () use ($sale) {

            // Find product
            $product = Product::find($sale->product_id);

            if ($product) {

                // Reverse stock
                $product->stock += $sale->quantity;
                $product->save();
            }

            // Activity Log Description
            $description =
                "Deleted sale of {$sale->quantity} units of {$sale->product->name}.";

            // Delete sale
            $sale->delete();

            // Activity Log
            ActivityLogger::log(
                'Deleted',
                'Sales',
                $description
            );
        });

        return redirect()
            ->route('sales.index')
            ->with(
                'success',
                'Sales record deleted and product stock automatically adjusted!'
            );
    }
}