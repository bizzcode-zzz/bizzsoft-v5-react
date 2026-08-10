import PrintLayout from '@/Layouts/PrintLayout';

export default function Sales({
    sales,
    totalSales,
    totalQuantity,
    totalTransactions,
    filters,
}) {
    return (
        <PrintLayout
            title="Sales Report"
            reportHeading="Sales Report"
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
                            Total Sales
                        </th>

                        <td className="border border-gray-300 p-2">
                            ₱{Number(totalSales).toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </td>
                    </tr>


                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Quantity Sold
                        </th>

                        <td className="border border-gray-300 p-2">
                            {totalQuantity}
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


            {/* Sales Table */}

            <table className="w-full border-collapse border border-gray-300">

                <thead>

                    <tr className="bg-gray-800 text-white">

                        <th className="border border-gray-300 p-2">
                            #
                        </th>

                        <th className="border border-gray-300 p-2 text-left">
                            Product
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Quantity
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Selling Price
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Line Total
                        </th>

                        <th className="border border-gray-300 p-2">
                            Date
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {sales?.length > 0 ? (

                        sales.map((sale, index) => (

                            <tr key={sale.id}>

                                <td className="border border-gray-300 p-2">
                                    {index + 1}
                                </td>

                                <td className="border border-gray-300 p-2">
                                    {sale.product?.name}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {sale.quantity}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    ₱{Number(sale.selling_price).toLocaleString('en-PH', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    ₱{Number(sale.line_total).toLocaleString('en-PH', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>

                                <td className="border border-gray-300 p-2">
                                    {new Date(sale.created_at).toLocaleDateString('en-US', {
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
                                colSpan="6"
                                className="border border-gray-300 p-4 text-center"
                            >
                                No sales found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>


            <small className="mt-4 block text-gray-500">
                End of Sales Report
            </small>

        </PrintLayout>
    );
}