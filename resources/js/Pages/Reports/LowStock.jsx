import { useForm, Link } from '@inertiajs/react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import LowStockPdf from './Pdf/LowStock';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Table from '@/Components/BizzSoft/Table';

export default function LowStock({
    lowStockProducts,
    allLowStockProducts,
    totalLowStockProducts,
    totalLowStockQuantity,
    filters,
}) {
    const { data, setData, get } = useForm({
        search: filters?.search || '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('reports.low_stock'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56] dark:text-blue-300">
                        Low Stock Report
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                        View products that are currently below their reorder level.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        SEARCH & ACTIONS
                    ================================================== */}

                    <Card
                        title="🔍 Search Low Stock Products"
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


                                {/* Actions */}

                                <div className="flex flex-wrap items-end gap-2 md:col-span-2">

                                    <Button type="submit">
                                        🔍 Search
                                    </Button>


                                    <Button
                                        href={route(
                                            'reports.low_stock'
                                        )}
                                        variant="secondary"
                                    >
                                        Reset
                                    </Button>


                                    {/* Print */}

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

                                            window.open(
                                                `${route(
                                                    'reports.low_stock.print'
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
                                            <LowStockPdf
                                                products={
                                                    allLowStockProducts || []
                                                }
                                                totalLowStockProducts={
                                                    totalLowStockProducts
                                                }
                                                totalLowStockQuantity={
                                                    totalLowStockQuantity
                                                }
                                                generatedBy="Admin"
                                            />
                                        }
                                        fileName="low-stock-report.pdf"
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

                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                        <Card title="⚠️ Low Stock Products">

                            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                {totalLowStockProducts}
                            </h3>

                        </Card>


                        <Card title="📦 Total Low Stock Quantity">

                            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {totalLowStockQuantity}
                            </h3>

                        </Card>

                    </div>


                    {/* =================================================
                        LOW STOCK TABLE
                    ================================================== */}

                    <Card
                        title="⚠️ Products Requiring Restock"
                        className="mb-4"
                    >

                        <Table
                            headers={[
                                'Product',
                                'Category',
                                'Current Stock',
                                'Reorder Level',
                                'Status',
                            ]}
                        >

                            {lowStockProducts.data?.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-4 py-8 text-center text-sm"
                                    >
                                        No low-stock products found.
                                    </td>

                                </tr>

                            ) : (

                                lowStockProducts.data?.map((product) => (

                                    <tr
                                        key={product.id}
                                        className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                    >

                                        {/* Product */}

                                        <td className="w-[25%] px-4 py-3 text-sm font-semibold text-[#102a56] dark:text-blue-300">
                                            {product.name}
                                        </td>


                                        {/* Category */}

                                        <td className="w-[25%] px-4 py-3 text-sm">
                                            {product.category?.category_name ??
                                                'No Category'}
                                        </td>


                                        {/* Current Stock */}

                                        <td className="w-[16%] whitespace-nowrap px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400">
                                            {product.stock}
                                        </td>


                                        {/* Reorder Level */}

                                        <td className="w-[18%] whitespace-nowrap px-4 py-3 text-sm">
                                            {product.reorder_level}
                                        </td>


                                        {/* Status */}

                                        <td className="w-[16%] whitespace-nowrap px-4 py-3 text-sm font-bold text-amber-600 dark:text-amber-400">
                                            Low Stock
                                        </td>

                                    </tr>

                                ))

                            )}

                        </Table>


                        {/* =================================================
                            PAGINATION
                        ================================================== */}

                        {lowStockProducts.links &&
                            lowStockProducts.links.length > 3 && (

                                <div className="mt-5 flex flex-wrap justify-center gap-1">

                                    {lowStockProducts.links.map(
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