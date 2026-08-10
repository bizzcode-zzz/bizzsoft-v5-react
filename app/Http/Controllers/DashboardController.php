<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Sales;
use App\Models\Purchase;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        if (! auth()->user()->hasPermission('dashboard.view')) {
            abort(403);
        }

        // Dashboard counts
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalSuppliers = Supplier::count();
        $totalSales = Sales::count();
        $totalPurchases = Purchase::count();

        // Total revenue
        $totalRevenue = Sales::sum(
            DB::raw('quantity * selling_price')
        );

        // Low stock products
        $totalLowStockProducts = Product::whereColumn(
            'stock',
            '<=',
            'reorder_level'
        )->count();

        // Recent sales
        $recentSales = Sales::with('product')
            ->latest()
            ->take(5)
            ->get();

        // Recent purchases
        $recentPurchases = Purchase::with([
            'product',
            'supplier'
        ])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'totalProducts' => $totalProducts,
            'totalCategories' => $totalCategories,
            'totalSuppliers' => $totalSuppliers,
            'totalSales' => $totalSales,
            'totalPurchases' => $totalPurchases,
            'totalRevenue' => $totalRevenue,
            'totalLowStockProducts' => $totalLowStockProducts,
            'recentSales' => $recentSales,
            'recentPurchases' => $recentPurchases,
        ]);
    }
}