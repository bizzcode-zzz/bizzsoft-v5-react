import UserForm from './Components/UserForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ roles }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create User
                </h2>
            }
        >
            <div>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#f0f6fc]">
                        👤 Create User
                    </h1>

                    <p className="mt-1 text-sm text-[#8b949e]">
                        Create a new system user and assign a role.
                    </p>
                </div>

                <UserForm roles={roles} />

            </div>
        </AuthenticatedLayout>
    );
}