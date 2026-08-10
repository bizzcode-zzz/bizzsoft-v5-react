import CategoryForm from './Components/CategoryForm';
import CategorySearchBar from './Components/CategorySearchBar';
import CategoryTable from './Components/CategoryTable';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ categories, filters }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56]">
                        Categories
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your product categories.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8">

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
                        CATEGORY FORM
                    ================================================== */}

                    <CategoryForm />


                    {/* =================================================
                        SEARCH
                    ================================================== */}

                    <CategorySearchBar
                        filters={filters}
                    />


                    {/* =================================================
                        CATEGORY TABLE
                    ================================================== */}

                    <CategoryTable
                        categories={categories}
                    />

                </div>

            </div>

        </AuthenticatedLayout>
    );
}