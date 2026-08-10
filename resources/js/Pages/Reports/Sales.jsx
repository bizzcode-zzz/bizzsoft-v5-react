import { useForm, Link } from '@inertiajs/react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import SalesPdf from './Pdf/Sales';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Table from '@/Components/BizzSoft/Table';

export default function Sales({
    sales,
    allSales,
    totalSales,
    totalQuantity,
    totalTransactions,
    filters,
}) {
    const { data, setData, get } = useForm({
        from: filters?.from || '',
        to: filters?.to || '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('reports.sales'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56]">
                        Sales Report
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        View sales transactions, quantities, and total sales.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* =================================================
                        DATE FILTER
                    ================================================== */}

                    <Card
                        title="📅 Filter Sales Report"
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
                                        href={route('reports.sales')}
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
                                                    'reports.sales.print'
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
                                            <SalesPdf
                                                sales={allSales || []}
                                                totalSales={totalSales}
                                                totalQuantity={totalQuantity}
                                                totalTransactions={totalTransactions}
                                                generatedBy="Admin"
                                            />
                                        }
                                        fileName="sales-report.pdf"
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

                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">

                        <Card title="💰 Total Sales">

                            <h3 className="text-2xl font-bold text-green-600">
                                ₱{Number(totalSales).toFixed(2)}
                            </h3>

                        </Card>


                        <Card title="📦 Total Quantity">

                            <h3 className="text-2xl font-bold text-[#102a56]">
                                {totalQuantity}
                            </h3>

                        </Card>


                        <Card title="🧾 Total Transactions">

                            <h3 className="text-2xl font-bold text-[#102a56]">
                                {totalTransactions}
                            </h3>

                        </Card>

                    </div>


                    {/* =================================================
                        SALES TABLE
                    ================================================== */}

                    <Card
                        title="📋 Sales Transactions"
                        className="mb-4"
                    >

                        <Table
                            headers={[
                                'Transaction ID',
                                'Product',
                                'Quantity',
                                'Selling Price',
                                'Total Sale',
                                'Sale Date',
                            ]}
                        >

                            {sales.data?.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-4 py-8 text-center text-sm text-slate-500"
                                    >
                                        No sales transactions found.
                                    </td>

                                </tr>

                            ) : (

                                sales.data?.map((sale) => (

                                    <tr
                                        key={sale.id}
                                        className="border-t border-slate-100 transition hover:bg-blue-50/50"
                                    >

                                        <td className="w-[14%] whitespace-nowrap px-4 py-3 text-sm font-bold text-[#102a56]">
                                            #SALE-{sale.id}
                                        </td>


                                        <td className="w-[22%] px-4 py-3 text-sm font-medium text-slate-700">
                                            {sale.product?.name ??
                                                'Unknown Product'}
                                        </td>


                                        <td className="w-[12%] whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                                            {sale.quantity}
                                        </td>


                                        <td className="w-[17%] whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                                            ₱{Number(
                                                sale.selling_price
                                            ).toFixed(2)}
                                        </td>


                                        <td className="w-[17%] whitespace-nowrap px-4 py-3 text-sm font-bold text-green-600">
                                            ₱{Number(
                                                sale.line_total
                                            ).toFixed(2)}
                                        </td>


                                        <td className="w-[18%] whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                                            {sale.sales_date}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </Table>


                        {/* =================================================
                            PAGINATION
                        ================================================== */}

                        {sales.links && sales.links.length > 3 && (

                            <div className="mt-5 flex flex-wrap justify-center gap-1">

                                {sales.links.map((link, index) => (

                                    <Link
                                        key={index}
                                        href={link.url || '#'}
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

                                ))}

                            </div>

                        )}

                    </Card>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}