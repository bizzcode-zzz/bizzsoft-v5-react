import { router } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Table from '@/Components/BizzSoft/Table';

export default function CategoryTable({ categories }) {
    const deleteCategory = (id) => {
        if (!confirm('Are you sure you want to delete this category?')) {
            return;
        }

        router.delete(route('categories.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <Card
            title="📋 Category List"
            className="mb-4"
        >

            <Table
                headers={[
                    'Category Name',
                    'Action',
                ]}
            >

                {categories.map((category) => (

                    <tr
                        key={category.id}
                        className="border-t border-slate-100 transition hover:bg-blue-50/50"
                    >

                        {/* Category Name */}

                        <td className="w-full px-4 py-3 text-sm font-medium text-slate-700">
                            {category.category_name}
                        </td>


                        {/* Action */}

                        <td className="w-64 whitespace-nowrap px-4 py-3 text-right">

                            <Button
                                href={route(
                                    'categories.edit',
                                    category.id
                                )}
                                variant="secondary"
                                className="mr-2"
                            >
                                ✏️ Edit
                            </Button>

                            <Button
                                variant="danger"
                                onClick={() =>
                                    deleteCategory(category.id)
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