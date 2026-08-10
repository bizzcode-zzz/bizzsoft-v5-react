import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SupplierForm from './Components/SupplierForm';

export default function Edit({ supplier }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-slate-700 leading-tight">
                    Edit Supplier
                </h2>
            }
        >

            <div className="py-6">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Page Intro */}

                    <div className="mb-6">

                        <h1 className="text-2xl font-bold text-[#102a56]">
                            ✏️ Edit Supplier
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Update supplier or vendor information.
                        </p>

                    </div>


                    {/* Supplier Form */}

                    <SupplierForm
                        supplier={supplier}
                    />

                </div>

            </div>

        </AuthenticatedLayout>
    );
}