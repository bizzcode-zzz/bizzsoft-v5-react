import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },

    header: {
        textAlign: 'center',
        marginBottom: 15,
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    generated: {
        marginTop: 8,
        fontSize: 10,
    },

    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginVertical: 12,
    },

    recordsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
    },

    tableRow: {
        flexDirection: 'row',
    },

    headerRow: {
        backgroundColor: '#eeeeee',
    },

    cell: {
        padding: 6,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000',
    },

    numberCell: {
        width: '8%',
    },

    productCell: {
        width: '27%',
    },

    supplierCell: {
        width: '25%',
    },

    quantityCell: {
        width: '12%',
    },

    priceCell: {
        width: '14%',
    },

    totalCell: {
        width: '14%',
        borderRightWidth: 0,
    },

    summary: {
        marginTop: 15,
        width: '50%',
        borderWidth: 1,
        borderColor: '#000',
    },

    summaryRow: {
        flexDirection: 'row',
    },

    summaryLabel: {
        width: '60%',
        padding: 6,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000',
        fontWeight: 'bold',
    },

    summaryValue: {
        width: '40%',
        padding: 6,
        borderBottomWidth: 1,
        borderColor: '#000',
    },

    footer: {
        marginTop: 20,
        fontSize: 10,
    },
});

function money(value) {
    return Number(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export default function PurchasesPdf({
    purchases,
    totalPurchaseCost,
    totalQuantity,
    totalTransactions,
    generatedBy = 'System Admin',
}) {
    return (
        <Document>

            <Page size="A4" style={styles.page}>

                {/* Header */}

                <View style={styles.header}>

                    <Text style={styles.title}>
                        BizzSoft Inventory Management System
                    </Text>

                    <Text style={styles.subtitle}>
                        Purchase Report
                    </Text>

                    <Text style={styles.generated}>
                        Generated: {new Date().toLocaleString('en-US', {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>

                </View>


                <View style={styles.line} />


                {/* Records */}

                <Text style={styles.recordsTitle}>
                    All Records
                </Text>


                {/* Purchase Table */}

                <View style={styles.table}>

                    <View style={[styles.tableRow, styles.headerRow]}>

                        <Text style={[styles.cell, styles.numberCell]}>
                            No.
                        </Text>

                        <Text style={[styles.cell, styles.productCell]}>
                            Product
                        </Text>

                        <Text style={[styles.cell, styles.supplierCell]}>
                            Supplier
                        </Text>

                        <Text style={[styles.cell, styles.quantityCell]}>
                            Quantity
                        </Text>

                        <Text style={[styles.cell, styles.priceCell]}>
                            Cost Price
                        </Text>

                        <Text style={[styles.cell, styles.totalCell]}>
                            Total Cost
                        </Text>

                    </View>


                    {purchases?.map((purchase, index) => (

                        <View
                            key={purchase.id}
                            style={styles.tableRow}
                        >

                            <Text style={[styles.cell, styles.numberCell]}>
                                {index + 1}
                            </Text>

                            <Text style={[styles.cell, styles.productCell]}>
                                {purchase.product?.name ?? 'Unknown Product'}
                            </Text>

                            <Text style={[styles.cell, styles.supplierCell]}>
                                {purchase.supplier?.supplier_name ?? 'Unknown Supplier'}
                            </Text>

                            <Text style={[styles.cell, styles.quantityCell]}>
                                {purchase.quantity}
                            </Text>

                            <Text style={[styles.cell, styles.priceCell]}>
                                {money(purchase.cost_price)}
                            </Text>

                            <Text style={[styles.cell, styles.totalCell]}>
                                {money(
                                    Number(purchase.quantity) *
                                    Number(purchase.cost_price)
                                )}
                            </Text>

                        </View>

                    ))}

                </View>


                {/* Summary */}

                <View style={styles.summary}>

                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            Total Purchase Cost
                        </Text>

                        <Text style={styles.summaryValue}>
                            {money(totalPurchaseCost)}
                        </Text>

                    </View>


                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            Total Quantity
                        </Text>

                        <Text style={styles.summaryValue}>
                            {totalQuantity}
                        </Text>

                    </View>


                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            Total Transactions
                        </Text>

                        <Text style={styles.summaryValue}>
                            {totalTransactions}
                        </Text>

                    </View>

                </View>


                {/* Footer */}

                <View style={styles.footer}>

                    <View style={styles.line} />

                    <Text>
                        Generated by: {generatedBy}
                    </Text>

                </View>

            </Page>

        </Document>
    );
}