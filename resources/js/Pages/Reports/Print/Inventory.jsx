import PrintLayout from '@/Layouts/PrintLayout';

export default function Inventory({
    products,
    totalProducts,
    totalStock,
    lowStockProducts,
    outOfStockProducts,
    filters,
}) {
    return (
        <PrintLayout
            title="Inventory Report"
            reportHeading="Inventory Report"
        >

            {/* Search Filter */}

            {filters?.search && (
                <p className="mb-4">
                    <strong>Search:</strong> {filters.search}
                </p>
            )}


            {/* Category Filter */}

            {filters?.category && (
                <p className="mb-4">
                    <strong>Category:</strong> {filters.category}
                </p>
            )}


            {/* Summary */}

            <table className="summary-table mb-6 w-1/2 border-collapse border border-gray-300">

                <tbody>

                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Total Products
                        </th>

                        <td className="border border-gray-300 p-2">
                            {totalProducts}
                        </td>
                    </tr>


                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Total Stock
                        </th>

                        <td className="border border-gray-300 p-2">
                            {totalStock}
                        </td>
                    </tr>


                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Low Stock Products
                        </th>

                        <td className="border border-gray-300 p-2">
                            {lowStockProducts}
                        </td>
                    </tr>


                    <tr>
                        <th className="border border-gray-300 p-2 text-left">
                            Out of Stock Products
                        </th>

                        <td className="border border-gray-300 p-2">
                            {outOfStockProducts}
                        </td>
                    </tr>

                </tbody>

            </table>


            {/* Inventory Table */}

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
                            Price
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Stock
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                            Reorder Level
                        </th>

                        <th className="border border-gray-300 p-2">
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {products?.length > 0 ? (

                        products.map((product, index) => {

                            let status = 'In Stock';

                            if (product.stock === 0) {
                                status = 'Out of Stock';
                            } else if (
                                product.stock <= product.reorder_level
                            ) {
                                status = 'Low Stock';
                            }

                            return (
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
                                        ₱{Number(product.price).toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>

                                    <td className="border border-gray-300 p-2 text-right">
                                        {product.stock}
                                    </td>

                                    <td className="border border-gray-300 p-2 text-right">
                                        {product.reorder_level}
                                    </td>

                                    <td className="border border-gray-300 p-2">
                                        {status}
                                    </td>

                                </tr>
                            );
                        })

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="border border-gray-300 p-4 text-center"
                            >
                                No products found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>


            <small className="mt-4 block text-gray-500">
                End of Inventory Report
            </small>

        </PrintLayout>
    );
}