<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sales;
use App\Models\Purchase;
use App\Models\Product; // ⚠️ I-import ito para sa Inventory at Low Stock checks
use Carbon\Carbon; // para sa date
use App\Models\Category;
use Barryvdh\DomPDF\Facade\Pdf;

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

        return view('reports.index');
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

                $sales = $query
                ->latest()
                ->paginate(10);

    $totalSales = $summarySales->sum('line_total');
    $totalQuantity = $summarySales->sum('quantity');
    $totalTransactions = $summarySales->count();

 return view('reports.sales', compact(
    'sales',
    'totalSales',
    'totalQuantity',
    'totalTransactions'
));
    }



// SALES PRINT FEATURE
public function salesPrint(Request $request)
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

                $sales = $query
                ->latest()
                ->get();

$totalSales = $sales->sum('line_total');
$totalQuantity = $sales->sum('quantity');
$totalTransactions = $sales->count();

 return view('reports.sales-print', compact(
    'sales',
    'totalSales',
    'totalQuantity',
    'totalTransactions'
));
}


// SALES PDF
public function salesPdf(Request $request)
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

    $sales = $query->latest()->get();

    $totalSales = $sales->sum('line_total');
    $totalQuantity = $sales->sum('quantity');
    $totalTransactions = $sales->count();

    $pdf = Pdf::loadView('reports.pdf.sales', compact(
        'sales',
        'totalSales',
        'totalQuantity',
        'totalTransactions'
    ));

    return $pdf->download('sales-report.pdf');
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

    $purchases = $query
    ->latest()
    ->paginate(10);

    $totalPurchaseCost = $summaryPurchases->sum(function ($purchase) {

    return $purchase->quantity * $purchase->cost_price;

});

    $totalQuantityPurchased = $summaryPurchases->sum('quantity');

    $totalTransactions = $summaryPurchases->count();

        return view('reports.purchases', compact(
    'purchases',
    'totalPurchaseCost',
    'totalQuantityPurchased',
    'totalTransactions'
));
    }

// PURCHASE PRINT REPORT FEATURE
public function purchasesPrint(Request $request)
{
    // 1. Check Permissions
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    // 2. Base Query kasama ang Product Relation
  $query = Purchase::with(['product', 'supplier']);

    // 3. Date Range Filter gamit ang malinis na Carbon call
    if ($request->filled('from') && $request->filled('to')) {
        $query->whereBetween('created_at', [
            Carbon::parse($request->from)->startOfDay(),
            Carbon::parse($request->to)->endOfDay(),
        ]);
    }

    // 4. Execute Query
    $purchases = $query->latest()->get();

    
    $totalPurchaseCost = $purchases->sum(function ($purchase) {

    return $purchase->quantity * $purchase->cost_price;

});
    $totalQuantityPurchased = $purchases->sum('quantity');
    $totalTransactions = $purchases->count();

    // 6. Return View
    return view('reports.purchases-print', compact(
    'purchases',
    'totalPurchaseCost',
    'totalQuantityPurchased',
    'totalTransactions'
));
}



// PURCHASE PDF
public function purchasesPdf(Request $request)
{
    // 1. Check Permission
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    // 2. Base Query kasama ang Product at Supplier Relationship
    $query = Purchase::with(['product', 'supplier']);

    // 3. Date Filter
    if ($request->filled('from') && $request->filled('to')) {
        $query->whereBetween('created_at', [
            Carbon::parse($request->from)->startOfDay(),
            Carbon::parse($request->to)->endOfDay(),
        ]);
    }

    // 4. Execute Query
    $purchases = $query->latest()->get();

    // 5. Summary Computation
    $totalPurchaseCost = $purchases->sum(function ($purchase) {
        return $purchase->quantity * $purchase->cost_price;
    });

    $totalQuantityPurchased = $purchases->sum('quantity');
    $totalTransactions = $purchases->count();

    // 6. Generate PDF
    $pdf = Pdf::loadView('reports.pdf.purchases', compact(
        'purchases',
        'totalPurchaseCost',
        'totalQuantityPurchased',
        'totalTransactions'
    ));

    // 7. Download PDF
    return $pdf->download('purchases-report.pdf');
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
    $query->where('name', 'like', '%' . $request->search . '%');
}

if ($request->filled('category')) {
    $query->where('category_id', $request->category);
}

    $summaryProducts = $query
        ->get();

    $products = $query
        ->paginate(10);

    $totalProducts = $summaryProducts->count();

    $totalStock = $summaryProducts->sum('stock');

    $lowStockProducts = $summaryProducts->filter(function ($product) {

        return $product->stock > 0 &&
               $product->stock <= $product->reorder_level;

    })->count();

    $outOfStockProducts = $summaryProducts->where('stock', 0)->count();
    $categories = Category::orderBy('category_name')->get();

    return view('reports.inventory', compact(
        'products',
        'totalProducts',
        'totalStock',
        'lowStockProducts',
        'outOfStockProducts',
        'categories'
    ));
}


// INVENTORY PRINT REPORT FEATURE
public function inventoryPrint(Request $request)
{
    // 1. Check Permissions
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    // 2. Base Query kasama ang Category Relation base sa inyong pattern
    $query = Product::with('category');

    // 3. Filters (Search at Category kung mayroon)
    if ($request->filled('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    if ($request->filled('category')) {
        $query->where('category_id', $request->category);
    }

    // 4. Execute Query (Gagamit ng get() para sa printout)
    $products = $query->latest()->get();

    // 5. Computations base sa inyong logic
    $totalProducts = $products->count();
    $totalStock = $products->sum('stock');
    
    $lowStockProducts = $products->filter(function ($product) {
        return $product->stock > 0 &&
               $product->stock <= $product->reorder_level;
    })->count();

    $outOfStockProducts = $products->where('stock', 0)->count();

    // 6. Return View para sa inventory print layout
    return view('reports.inventory-print', compact(
        'products',
        'totalProducts',
        'totalStock',
        'lowStockProducts',
        'outOfStockProducts'
    ));
}


// INVENTORY PDF
public function inventoryPdf(Request $request)
{
    // 1. Check permission
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    // 2. Initialize query with relationship
    $query = Product::with('category');

    // 3. Search and Category Filters
    if ($request->filled('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    if ($request->filled('category')) {
        $query->where('category_id', $request->category);
    }

    // 4. Get all filtered records for the PDF (Walang pagination para buo ang listahan sa PDF)
    $products = $query->get();

    // 5. Calculate data summaries (Eksaktong gaya ng logic mo)
    $totalProducts = $products->count();
    $totalStock = $products->sum('stock');
    
    $lowStockProducts = $products->filter(function ($product) {
        return $product->stock > 0 && $product->stock <= $product->reorder_level;
    })->count();

    $outOfStockProducts = $products->where('stock', 0)->count();

    // 6. Load the PDF view
    $pdf = Pdf::loadView('reports.pdf.inventory', compact(
        'products',
        'totalProducts',
        'totalStock',
        'lowStockProducts',
        'outOfStockProducts'
    ));

    // 7. Download the PDF file
    return $pdf->download('inventory-report.pdf');
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
    $query->where('name', 'like', '%' . $request->search . '%');
}

    $summaryProducts = $query->get();

    $lowStockProducts = $query->paginate(10);

    $totalLowStockProducts = $summaryProducts->count();

    $totalLowStockQuantity = $summaryProducts->sum('stock');

    return view('reports.lowstock', compact(
        'lowStockProducts',
        'totalLowStockProducts',
        'totalLowStockQuantity'
    ));
}



public function lowStockPrint(Request $request)
{
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

 
    $printQuery = Product::with('category')
        ->where('stock', '>', 0)
        ->whereColumn('stock', '<=', 'reorder_level');

    if ($request->filled('search')) {
        $printQuery->where('name', 'like', '%' . $request->search . '%');
    }

    
    $lowStockProducts = $printQuery->latest()->get();

 
    $totalLowStockProducts = $lowStockProducts->count();
    $totalLowStockQuantity = $lowStockProducts->sum('stock');

    return view('reports.lowstock-print', compact(
        'lowStockProducts',
        'totalLowStockProducts',
        'totalLowStockQuantity'
    ));

}

// LOW STOCK PDF
public function lowstockPdf(Request $request)
{
    // 1. Check permission
    if (! auth()->user()->hasPermission('reports.view')) {
        abort(403);
    }

    // 2. Initialize query with low stock conditions
    $query = Product::with('category')
        ->where('stock', '>', 0)
        ->whereColumn('stock', '<=', 'reorder_level');

    // 3. Search Filter
    if ($request->filled('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    // 4. Get all records for PDF
    $lowStockProducts = $query->get();

    // 5. Calculate data summaries base sa code mo
    $totalLowStockProducts = $lowStockProducts->count();
    $totalLowStockQuantity = $lowStockProducts->sum('stock');

    // 6. Load the PDF view
    $pdf = Pdf::loadView('reports.pdf.low-stock', compact(
    'lowStockProducts',
    'totalLowStockProducts',
    'totalLowStockQuantity'
));

    // 7. Download the PDF file
    return $pdf->download('low-stock-report.pdf');
}

}