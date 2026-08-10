import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Select from '@/Components/BizzSoft/Select';

export default function SalesForm({ products = [] }) {
    const {
        data,
        setData,
        post,
        processing,
        reset,
    } = useForm({
        product_id: '',
        sales_date: '',
        quantity: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('sales.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Card
            title="💰 New Sales Transaction"
            className="mb-4"
        >
            <form onSubmit={submit}>

                <Select
                    label="Select Product"
                    value={data.product_id}
                    onChange={(e) =>
                        setData('product_id', e.target.value)
                    }
                    required
                >
                    <option value="">
                        -- Choose Product --
                    </option>

                    {products.map((product) => (
                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name} (Stock: {product.stock})
                        </option>
                    ))}
                </Select>

                <Input
                    label="Sales Date"
                    type="date"
                    value={data.sales_date}
                    onChange={(e) =>
                        setData('sales_date', e.target.value)
                    }
                    required
                />

                <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    placeholder="e.g. 5"
                    value={data.quantity}
                    onChange={(e) =>
                        setData('quantity', e.target.value)
                    }
                    required
                />

                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing
                        ? 'Processing Sale...'
                        : '💾 Save Sale'}
                </Button>

            </form>
        </Card>
    );
}