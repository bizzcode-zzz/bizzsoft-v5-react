import { usePage } from '@inertiajs/react';
import UserSearchBar from './Components/UserSearchBar';
import UserTable from './Components/UserTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/BizzSoft/Button';

export default function Index({ users, filters }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56]">
                        Users
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage system users, roles, and account status.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        PAGE ACTIONS
                    ================================================== */}

                    <div className="mb-6 flex items-center justify-end">

                        <Button
                            href={route('users.create')}
                        >
                            ➕ Create User
                        </Button>

                    </div>


                    {/* =================================================
                        SUCCESS MESSAGE
                    ================================================== */}

                    {flash.success && (
                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-sm">
                            ✓ {flash.success}
                        </div>
                    )}


                    {/* =================================================
                        SEARCH
                    ================================================== */}

                    <UserSearchBar
                        filters={filters}
                    />


                    {/* =================================================
                        USER TABLE
                    ================================================== */}

                    <UserTable
                        users={users}
                    />

                </div>

            </div>

        </AuthenticatedLayout>
    );
}