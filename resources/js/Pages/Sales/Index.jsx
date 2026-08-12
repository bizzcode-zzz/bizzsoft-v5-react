import SalesForm from './Components/SalesForm';
import SalesSearchBar from './Components/SalesSearchBar';
import SalesTable from './Components/SalesTable';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({
    salesRecords,
    products,
    filters,
}) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56] dark:text-blue-300">
                        Sales
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                        Manage sales transactions and inventory movement.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        SUCCESS MESSAGE
                    ================================================== */}

                    {flash.success && (
                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-sm">
                            ✓ {flash.success}
                        </div>
                    )}


                    {/* =================================================
                        SALES FORM
                    ================================================== */}

                    <SalesForm
                        products={products}
                    />


                    {/* =================================================
                        SEARCH
                    ================================================== */}

                    <SalesSearchBar
                        filters={filters}
                    />


                    {/* =================================================
                        SALES TABLE
                    ================================================== */}

                    <SalesTable
                        salesRecords={salesRecords}
                    />

                </div>

            </div>

        </AuthenticatedLayout>
    );
}