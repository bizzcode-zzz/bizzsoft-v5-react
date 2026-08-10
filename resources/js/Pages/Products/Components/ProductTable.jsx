import { router } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Table from '@/Components/BizzSoft/Table';

export default function ProductTable({ products }) {
    const deleteProduct = (id) => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        router.delete(route('products.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <Card title="📋 Product List">

            <Table
                headers={[
                    'Product',
                    'Category',
                    'Price',
                    'Stock',
                    'Reorder Level',
                    'Action',
                ]}
            >

                {products.map((product) => (

                    <tr
                        key={product.id}
                        className="border-t border-slate-100 transition hover:bg-blue-50/50"
                    >

                        {/* Product */}

                        <td className="w-[25%] px-4 py-3 text-sm font-medium text-slate-700">
                            {product.name}
                        </td>


                        {/* Category */}

                        <td className="w-[22%] px-4 py-3 text-sm text-slate-600">
                            {product.category?.category_name ??
                                'Uncategorized'}
                        </td>


                        {/* Price */}

                        <td className="w-[12%] whitespace-nowrap px-4 py-3 text-sm font-medium text-[#102a56]">
                            ₱{Number(product.price).toFixed(2)}
                        </td>


                        {/* Stock */}

                        <td className="w-[10%] px-4 py-3 text-center text-sm text-slate-600">
                            {product.stock}
                        </td>


                        {/* Reorder Level */}

                        <td className="w-[13%] px-4 py-3 text-center text-sm text-slate-600">
                            {product.reorder_level}
                        </td>


                        {/* Action */}

                        <td className="w-[18%] whitespace-nowrap px-4 py-3 text-right">

                            <Button
                                href={route(
                                    'products.edit',
                                    product.id
                                )}
                                variant="secondary"
                                className="mr-2"
                            >
                                ✏️ Edit
                            </Button>

                            <Button
                                variant="danger"
                                onClick={() =>
                                    deleteProduct(product.id)
                                }
                            >
                                🗑️ Delete
                            </Button>

                        </td>

                    </tr>

                ))}

            </Table>

        </Card>
    );
}