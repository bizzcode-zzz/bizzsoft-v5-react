import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';

export default function CategoryForm({ category }) {
    const { data, setData, post, put } = useForm({
        category_name: category?.category_name ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (category) {
            put(route('categories.update', category.id), {
                preserveScroll: true,
            });
        } else {
            post(route('categories.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <Card
            title={category ? '📁 Edit Category' : '📁 Add Category'}
            className="mb-4"
        >
            <form onSubmit={submit}>

                <Input
                    label="Category Name"
                    type="text"
                    placeholder="e.g. Beverages"
                    value={data.category_name}
                    onChange={(e) =>
                        setData('category_name', e.target.value)
                    }
                />

                <Button type="submit">
                    {category
                        ? '💾 Update Category'
                        : '💾 Save Category'}
                </Button>

            </form>
        </Card>
    );
}