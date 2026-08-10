import { router } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Table from '@/Components/BizzSoft/Table';

export default function SupplierTable({ suppliers }) {

    const deleteSupplier = (id) => {

        if (!confirm('Are you sure you want to delete this supplier?')) {
            return;
        }

        router.delete(route('suppliers.destroy', id), {
            preserveScroll: true,
        });

    };

    return (
        <Card
            title="📋 Supplier List"
            className="mb-4"
        >

            <Table
                headers={[
                    'Supplier Name',
                    'Contact Person',
                    'Phone Number',
                    'Email',
                    'Address',
                    'Action',
                ]}
            >

                {suppliers.length === 0 ? (

                    <tr>
                        <td
                            colSpan="6"
                            className="px-4 py-8 text-center text-sm text-slate-500"
                        >
                            No suppliers found.
                        </td>
                    </tr>

                ) : (

                    suppliers.map((supplier) => (

                        <tr
                            key={supplier.id}
                            className="border-t border-slate-100 transition hover:bg-blue-50/50"
                        >

                            {/* Supplier Name */}

                            <td className="w-[18%] px-4 py-3 text-sm font-medium text-slate-700">
                                {supplier.supplier_name}
                            </td>


                            {/* Contact Person */}

                            <td className="w-[17%] px-4 py-3 text-sm text-slate-600">
                                {supplier.contact_person || (
                                    <span className="italic text-slate-400">
                                        N/A
                                    </span>
                                )}
                            </td>


                            {/* Phone */}

                            <td className="w-[14%] whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                                {supplier.phone_number || (
                                    <span className="italic text-slate-400">
                                        N/A
                                    </span>
                                )}
                            </td>


                            {/* Email */}

                            <td className="w-[18%] px-4 py-3 text-sm text-slate-600">
                                {supplier.email || (
                                    <span className="italic text-slate-400">
                                        N/A
                                    </span>
                                )}
                            </td>


                            {/* Address */}

                            <td className="w-[17%] px-4 py-3 text-sm text-slate-600">
                                {supplier.address || (
                                    <span className="italic text-slate-400">
                                        No address
                                    </span>
                                )}
                            </td>


                            {/* Action */}

                            <td className="w-[16%] whitespace-nowrap px-4 py-3 text-right">

                                <Button
                                    href={route(
                                        'suppliers.edit',
                                        supplier.id
                                    )}
                                    variant="secondary"
                                    className="mr-2"
                                >
                                    ✏️ Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        deleteSupplier(supplier.id)
                                    }
                                >
                                    🗑️ Delete
                                </Button>

                            </td>

                        </tr>

                    ))

                )}

            </Table>

        </Card>
    );
}