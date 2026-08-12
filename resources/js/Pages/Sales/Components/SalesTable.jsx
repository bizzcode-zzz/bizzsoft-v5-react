import { router } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Table from '@/Components/BizzSoft/Table';

export default function SalesTable({ salesRecords = [] }) {
    const deleteSale = (id) => {
        if (!confirm(
            'Are you sure you want to delete this sale? This will automatically return the sold quantity to product stock!'
        )) {
            return;
        }

        router.delete(route('sales.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <Card
            title="📋 Sales Ledger / History"
            className="mb-4"
        >
            <Table
                headers={[
                    'Transaction ID',
                    'Product Name',
                    'Quantity',
                    'Selling Price',
                    'Line Total',
                    'Sale Date',
                    'Action',
                ]}
            >
                {salesRecords.length === 0 ? (

                    <tr>
                        <td
                            colSpan="7"
                            className="px-4 py-6 text-center text-sm"
                        >
                            No sales transactions recorded.
                        </td>
                    </tr>

                ) : (

                    salesRecords.map((sale) => {
                        const lineTotal =
                            Number(sale.quantity) *
                            Number(sale.selling_price);

                        return (
                            <tr
                                key={sale.id}
                                className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                            >

                                {/* Transaction ID */}

                                <td className="px-4 py-3 text-sm font-bold text-[#102a56] dark:text-blue-300">
                                    #SALE-{sale.id}
                                </td>


                                {/* Product */}

                                <td className="px-4 py-3 text-sm">
                                    {sale.product?.name ?? (
                                        <span className="italic text-red-500 dark:text-red-400">
                                            Deleted Product
                                        </span>
                                    )}
                                </td>


                                {/* Quantity */}

                                <td className="px-4 py-3 text-sm">
                                    {sale.quantity} units
                                </td>


                                {/* Selling Price */}

                                <td className="px-4 py-3 text-sm">
                                    ₱{Number(
                                        sale.selling_price
                                    ).toFixed(2)}
                                </td>


                                {/* Line Total */}

                                <td className="px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">
                                    ₱{Number(
                                        sale.line_total ?? lineTotal
                                    ).toFixed(2)}
                                </td>


                                {/* Sale Date */}

                                <td className="px-4 py-3 text-sm">
                                    {sale.sale_date}
                                </td>


                                {/* Action */}

                                <td className="px-4 py-3">

                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            deleteSale(sale.id)
                                        }
                                    >
                                        🗑️ Void / Delete
                                    </Button>

                                </td>

                            </tr>
                        );
                    })

                )}
            </Table>
        </Card>
    );
}