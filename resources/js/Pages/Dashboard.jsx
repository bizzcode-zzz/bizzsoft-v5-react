import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import Card from '@/Components/BizzSoft/Card';
import Table from '@/Components/BizzSoft/Table';

export default function Dashboard({
    totalProducts,
    totalCategories,
    totalSuppliers,
    totalSales,
    totalPurchases,
    totalRevenue,
    totalLowStockProducts,
    recentSales,
    recentPurchases,
}) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56] dark:text-blue-300">
                        Dashboard
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                        Overview of your inventory and business activity.
                    </p>
                </div>
            }
        >

            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        DASHBOARD STATS
                    ================================================== */}

                    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <Card title="📦 Total Products">

                            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300">
                                {totalProducts}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                                Products in inventory
                            </p>

                        </Card>


                        <Card title="🗂️ Total Categories">

                            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300">
                                {totalCategories}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                                Product categories
                            </p>

                        </Card>


                        <Card title="🚚 Total Suppliers">

                            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300">
                                {totalSuppliers}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                                Registered suppliers
                            </p>

                        </Card>


                        <Card title="⚠️ Low Stock">

                            <h2 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                                {totalLowStockProducts}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                                Products requiring restock
                            </p>

                        </Card>

                    </div>


                    {/* =================================================
                        SALES / PURCHASES / REVENUE
                    ================================================== */}

                    <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                        <Card title="💰 Total Sales">

                            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300">
                                {totalSales}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                                Recorded sales transactions
                            </p>

                        </Card>


                        <Card title="🧾 Total Purchases">

                            <h2 className="text-3xl font-extrabold text-[#102a56] dark:text-blue-300">
                                {totalPurchases}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                                Recorded purchase transactions
                            </p>

                        </Card>


                        <Card title="💵 Total Revenue">

                            <h2 className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                                ₱{Number(totalRevenue).toFixed(2)}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                                Total recorded revenue
                            </p>

                        </Card>

                    </div>


                    {/* =================================================
                        RECENT TRANSACTIONS
                    ================================================== */}

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                        {/* Recent Sales */}

                        <Card
                            title="💰 Recent Sales"
                            className="h-full"
                        >

                            <Table
                                headers={[
                                    'Product',
                                    'Quantity',
                                    'Selling Price',
                                    'Total',
                                ]}
                            >

                                {recentSales.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="px-4 py-8 text-center text-sm"
                                        >
                                            No sales found.
                                        </td>

                                    </tr>

                                ) : (

                                    recentSales.map((sale) => (

                                        <tr
                                            key={sale.id}
                                            className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                        >

                                            {/* Product */}

                                            <td className="px-4 py-3 text-sm font-medium">
                                                {sale.product?.name ??
                                                    'Unknown Product'}
                                            </td>


                                            {/* Quantity */}

                                            <td className="px-4 py-3 text-sm">
                                                {sale.quantity}
                                            </td>


                                            {/* Selling Price */}

                                            <td className="px-4 py-3 text-sm">
                                                ₱{Number(
                                                    sale.selling_price
                                                ).toFixed(2)}
                                            </td>


                                            {/* Total */}

                                            <td className="px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">
                                                ₱{Number(
                                                    sale.line_total
                                                ).toFixed(2)}
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </Table>

                        </Card>


                        {/* Recent Purchases */}

                        <Card
                            title="🧾 Recent Purchases"
                            className="h-full"
                        >

                            <Table
                                headers={[
                                    'Product',
                                    'Supplier',
                                    'Quantity',
                                    'Cost Price',
                                ]}
                            >

                                {recentPurchases.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="px-4 py-8 text-center text-sm"
                                        >
                                            No purchases found.
                                        </td>

                                    </tr>

                                ) : (

                                    recentPurchases.map((purchase) => (

                                        <tr
                                            key={purchase.id}
                                            className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                        >

                                            {/* Product */}

                                            <td className="px-4 py-3 text-sm font-medium">
                                                {purchase.product?.name ??
                                                    'Unknown Product'}
                                            </td>


                                            {/* Supplier */}

                                            <td className="px-4 py-3 text-sm">
                                                {purchase.supplier
                                                    ?.supplier_name ??
                                                    'Unknown Supplier'}
                                            </td>


                                            {/* Quantity */}

                                            <td className="px-4 py-3 text-sm">
                                                {purchase.quantity}
                                            </td>


                                            {/* Cost Price */}

                                            <td className="px-4 py-3 text-sm font-bold text-[#102a56] dark:text-blue-300">
                                                ₱{Number(
                                                    purchase.cost_price
                                                ).toFixed(2)}
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </Table>

                        </Card>

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}