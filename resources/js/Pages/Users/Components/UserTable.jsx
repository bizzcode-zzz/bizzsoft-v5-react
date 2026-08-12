import { router } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Table from '@/Components/BizzSoft/Table';

export default function UserTable({ users = [] }) {

    const toggleStatus = (id, currentStatus) => {
        const action = currentStatus
            ? 'deactivate'
            : 'activate';

        if (!confirm(
            `Are you sure you want to ${action} this user?`
        )) {
            return;
        }

        router.patch(
            route('users.toggle-status', id),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <Card
            title="👥 User List"
            className="mb-4"
        >

            <Table
                headers={[
                    'Name',
                    'Email',
                    'Role',
                    'Status',
                    'Action',
                ]}
            >

                {users.length === 0 ? (

                    <tr>
                        <td
                            colSpan="5"
                            className="px-4 py-8 text-center text-sm"
                        >
                            No users found.
                        </td>
                    </tr>

                ) : (

                    users.map((user) => (

                        <tr
                            key={user.id}
                            className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                        >

                            {/* Name */}

                            <td className="w-[18%] px-4 py-3 text-sm font-semibold">
                                {user.name}
                            </td>


                            {/* Email */}

                            <td className="w-[22%] px-4 py-3 text-sm">
                                {user.email}
                            </td>


                            {/* Role */}

                            <td className="w-[12%] px-4 py-3 text-sm font-medium">
                                {user.role?.name ?? 'No Role'}
                            </td>


                            {/* Status */}

                            <td className="w-[12%] px-4 py-3">

                                {user.status ? (

                                    <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:border-green-800 dark:bg-green-900/40 dark:text-green-300">
                                        Active
                                    </span>

                                ) : (

                                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                        Inactive
                                    </span>

                                )}

                            </td>


                            {/* Actions */}

                            <td className="w-[36%] whitespace-nowrap px-4 py-3 text-right">

                                {/* Edit */}

                                <Button
                                    href={route(
                                        'users.edit',
                                        user.id
                                    )}
                                    variant="secondary"
                                    className="mr-2"
                                >
                                    ✏️ Edit
                                </Button>


                                {/* Reset Password */}

                                <Button
                                    href={route(
                                        'users.reset-password',
                                        user.id
                                    )}
                                    variant="secondary"
                                    className="mr-2"
                                >
                                    🔐 Reset Password
                                </Button>


                                {/* Activate / Deactivate */}

                                <Button
                                    type="button"
                                    variant={
                                        user.status
                                            ? 'danger'
                                            : 'secondary'
                                    }
                                    onClick={() =>
                                        toggleStatus(
                                            user.id,
                                            user.status
                                        )
                                    }
                                >
                                    {user.status
                                        ? '🚫 Deactivate'
                                        : '✅ Activate'}
                                </Button>

                            </td>

                        </tr>

                    ))

                )}

            </Table>

        </Card>
    );
}