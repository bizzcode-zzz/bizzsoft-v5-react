import { useForm, Link } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Table from '@/Components/BizzSoft/Table';

export default function Index({
    activityLogs,
    filters,
}) {
    const { data, setData, get } = useForm({
        search: filters?.search || '',
        module: filters?.module || '',
        action: filters?.action || '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('activity-logs.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56]">
                        Activity Logs
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        View and monitor system activity across all modules.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        FILTERS
                    ================================================== */}

                    <Card
                        title="🔍 Filter Activity Logs"
                        className="mb-6"
                    >

                        <form onSubmit={submit}>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                {/* Search */}

                                <Input
                                    label="Search"
                                    type="text"
                                    placeholder="Search activity logs..."
                                    value={data.search}
                                    onChange={(e) =>
                                        setData(
                                            'search',
                                            e.target.value
                                        )
                                    }
                                />


                                {/* Module */}

                                <div>

                                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                                        Module
                                    </label>

                                    <select
                                        className="
                                            block
                                            w-full
                                            rounded-md
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            py-2
                                            text-sm
                                            text-slate-700
                                            shadow-sm
                                            focus:border-[#102a56]
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-[#102a56]
                                        "
                                        value={data.module}
                                        onChange={(e) =>
                                            setData(
                                                'module',
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            All Modules
                                        </option>

                                        <option value="Product">
                                            Product
                                        </option>

                                        <option value="Category">
                                            Category
                                        </option>

                                        <option value="Supplier">
                                            Supplier
                                        </option>

                                        <option value="Purchase">
                                            Purchase
                                        </option>

                                        <option value="Sales">
                                            Sales
                                        </option>

                                        <option value="User">
                                            User
                                        </option>

                                    </select>

                                </div>


                                {/* Action */}

                                <div>

                                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                                        Action
                                    </label>

                                    <select
                                        className="
                                            block
                                            w-full
                                            rounded-md
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            py-2
                                            text-sm
                                            text-slate-700
                                            shadow-sm
                                            focus:border-[#102a56]
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-[#102a56]
                                        "
                                        value={data.action}
                                        onChange={(e) =>
                                            setData(
                                                'action',
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            All Actions
                                        </option>

                                        <option value="Created">
                                            Created
                                        </option>

                                        <option value="Updated">
                                            Updated
                                        </option>

                                        <option value="Deleted">
                                            Deleted
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="mt-4 flex flex-wrap gap-2">

                                <Button type="submit">
                                    🔍 Search
                                </Button>

                                <Button
                                    href={route(
                                        'activity-logs.index'
                                    )}
                                    variant="secondary"
                                >
                                    Reset
                                </Button>

                            </div>

                        </form>

                    </Card>


                    {/* =================================================
                        SUMMARY
                    ================================================== */}

                    <div className="mb-6">

                        <Card title="📊 Total Activity Logs">

                            <h3 className="text-2xl font-bold text-[#102a56]">
                                {activityLogs?.total ?? 0}
                            </h3>

                        </Card>

                    </div>


                    {/* =================================================
                        ACTIVITY TABLE
                    ================================================== */}

                    <Card
                        title="📋 System Activity"
                        className="mb-4"
                    >

                        <Table
                            headers={[
                                'Date & Time',
                                'User',
                                'Module',
                                'Action',
                                'Description',
                            ]}
                        >

                            {activityLogs?.data?.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-4 py-8 text-center text-sm text-slate-500"
                                    >
                                        No activity logs found.
                                    </td>

                                </tr>

                            ) : (

                                activityLogs?.data?.map(
                                    (activityLog) => (

                                        <tr
                                            key={activityLog.id}
                                            className="border-t border-slate-100 transition hover:bg-blue-50/50"
                                        >

                                            {/* Date & Time */}

                                            <td className="w-[17%] whitespace-nowrap px-4 py-3 text-sm text-slate-600">

                                                {new Date(
                                                    activityLog.created_at
                                                ).toLocaleString(
                                                    'en-PH',
                                                    {
                                                        month: 'short',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                        timeZone:
                                                            'Asia/Manila',
                                                    }
                                                )}

                                            </td>


                                            {/* User */}

                                            <td className="w-[15%] px-4 py-3 text-sm font-medium text-slate-700">
                                                {activityLog.user?.name ??
                                                    'System'}
                                            </td>


                                            {/* Module */}

                                            <td className="w-[13%] px-4 py-3 text-sm font-semibold text-[#102a56]">
                                                {activityLog.module}
                                            </td>


                                            {/* Action */}

                                            <td className="w-[12%] px-4 py-3 text-sm font-bold">

                                                {activityLog.action ===
                                                'Created' ? (

                                                    <span className="text-green-600">
                                                        {
                                                            activityLog.action
                                                        }
                                                    </span>

                                                ) : activityLog.action ===
                                                  'Updated' ? (

                                                    <span className="text-amber-600">
                                                        {
                                                            activityLog.action
                                                        }
                                                    </span>

                                                ) : activityLog.action ===
                                                  'Deleted' ? (

                                                    <span className="text-red-600">
                                                        {
                                                            activityLog.action
                                                        }
                                                    </span>

                                                ) : (

                                                    <span className="text-slate-500">
                                                        {
                                                            activityLog.action
                                                        }
                                                    </span>

                                                )}

                                            </td>


                                            {/* Description */}

                                            <td className="w-[43%] whitespace-pre-line px-4 py-3 text-sm text-slate-600">
                                                {
                                                    activityLog.description
                                                }
                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </Table>


                        {/* =================================================
                            PAGINATION
                        ================================================== */}

                        {activityLogs?.links &&
                            activityLogs.links.length > 3 && (

                                <div className="mt-5 flex flex-wrap justify-center gap-1">

                                    {activityLogs.links.map(
                                        (link, index) => (

                                            <Link
                                                key={index}
                                                href={
                                                    link.url ||
                                                    '#'
                                                }
                                                preserveScroll
                                                className={`
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    border
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    font-semibold
                                                    transition
                                                    ${
                                                        link.active
                                                            ? 'border-[#102a56] bg-[#102a56] text-white'
                                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-[#102a56]'
                                                    }
                                                    ${
                                                        !link.url
                                                            ? 'cursor-not-allowed opacity-50'
                                                            : ''
                                                    }
                                                `}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />

                                        )
                                    )}

                                </div>

                            )}

                    </Card>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}