<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityLogController;

// Landing Page (Breeze)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
         
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Authenticated Routes
Route::middleware('auth')->group(function () {

    // Profile (Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Products
    Route::resource('products', ProductController::class);

    // Categories
    Route::resource('categories', CategoryController::class);

    // Suppliers
    Route::resource('suppliers', SupplierController::class);

    // Purchases
    Route::resource('purchases', PurchaseController::class);

    // Sales
    Route::resource('sales', SalesController::class);

    // Users
    Route::resource('users', UserController::class);

    Route::patch('/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])
        ->name('users.toggle-status');

    Route::get('/users/{user}/reset-password', [UserController::class, 'showResetPassword'])
        ->name('users.reset-password');

    Route::patch('/users/{user}/reset-password', [UserController::class, 'resetPassword'])
        ->name('users.reset-password.update');

    // Activity Logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index'])
        ->name('activity-logs.index');

    // Reports
    Route::get('/reports', [ReportsController::class, 'index'])
        ->name('reports.index');

    Route::get('/reports/sales', [ReportsController::class, 'sales'])
        ->name('reports.sales');

    Route::get('/reports/sales/print', [ReportsController::class, 'printSales'])
        ->name('reports.sales.print');

    Route::get('/reports/purchases', [ReportsController::class, 'purchases'])
        ->name('reports.purchases');

    Route::get('/reports/purchases/print', [ReportsController::class, 'printPurchases'])
        ->name('reports.purchases.print');

    Route::get('/reports/inventory', [ReportsController::class, 'inventory'])
        ->name('reports.inventory');

    Route::get('/reports/inventory/print', [ReportsController::class, 'printInventory'])
        ->name('reports.inventory.print');

    Route::get('/reports/low-stock', [ReportsController::class, 'lowstock'])
        ->name('reports.low_stock');

    Route::get('/reports/low-stock/print', [ReportsController::class, 'printLowStock'])
        ->name('reports.low_stock.print');
});

require __DIR__ . '/auth.php';
