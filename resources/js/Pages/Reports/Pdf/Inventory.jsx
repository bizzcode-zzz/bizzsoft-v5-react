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
        width: '7%',
    },

    productCell: {
        width: '23%',
    },

    categoryCell: {
        width: '18%',
    },

    priceCell: {
        width: '15%',
    },

    stockCell: {
        width: '12%',
    },

    reorderCell: {
        width: '15%',
    },

    statusCell: {
        width: '10%',
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

function getStatus(product) {
    if (Number(product.stock) === 0) {
        return 'Out of Stock';
    }

    if (
        Number(product.stock) <=
        Number(product.reorder_level)
    ) {
        return 'Low Stock';
    }

    return 'In Stock';
}

export default function InventoryPdf({
    products,
    totalProducts,
    totalStock,
    lowStockProducts,
    outOfStockProducts,
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
                        Inventory Report
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


                {/* Inventory Table */}

                <View style={styles.table}>

                    <View style={[styles.tableRow, styles.headerRow]}>

                        <Text style={[styles.cell, styles.numberCell]}>
                            No.
                        </Text>

                        <Text style={[styles.cell, styles.productCell]}>
                            Product
                        </Text>

                        <Text style={[styles.cell, styles.categoryCell]}>
                            Category
                        </Text>

                        <Text style={[styles.cell, styles.priceCell]}>
                            Price
                        </Text>

                        <Text style={[styles.cell, styles.stockCell]}>
                            Stock
                        </Text>

                        <Text style={[styles.cell, styles.reorderCell]}>
                            Reorder Level
                        </Text>

                        <Text style={[styles.cell, styles.statusCell]}>
                            Status
                        </Text>

                    </View>


                    {products?.map((product, index) => (

                        <View
                            key={product.id}
                            style={styles.tableRow}
                        >

                            <Text style={[styles.cell, styles.numberCell]}>
                                {index + 1}
                            </Text>

                            <Text style={[styles.cell, styles.productCell]}>
                                {product.name}
                            </Text>

                            <Text style={[styles.cell, styles.categoryCell]}>
                                {product.category?.category_name ?? 'Unknown Category'}
                            </Text>

                            <Text style={[styles.cell, styles.priceCell]}>
                                {money(product.price)}
                            </Text>

                            <Text style={[styles.cell, styles.stockCell]}>
                                {product.stock}
                            </Text>

                            <Text style={[styles.cell, styles.reorderCell]}>
                                {product.reorder_level}
                            </Text>

                            <Text style={[styles.cell, styles.statusCell]}>
                                {getStatus(product)}
                            </Text>

                        </View>

                    ))}

                </View>


                {/* Summary */}

                <View style={styles.summary}>

                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            Total Products
                        </Text>

                        <Text style={styles.summaryValue}>
                            {totalProducts}
                        </Text>

                    </View>


                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            Total Stock
                        </Text>

                        <Text style={styles.summaryValue}>
                            {totalStock}
                        </Text>

                    </View>


                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            Low Stock Products
                        </Text>

                        <Text style={styles.summaryValue}>
                            {lowStockProducts}
                        </Text>

                    </View>


                    <View style={styles.summaryRow}>

                        <Text style={styles.summaryLabel}>
                            Out of Stock Products
                        </Text>

                        <Text style={styles.summaryValue}>
                            {outOfStockProducts}
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