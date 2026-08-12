import { router } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Table from '@/Components/BizzSoft/Table';

export default function PurchaseTable({ purchases = [] }) {

    const deletePurchase = (id) => {

        if (!confirm(
            'Are you sure you want to delete this purchase? This will automatically reverse the product stock!'
        )) {
            return;
        }

        router.delete(route('purchases.destroy', id), {
            preserveScroll: true,
        });

    };

    return (
        <Card
            title="📋 Purchase Ledger / History"
            className="mb-4"
        >

            <Table
                headers={[
                    'Transaction ID',
                    'Product Name',
                    'Supplier / Vendor',
                    'Quantity',
                    'Cost Price',
                    'Total Cost',
                    'Action',
                ]}
            >

                {purchases.length === 0 ? (

                    <tr>
                        <td
                            colSpan="7"
                            className="px-4 py-8 text-center text-sm"
                        >
                            No purchase transactions recorded.
                        </td>
                    </tr>

                ) : (

                    purchases.map((purchase) => {

                        const totalCost =
                            Number(purchase.quantity) *
                            Number(purchase.cost_price);

                        return (

                            <tr
                                key={purchase.id}
                                className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                            >

                                {/* Transaction ID */}

                                <td className="w-[11%] whitespace-nowrap px-4 py-3 text-sm font-bold text-[#102a56] dark:text-blue-300">
                                    #PUR-{purchase.id}
                                </td>


                                {/* Product */}

                                <td className="w-[18%] px-4 py-3 text-sm font-medium">
                                    {purchase.product?.name ?? (
                                        <span className="italic text-red-500">
                                            Deleted Product
                                        </span>
                                    )}
                                </td>


                                {/* Supplier */}

                                <td className="w-[18%] px-4 py-3 text-sm">
                                    {purchase.supplier?.supplier_name ?? (
                                        <span className="italic text-red-500">
                                            Unknown Supplier
                                        </span>
                                    )}
                                </td>


                                {/* Quantity */}

                                <td className="w-[12%] whitespace-nowrap px-4 py-3 text-center text-sm">
                                    {purchase.quantity} units
                                </td>


                                {/* Cost Price */}

                                <td className="w-[13%] whitespace-nowrap px-4 py-3 text-sm">
                                    ₱{Number(
                                        purchase.cost_price
                                    ).toFixed(2)}
                                </td>


                                {/* Total Cost */}

                                <td className="w-[13%] whitespace-nowrap px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">
                                    ₱{totalCost.toFixed(2)}
                                </td>


                                {/* Action */}

                                <td className="w-[15%] whitespace-nowrap px-4 py-3 text-right">

                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            deletePurchase(
                                                purchase.id
                                            )
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