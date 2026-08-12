import UserForm from './Components/UserForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ roles }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56] dark:text-blue-300">
                        Create User
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                        Create a new system user and assign a role.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <UserForm
                        roles={roles}
                    />

                </div>

            </div>

        </AuthenticatedLayout>
    );
}