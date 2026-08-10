import PrintLayout from '@/Layouts/PrintLayout';

export default function Purchases({
    purchases,
    totalPurchaseCost,
    totalQuantityPurchased,
    totalTransactions,
    filters,
}) {
    return (
        <PrintLayout
            title="Purchase Report"
            reportHeading="Purchase Report"
        >

            {/* Period */}

            {filters?.from && filters?.to && (
                <p className="mb-4">
                    <strong>Period:</strong>{' '}
                    {new Date(filters.from).toLocaleDateString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                    })}
                    {' - '}
                    {new Date(filters.to).toLocaleDateString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                    })}
                </p>
            )}


            {/* Summary */}

            <table className="summary-table mb-6 w-1/2 border-collapse border border-gray-300">

                <tbody>

                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Total Purchase Cost
                        </th>

                        <td className="border border-gray-300 p-2">
                            ₱{Number(totalPurchaseCost).toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </td>
                    </tr>


                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Quantity Purchased
                        </th>

                        <td className="border border-gray-300 p-2">
                            {totalQuantityPurchased}
                        </td>
                    </tr>


                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Total Transactions
                        </th>

                        <td className="border border-gray-300 p-2">
                            {totalTransactions}
                        </td>
                    </tr>

                </tbody>

            </table>


            {/* Purchases Table */}

            <table className="w-full border-collapse border border-gray-300">

                <thead>

                    <tr className="bg-gray-800 text-white">

                        <th className="border border-gray-300 p-2">
                            #
                        </th>

                        <th className="border border-gray-300 p-2 text-left">
                            Product
                        </th>

                        <th className="border border-gray-300 p-2 text-left">
                            Supplier
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Quantity
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Cost Price
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Total Cost
                        </th>

                        <th className="border border-gray-300 p-2">
                            Date
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {purchases?.length > 0 ? (

                        purchases.map((purchase, index) => (

                            <tr key={purchase.id}>

                                <td className="border border-gray-300 p-2">
                                    {index + 1}
                                </td>

                                <td className="border border-gray-300 p-2">
                                    {purchase.product?.name}
                                </td>

                                <td className="border border-gray-300 p-2">
                                    {purchase.supplier?.supplier_name}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {purchase.quantity}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    ₱{Number(purchase.cost_price).toLocaleString('en-PH', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    ₱{(
                                        Number(purchase.quantity) *
                                        Number(purchase.cost_price)
                                    ).toLocaleString('en-PH', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>

                                <td className="border border-gray-300 p-2">
                                    {new Date(purchase.created_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric',
                                    })}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="border border-gray-300 p-4 text-center"
                            >
                                No purchases found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>


            <small className="mt-4 block text-gray-500">
                End of Purchase Report
            </small>

        </PrintLayout>
    );
}