import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CategoryForm from './Components/CategoryForm';

export default function Edit({ category }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-slate-700 leading-tight">
                    Edit Category
                </h2>
            }
        >

            <div className="py-6">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Page Intro */}

                    <div className="mb-6">

                        <h1 className="text-2xl font-bold text-[#102a56]">
                            ✏️ Edit Category
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Update category information.
                        </p>

                    </div>


                    {/* Category Form */}

                    <CategoryForm
                        category={category}
                    />

                </div>

            </div>

        </AuthenticatedLayout>
    );
}