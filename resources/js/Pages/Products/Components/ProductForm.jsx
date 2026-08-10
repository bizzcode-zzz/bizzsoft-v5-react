import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Select from '@/Components/BizzSoft/Select';

export default function ProductForm({ categories, product }) {

    const { data, setData, post, put } = useForm({
        name: product?.name ?? '',
        category_id: product?.category_id ?? '',
        price: product?.price ?? '',
        stock: product?.stock ?? '',
        reorder_level: product?.reorder_level ?? 5,
    });

    const submit = (e) => {
        e.preventDefault();

        if (product) {

            put(route('products.update', product.id), {
                preserveScroll: true,
            });

        } else {

            post(route('products.store'), {
                preserveScroll: true,
            });

        }
    };



    return (
        <Card
            title="📦 Add Product"
            className="mb-4"
        >
            <form onSubmit={submit}>

                {/* Product Name */}
                <Input
                    label="Product Name"
                    type="text"
                    placeholder="e.g. Coffee"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />

                {/* Category */}
                <Select
                    label="Category"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                >
                    <option value="">-- Select Category --</option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.category_name}
                        </option>
                    ))}
                </Select>


                {/* Price */}
                <Input
                    label="Price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                />

                {/* Stock */}
                <Input
                    label="Stock"
                    type="number"
                    placeholder="0"
                    value={data.stock}
                    onChange={(e) => setData('stock', e.target.value)}
                />

                {/* Reorder Level */}
                <Input
                    label="Reorder Level"
                    type="number"
                    placeholder="5"
                    value={data.reorder_level}
                    onChange={(e) => setData('reorder_level', e.target.value)}
                    hint="An alert will trigger if stocks fall below this number."
                />

                <Button type="submit">
                    {product ? '💾 Update Product' : '💾 Save Product'}
                </Button>

            </form>
        </Card>
    );
}