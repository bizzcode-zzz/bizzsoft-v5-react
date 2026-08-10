import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';

export default function Index() {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-[#102a56]">
                        Reports
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        View sales, purchase, inventory, and low-stock reports.
                    </p>
                </div>
            }
        >

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Sales Report */}

                        <Card title="💰 Sales Report">

                            <p className="mb-4 text-sm text-slate-500">
                                View sales transactions and summaries.
                            </p>

                            <Button
                                href={route('reports.sales')}
                            >
                                View Sales Report
                            </Button>

                        </Card>


                        {/* Purchase Report */}

                        <Card title="🧾 Purchase Report">

                            <p className="mb-4 text-sm text-slate-500">
                                View purchase transactions and costs.
                            </p>

                            <Button
                                href={route('reports.purchases')}
                            >
                                View Purchase Report
                            </Button>

                        </Card>


                        {/* Inventory Report */}

                        <Card title="📦 Inventory Report">

                            <p className="mb-4 text-sm text-slate-500">
                                View current inventory and stock levels.
                            </p>

                            <Button
                                href={route('reports.inventory')}
                            >
                                View Inventory Report
                            </Button>

                        </Card>


                        {/* Low Stock Report */}

                        <Card title="⚠️ Low Stock Report">

                            <p className="mb-4 text-sm text-slate-500">
                                View products that need restocking.
                            </p>

                            <Button
                                href={route('reports.low_stock')}
                            >
                                View Low Stock Report
                            </Button>

                        </Card>

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}