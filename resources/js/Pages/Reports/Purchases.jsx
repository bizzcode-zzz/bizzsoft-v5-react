import { useForm, Link } from '@inertiajs/react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import PurchasesPdf from './Pdf/Purchases';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Table from '@/Components/BizzSoft/Table';

export default function Purchases({
    purchases,
    allPurchases,
    totalPurchaseCost,
    totalQuantityPurchased,
    totalTransactions,
    filters,
}) {
    const { data, setData, get } = useForm({
        from: filters?.from || '',
        to: filters?.to || '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('reports.purchases'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56] dark:text-blue-300">
                        Purchase Report
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-300">
                        View purchase transactions, quantities, and total purchase costs.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        DATE FILTER
                    ================================================== */}

                    <Card
                        title="📅 Filter Purchase Report"
                        className="mb-6"
                    >

                        <form onSubmit={submit}>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                <Input
                                    label="From"
                                    type="date"
                                    value={data.from}
                                    onChange={(e) =>
                                        setData(
                                            'from',
                                            e.target.value
                                        )
                                    }
                                />

                                <Input
                                    label="To"
                                    type="date"
                                    value={data.to}
                                    onChange={(e) =>
                                        setData(
                                            'to',
                                            e.target.value
                                        )
                                    }
                                />

                                <div className="flex items-end gap-2">

                                    {/* Filter */}

                                    <Button type="submit">
                                        🔍 Filter
                                    </Button>


                                    {/* Reset */}

                                    <Button
                                        href={route('reports.purchases')}
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

                                            if (data.from) {
                                                params.append(
                                                    'from',
                                                    data.from
                                                );
                                            }

                                            if (data.to) {
                                                params.append(
                                                    'to',
                                                    data.to
                                                );
                                            }

                                            window.open(
                                                `${route(
                                                    'reports.purchases.print'
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
                                            <PurchasesPdf
                                                purchases={allPurchases || []}
                                                totalPurchaseCost={
                                                    totalPurchaseCost
                                                }
                                                totalQuantity={
                                                    totalQuantityPurchased
                                                }
                                                totalTransactions={
                                                    totalTransactions
                                                }
                                                generatedBy="Admin"
                                            />
                                        }
                                        fileName="purchases-report.pdf"
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

                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">

                        <Card title="🧾 Total Purchase Cost">

                            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ₱{Number(
                                    totalPurchaseCost
                                ).toFixed(2)}
                            </h3>

                        </Card>


                        <Card title="📦 Total Quantity Purchased">

                            <h3 className="text-2xl font-bold text-[#102a56] dark:text-blue-300">
                                {totalQuantityPurchased}
                            </h3>

                        </Card>


                        <Card title="🧾 Total Transactions">

                            <h3 className="text-2xl font-bold text-[#102a56] dark:text-blue-300">
                                {totalTransactions}
                            </h3>

                        </Card>

                    </div>


                    {/* =================================================
                        PURCHASE TABLE
                    ================================================== */}

                    <Card
                        title="📋 Purchase Transactions"
                        className="mb-4"
                    >

                        <Table
                            headers={[
                                'Transaction ID',
                                'Product',
                                'Supplier / Vendor',
                                'Quantity',
                                'Cost Price',
                                'Total Cost',
                            ]}
                        >

                            {purchases.data?.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-4 py-8 text-center text-sm"
                                    >
                                        No purchase transactions found.
                                    </td>

                                </tr>

                            ) : (

                                purchases.data?.map((purchase) => {

                                    const totalCost =
                                        Number(
                                            purchase.quantity
                                        ) *
                                        Number(
                                            purchase.cost_price
                                        );

                                    return (

                                        <tr
                                            key={purchase.id}
                                            className="border-t border-slate-100 transition hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                        >

                                            {/* Transaction ID */}

                                            <td className="w-[14%] whitespace-nowrap px-4 py-3 text-sm font-bold text-[#102a56] dark:text-blue-300">
                                                #PUR-{purchase.id}
                                            </td>


                                            {/* Product */}

                                            <td className="w-[21%] px-4 py-3 text-sm font-medium">
                                                {purchase.product?.name ??
                                                    'Unknown Product'}
                                            </td>


                                            {/* Supplier */}

                                            <td className="w-[21%] px-4 py-3 text-sm">
                                                {purchase.supplier?.supplier_name ??
                                                    'Unknown Supplier'}
                                            </td>


                                            {/* Quantity */}

                                            <td className="w-[12%] whitespace-nowrap px-4 py-3 text-sm">
                                                {purchase.quantity}
                                            </td>


                                            {/* Cost Price */}

                                            <td className="w-[15%] whitespace-nowrap px-4 py-3 text-sm">
                                                ₱{Number(
                                                    purchase.cost_price
                                                ).toFixed(2)}
                                            </td>


                                            {/* Total Cost */}

                                            <td className="w-[17%] whitespace-nowrap px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400">
                                                ₱{totalCost.toFixed(2)}
                                            </td>

                                        </tr>

                                    );

                                })

                            )}

                        </Table>


                        {/* =================================================
                            PAGINATION
                        ================================================== */}

                        {purchases.links &&
                            purchases.links.length > 3 && (

                                <div className="mt-5 flex flex-wrap justify-center gap-1">

                                    {purchases.links.map(
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