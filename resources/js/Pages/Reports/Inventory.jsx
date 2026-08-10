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
                    <h2 className="text-2xl font-extrabold text-[#102a56]">
                        Inventory Report
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        View current inventory, stock levels, and product status.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8">

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

                                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                                        Category
                                    </label>

                                    <select
                                        className="
                                            block
                                            w-full
                                            rounded-md
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            py-2
                                            text-sm
                                            text-slate-700
                                            shadow-sm
                                            focus:border-[#102a56]
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-[#102a56]
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

                            <h3 className="text-2xl font-bold text-[#102a56]">
                                {totalProducts}
                            </h3>

                        </Card>


                        <Card title="📊 Total Stock">

                            <h3 className="text-2xl font-bold text-blue-600">
                                {totalStock}
                            </h3>

                        </Card>


                        <Card title="⚠️ Low Stock">

                            <h3 className="text-2xl font-bold text-amber-600">
                                {lowStockProducts}
                            </h3>

                        </Card>


                        <Card title="🚨 Out of Stock">

                            <h3 className="text-2xl font-bold text-red-600">
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
                                        className="px-4 py-8 text-center text-sm text-slate-500"
                                    >
                                        No products found.
                                    </td>

                                </tr>

                            ) : (

                                products.data?.map((product) => {

                                    let status = 'In Stock';
                                    let statusClass =
                                        'text-green-600';

                                    if (product.stock === 0) {

                                        status = 'Out of Stock';
                                        statusClass =
                                            'text-red-600';

                                    } else if (
                                        product.stock <=
                                        product.reorder_level
                                    ) {

                                        status = 'Low Stock';
                                        statusClass =
                                            'text-amber-600';

                                    }

                                    return (

                                        <tr
                                            key={product.id}
                                            className="border-t border-slate-100 transition hover:bg-blue-50/50"
                                        >

                                            <td className="w-[22%] px-4 py-3 text-sm font-semibold text-[#102a56]">
                                                {product.name}
                                            </td>


                                            <td className="w-[20%] px-4 py-3 text-sm text-slate-600">
                                                {product.category?.category_name ??
                                                    'Uncategorized'}
                                            </td>


                                            <td className="w-[15%] whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                                                ₱{Number(
                                                    product.price
                                                ).toFixed(2)}
                                            </td>


                                            <td className="w-[13%] whitespace-nowrap px-4 py-3 text-sm font-bold text-slate-700">
                                                {product.stock}
                                            </td>


                                            <td className="w-[15%] whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                                                {product.reorder_level}
                                            </td>


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
                                                            ? 'border-[#102a56] bg-[#102a56] text-white'
                                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-[#102a56]'
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