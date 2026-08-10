<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\Product;
use App\Models\Supplier;
use App\Http\Requests\PurchaseRequest;
use Illuminate\Support\Facades\DB;
use App\Services\ActivityLogger;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (! auth()->user()->hasPermission('purchases.view')) {
            abort(403);
        }

        // Kukuha ng tinype ng user sa search input field
        $search = $request->input('search');

        // Sasalain ang database gamit ang SQL LIKE query kung may hinahanap ang user
        $purchases = Purchase::with(['product', 'supplier'])
    ->when($search, function ($query, $search) {

        $query->where(function ($q) use ($search) {

            $q->where('quantity', 'LIKE', "%{$search}%")
                ->orWhere('cost_price', 'LIKE', "%{$search}%")
                ->orWhereHas('product', function ($productQuery) use ($search) {
                    $productQuery->where('name', 'LIKE', "%{$search}%");
                })
                ->orWhereHas('supplier', function ($supplierQuery) use ($search) {
                    $supplierQuery->where('supplier_name', 'LIKE', "%{$search}%");
                });

        });

    })
    ->get();

        // Kukunin ang Products at Suppliers para sa dropdown
        $products = Product::all();
        $suppliers = Supplier::all();

        return Inertia::render('Purchases/Index', [
            'purchases' => $purchases,
            'products' => $products,
            'suppliers' => $suppliers,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PurchaseRequest $request)
    {
        if (! auth()->user()->hasPermission('purchases.create')) {
            abort(403);
        }

        DB::transaction(function () use ($request) {

            $purchase = Purchase::create($request->validated());

            $product = Product::find($request->product_id);

            if ($product) {
                $product->stock += $request->quantity;
                $product->save();
            }

            // Activity Log
            $description =
                "Purchased {$purchase->quantity} units of {$purchase->product->name} " .
                "from {$purchase->supplier->supplier_name}.";

            ActivityLogger::log(
                'Created',
                'Purchase',
                $description
            );
        });

        return redirect()
            ->route('purchases.index')
            ->with('success', 'Purchase transaction saved successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        if (! auth()->user()->hasPermission('purchases.delete')) {
            abort(403);
        }

        DB::transaction(function () use ($purchase) {

            // Hanapin ang product na kabilang sa purchase
            $product = Product::find($purchase->product_id);

            if ($product) {

                // Reverse stock
                $product->stock -= $purchase->quantity;
                $product->save();
            }

            // Activity Log Description
            $description =
                "Deleted purchase of {$purchase->quantity} units of {$purchase->product->name} " .
                "from {$purchase->supplier->supplier_name}.";

            // Delete purchase record
            $purchase->delete();

            // Activity Log
            ActivityLogger::log(
                'Deleted',
                'Purchase',
                $description
            );
        });

        return redirect()
            ->route('purchases.index')
            ->with(
                'success',
                'Purchase record deleted and product stock automatically adjusted!'
            );
    }
}