import PrintLayout from '@/Layouts/PrintLayout';

export default function LowStock({
    lowStockProducts,
    totalLowStockProducts,
    totalLowStockQuantity,
}) {
    return (
        <PrintLayout
            title="Low Stock Report"
            reportHeading="Low Stock Report"
        >

            {/* Summary */}

            <table className="summary-table mb-6 w-1/2 border-collapse border border-gray-300">

                <tbody>

                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Total Low Stock Products
                        </th>

                        <td className="border border-gray-300 p-2">
                            {totalLowStockProducts}
                        </td>
                    </tr>

                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Total Low Stock Quantity
                        </th>

                        <td className="border border-gray-300 p-2">
                            {totalLowStockQuantity}
                        </td>
                    </tr>

                </tbody>

            </table>


            {/* Low Stock Products */}

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
                            Category
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Stock
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Reorder Level
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {lowStockProducts?.length > 0 ? (

                        lowStockProducts.map((product, index) => (

                            <tr key={product.id}>

                                <td className="border border-gray-300 p-2">
                                    {index + 1}
                                </td>

                                <td className="border border-gray-300 p-2">
                                    {product.name}
                                </td>

                                <td className="border border-gray-300 p-2">
                                    {product.category?.category_name}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {product.stock}
                                </td>

                                <td className="border border-gray-300 p-2 text-right">
                                    {product.reorder_level}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="border border-gray-300 p-4 text-center"
                            >
                                No low stock products found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>


            <small className="mt-4 block text-gray-500">
                End of Low Stock Report
            </small>

        </PrintLayout>
    );
}