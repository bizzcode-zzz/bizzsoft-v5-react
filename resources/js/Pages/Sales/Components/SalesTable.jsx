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
                            className="px-4 py-6 text-center text-sm text-[#8b949e]"
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
                                className="border-t border-[#30363d]"
                            >

                                <td className="px-4 py-3 text-sm font-bold text-[#f0f6fc]">
                                    #SALE-{sale.id}
                                </td>

                                <td className="px-4 py-3 text-sm text-[#f0f6fc]">
                                    {sale.product?.name ?? (
                                        <span className="italic text-[#f85149]">
                                            Deleted Product
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3 text-sm text-[#f0f6fc]">
                                    {sale.quantity} units
                                </td>

                                <td className="px-4 py-3 text-sm text-[#f0f6fc]">
                                    ₱{Number(
                                        sale.selling_price
                                    ).toFixed(2)}
                                </td>

                                <td className="px-4 py-3 text-sm font-bold text-[#3fb950]">
                                    ₱{Number(
                                        sale.line_total ?? lineTotal
                                    ).toFixed(2)}
                                </td>

                                <td className="px-4 py-3 text-sm text-[#f0f6fc]">
                                    {sale.sale_date}
                                </td>

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