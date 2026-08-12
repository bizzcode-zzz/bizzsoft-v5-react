import { useForm, Link } from '@inertiajs/react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import InventoryPdf from './Pdf/Inventory';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Table from '@/Components/BizzSoft/Table';

export default function Inventory({
    products,
    allProducts,
    totalProducts,
    totalStock,
    lowStockProducts,
    outOfStockProducts,
    categories,
    filters,
}) {
    const { data, setData, get } = useForm({
        search: filters?.search || '',
        category: filters?.category || '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('reports.inventory'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56] dark:text-blue-300">
                        Inventory Report
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                        View current inventory, stock levels, and product status.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        FILTERS
                    ================================================== */}

                    <Card
                        title="🔍 Filter Inventory"
                        className="mb-6"
                    >

                        <form onSubmit={submit}>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                {/* Search */}

                                <Input
                                    label="Search Product"
                                    type="text"
                                    placeholder="Search product..."
                                    value={data.search}
                                    onChange={(e) =>
                                        setData(
                                            'search',
                                            e.target.value
                                        )
                                    }
                                />


                                {/* Category */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Category
                                    </label>

                                    <select
                                        className="
                                            block
                                            w-full
                                            rounded-md
                                            border
                                            border-gray-300
                                            bg-white
                                            px-3
                                            py-2
                                            text-sm
                                            text-gray-900
                                            shadow-sm
                                            outline-none
                                            transition
                                            focus:border-green-600
                                            focus:ring-2
                                            focus:ring-green-600
                                            dark:border-gray-600
                                            dark:bg-gray-800
                                            dark:text-white
                                            dark:focus:border-green-500
                                            dark:focus:ring-green-500
                                        "
                                        value={data.category}
                                        onChange={(e) =>
                                            setData(
                                                'category',
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            All Categories
                                        </option>

                                        {categories.map((category) => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.category_name}
                                            </option>

                                        ))}

                                    </select>

                                </div>


                                {/* Actions */}

                                <div className="flex flex-wrap items-end gap-2">

                                    <Button type="submit">
                                        🔍 Filter
                                    </Button>


                                    <Button
                                        href={route(
                                            'reports.inventory'
                                        )}
                                        variant="secondary"
                                    >
                                        Reset
                                    </Button>


                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => {

                                            const params =
                                                new URLSearchParams();

                                            if (data.search) {
                                                params.append(
                                                    'search',
                                                    data.search
                                                );
                                            }

                                            if (data.category) {
                                                params.append(
                                                    'category',
                                                    data.category
                                                );
                                            }

                                            window.open(
                                                `${route(
                                                    'reports.inventory.print'
                                                )}?${params.toString()}`,
                                                '_blank'
                                            );
                                        }}
                                    >
                                        🖨️ Print
                                    </Button>


                                    {/* PDF */}

                                    <PDFDownloadLink
                                        document={
                                            <InventoryPdf
                                                products={
                                                    allProducts || []
                                                }
                                                totalProducts={
                                                    totalProducts
                                                }
                                                totalStock={
                                                    totalStock
                                                }
                                                lowStockProducts={
                                                    lowStockProducts
                                                }
                                                outOfStockProducts={
                                                    outOfStockProducts
                                                }
                                                generatedBy="Admin"
                                            />
                                        }
                                        fileName="inventory-report.pdf"
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            rounded-md
                                            border
                                            border-transparent
                                            bg-[#102a56]
                                            px-4
                                            py-2
                                            text-sm
                                            font-semibold
                                            text-white
                                            transition
                                            duration-150
                                            ease-in-out
                                            hover:bg-[#173b73]
                                            dark:bg-blue-700
                                            dark:hover:bg-blue-600
                                        "
                                    >
                                        {({ loading }) =>
                                            loading
                                                ? 'Generating PDF...'
                                                : '📄 PDF'
                                        }
                                    </PDFDownloadLink>

                                </div>

                            </div>

                        </form>

                    </Card>


                    {/* =================================================
                        SUMMARY
                    ================================================== */}

                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <Card title="📦 Total Products">

                            <h3 className="text-2xl font-bold text-[#102a56] dark:text-blue-300">
                                {totalProducts}
                            </h3>

                        </Card>


                        <Card title="📊 Total Stock">

                            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {totalStock}
                            </h3>

                        </Card>


                        <Card title="⚠️ Low Stock">

                            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                {lowStockProducts}
                            </h3>

                        </Card>


                        <Card title="🚨 Out of Stock">

                            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {outOfStockProducts}
                            </h3>

                        </Card>

                    </div>


                    {/* =================================================
                        INVENTORY TABLE
                    ================================================== */}

                    <Card
                        title="📋 Inventory Stock List"
                        className="mb-4"
                    >

                        <Table
                            headers={[
                                'Product',
                                'Category',
                                'Price',
                                'Stock',
                                'Reorder Level',
                                'Status',
                            ]}
                        >

                            {products.data?.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-4 py-8 text-center text-sm"
                                    >
                                        No products found.
                                    </td>

                                </tr>

                            ) : (

                                products.data?.map((product) => {

                                    let status = 'In Stock';
                                    let statusClass =
                                        'text-green-600 dark:text-green-400';

                                    if (product.stock === 0) {

                                        status = 'Out of Stock';
                                        statusClass =
                                            'text-red-600 dark:text-red-400';

                                    } else if (
                                        product.stock <=
                                        product.reorder_level
                                    ) {

                                        status = 'Low Stock';
                                        statusClass =
                                            'text-amber-600 dark:text-amber-400';

                                    }

                                    return (

                                        <tr
                                            key={product.id}
                                            className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                        >

                                            {/* Product */}

                                            <td className="w-[22%] px-4 py-3 text-sm font-semibold text-[#102a56] dark:text-blue-300">
                                                {product.name}
                                            </td>


                                            {/* Category */}

                                            <td className="w-[20%] px-4 py-3 text-sm">
                                                {product.category?.category_name ??
                                                    'Uncategorized'}
                                            </td>


                                            {/* Price */}

                                            <td className="w-[15%] whitespace-nowrap px-4 py-3 text-sm">
                                                ₱{Number(
                                                    product.price
                                                ).toFixed(2)}
                                            </td>


                                            {/* Stock */}

                                            <td className="w-[13%] whitespace-nowrap px-4 py-3 text-sm font-bold">
                                                {product.stock}
                                            </td>


                                            {/* Reorder Level */}

                                            <td className="w-[15%] whitespace-nowrap px-4 py-3 text-sm">
                                                {product.reorder_level}
                                            </td>


                                            {/* Status */}

                                            <td
                                                className={`w-[15%] whitespace-nowrap px-4 py-3 text-sm font-bold ${statusClass}`}
                                            >
                                                {status}
                                            </td>

                                        </tr>

                                    );

                                })

                            )}

                        </Table>


                        {/* =================================================
                            PAGINATION
                        ================================================== */}

                        {products.links &&
                            products.links.length > 3 && (

                                <div className="mt-5 flex flex-wrap justify-center gap-1">

                                    {products.links.map(
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
                                                            ? 'border-[#102a56] bg-[#102a56] text-white dark:border-blue-600 dark:bg-blue-600'
                                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-[#102a56] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-blue-300'
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