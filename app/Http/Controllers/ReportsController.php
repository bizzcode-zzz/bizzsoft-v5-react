<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sales;
use App\Models\Purchase;
use App\Models\Product; // ⚠️ I-import ito para sa Inventory at Low Stock checks
use Carbon\Carbon; // para sa date
use App\Models\Category;

use Inertia\Inertia;

class ReportsController extends Controller
{
    /**
     * 📊 Reports Main Landing Menu (index.blade.php)
     */
    public function index()
    {
        if (! auth()->user()->hasPermission('reports.view')) {
            abort(403);
        }

        return Inertia::render('Reports/Index');
    }




    /**
     * 1. (sales.blade.php)
     */
    public function sales(Request $request)
    {
        if (! auth()->user()->hasPermission('reports.view')) {
            abort(403);
        }

        $query = Sales::with('product');

        if ($request->filled('from') && $request->filled('to')) {

            $query->whereBetween('created_at', [
                Carbon::parse($request->from)->startOfDay(),
                Carbon::parse($request->to)->endOfDay(),
            ]);
        }

        $summarySales = $query
            ->latest()
            ->get();

        $allSales = $summarySales;

        $sales = $query
            ->latest()
            ->paginate(10);

        $totalSales = $summarySales->sum('line_total');
        $totalQuantity = $summarySales->sum('quantity');
        $totalTransactions = $summarySales->count();

        return Inertia::render('Reports/Sales', [
            'sales' => $sales,
            'allSales' => $allSales,
            'totalSales' => $totalSales,
            'totalQuantity' => $totalQuantity,
            'totalTransactions' => $totalTransactions,
            'filters' => [
                'from' => $request->from,
                'to' => $request->to,
            ],
        ]);
    }



    public function printSales(Request $request)
    {
        if (! auth()->user()->hasPermission('reports.view')) {
            abort(403);
        }

        $query = Sales::with('product');

        if ($request->filled('from') && $request->filled('to')) {

            $query->whereBetween('created_at', [
                Carbon::parse($request->from)->startOfDay(),
                Carbon::parse($request->to)->endOfDay(),
            ]);
        }

        $sales = $query
            ->latest()
            ->get();

        $totalSales = $sales->sum('line_total');
        $totalQuantity = $sales->sum('quantity');
        $totalTransactions = $sales->count();

        return Inertia::render('Reports/Print/Sales', [
            'sales' => $sales,
            'totalSales' => $totalSales,
            'totalQuantity' => $totalQuantity,
            'totalTransactions' => $totalTransactions,
            'filters' => [
                'from' => $request->from,
                'to' => $request->to,
            ],
        ]);
    }



    /**
     * 2.Purchase Report (purchases.blade.php)
     */
    public function purchases(Request $request)
    {
        if (! auth()->user()->hasPermission('reports.view')) {
            abort(403);
        }

        $query = Purchase::with(['product', 'supplier']);

        if ($request->filled('from') && $request->filled('to')) {

            $query->whereBetween('created_at', [
                Carbon::parse($request->from)->startOfDay(),
                Carbon::parse($request->to)->endOfDay(),
            ]);
        }

        $summaryPurchases = $query
            ->latest()
            ->get();

        $allPurchases = $summaryPurchases;

        $purchases = $query
            ->latest()
            ->paginate(10);

        $totalPurchaseCost = $summaryPurchases->sum(function ($purchase) {
            return $purchase->quantity * $purchase->cost_price;
        });

        $totalQuantityPurchased = $summaryPurchases->sum('quantity');

        $totalTransactions = $summaryPurchases->count();

        return Inertia::render('Reports/Purchases', [
            'purchases' => $purchases,
            'allPurchases' => $allPurchases,
            'totalPurchaseCost' => $totalPurchaseCost,
            'totalQuantityPurchased' => $totalQuantityPurchased,
            'totalTransactions' => $totalTransactions,
            'filters' => [
                'from' => $request->from,
                'to' => $request->to,
            ],
        ]);
    }


    public function printPurchases(Request $request)
{
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    $query = Purchase::with(['product', 'supplier']);

    if ($request->filled('from') && $request->filled('to')) {

        $query->whereBetween('created_at', [
            Carbon::parse($request->from)->startOfDay(),
            Carbon::parse($request->to)->endOfDay(),
        ]);
    }

    $purchases = $query
        ->latest()
        ->get();

    $totalPurchaseCost = $purchases->sum(function ($purchase) {
        return $purchase->quantity * $purchase->cost_price;
    });

    $totalQuantityPurchased = $purchases->sum('quantity');

    $totalTransactions = $purchases->count();

    return Inertia::render('Reports/Print/Purchases', [
        'purchases' => $purchases,
        'totalPurchaseCost' => $totalPurchaseCost,
        'totalQuantityPurchased' => $totalQuantityPurchased,
        'totalTransactions' => $totalTransactions,
        'filters' => [
            'from' => $request->from,
            'to' => $request->to,
        ],
    ]);
}


    /**
     *  3. Inventory Report (inventory.blade.php)
     */
    public function inventory(Request $request)
    {
        if (! auth()->user()->hasPermission('reports.view')) {
            abort(403);
        }

        $query = Product::with('category');

        if ($request->filled('search')) {
            $query->where(
                'name',
                'like',
                '%' . $request->search . '%'
            );
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        $summaryProducts = $query->get();

        $allProducts = $summaryProducts;

        $products = $query->paginate(10);

        $totalProducts = $summaryProducts->count();

        $totalStock = $summaryProducts->sum('stock');

        $lowStockProducts = $summaryProducts->filter(function ($product) {
            return $product->stock > 0 &&
                $product->stock <= $product->reorder_level;
        })->count();

        $outOfStockProducts = $summaryProducts
            ->where('stock', 0)
            ->count();

        $categories = Category::orderBy('category_name')->get();

        return Inertia::render('Reports/Inventory', [
            'products' => $products,
            'allProducts' => $allProducts,
            'totalProducts' => $totalProducts,
            'totalStock' => $totalStock,
            'lowStockProducts' => $lowStockProducts,
            'outOfStockProducts' => $outOfStockProducts,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }


public function printInventory(Request $request)
{
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    $query = Product::with('category');

    if ($request->filled('search')) {
        $query->where(
            'name',
            'like',
            '%' . $request->search . '%'
        );
    }

    if ($request->filled('category')) {
        $query->where('category_id', $request->category);
    }

    $products = $query->get();

    $totalProducts = $products->count();

    $totalStock = $products->sum('stock');

    $lowStockProducts = $products->filter(function ($product) {
        return $product->stock > 0 &&
            $product->stock <= $product->reorder_level;
    })->count();

    $outOfStockProducts = $products
        ->where('stock', 0)
        ->count();

    return Inertia::render('Reports/Print/Inventory', [
        'products' => $products,
        'totalProducts' => $totalProducts,
        'totalStock' => $totalStock,
        'lowStockProducts' => $lowStockProducts,
        'outOfStockProducts' => $outOfStockProducts,
        'filters' => [
            'search' => $request->search,
            'category' => $request->category,
        ],
    ]);
}



    /**
     * 4.  Low Stock Report (lowstock.blade.php)
     */
    public function lowstock(Request $request)
    {
        if (! auth()->user()->hasPermission('reports.view')) {
            abort(403);
        }

        $query = Product::with('category')
            ->where('stock', '>', 0)
            ->whereColumn('stock', '<=', 'reorder_level');

        if ($request->filled('search')) {
            $query->where(
                'name',
                'like',
                '%' . $request->search . '%'
            );
        }

        $summaryProducts = $query->get();

        $allLowStockProducts = $summaryProducts;

        $lowStockProducts = $query->paginate(10);

        $totalLowStockProducts = $summaryProducts->count();

        $totalLowStockQuantity = $summaryProducts->sum('stock');

        return Inertia::render('Reports/LowStock', [
            'lowStockProducts' => $lowStockProducts,
            'allLowStockProducts' => $allLowStockProducts,
            'totalLowStockProducts' => $totalLowStockProducts,
            'totalLowStockQuantity' => $totalLowStockQuantity,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function printLowStock(Request $request)
{
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    $query = Product::with('category')
        ->where('stock', '>', 0)
        ->whereColumn('stock', '<=', 'reorder_level');

    if ($request->filled('search')) {
        $query->where(
            'name',
            'like',
            '%' . $request->search . '%'
        );
    }

    $products = $query->get();

    $totalLowStockProducts = $products->count();

    $totalLowStockQuantity = $products->sum('stock');

    return Inertia::render('Reports/Print/LowStock', [
        'lowStockProducts' => $products,
        'totalLowStockProducts' => $totalLowStockProducts,
        'totalLowStockQuantity' => $totalLowStockQuantity,
        'filters' => [
            'search' => $request->search,
        ],
    ]);
}
}
