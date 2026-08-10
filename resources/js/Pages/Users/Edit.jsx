import UserForm from './Components/UserForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ user, roles }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56]">
                        Edit User
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Update user information and role.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <UserForm
                        user={user}
                        roles={roles}
                    />

                </div>

            </div>

        </AuthenticatedLayout>
    );
}