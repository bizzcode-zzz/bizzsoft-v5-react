import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Select from '@/Components/BizzSoft/Select';

export default function PurchaseForm({ products = [], suppliers = [] }) {

    const { data, setData, post, processing, reset } = useForm({
        product_id: '',
        supplier_id: '',
        purchase_date: '',
        quantity: '',
        cost_price: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('purchases.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Card
            title="🧾 New Purchase Transaction"
            className="mb-4"
        >

            <form onSubmit={submit}>

                {/* Product */}
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
                            {product.name} (Current Stock: {product.stock})
                        </option>
                    ))}
                </Select>

                {/* Supplier */}
                <Select
                    label="Select Supplier"
                    value={data.supplier_id}
                    onChange={(e) =>
                        setData('supplier_id', e.target.value)
                    }
                    required
                >
                    <option value="">
                        -- Choose Supplier --
                    </option>

                    {suppliers.map((supplier) => (
                        <option
                            key={supplier.id}
                            value={supplier.id}
                        >
                            {supplier.supplier_name}
                        </option>
                    ))}
                </Select>

                {/* Purchase Date */}
                <Input
                    label="Purchase Date"
                    type="date"
                    value={data.purchase_date}
                    onChange={(e) =>
                        setData('purchase_date', e.target.value)
                    }
                    required
                />

                {/* Quantity */}
                <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    placeholder="e.g. 50"
                    value={data.quantity}
                    onChange={(e) =>
                        setData('quantity', e.target.value)
                    }
                    required
                />

                {/* Cost Price */}
                <Input
                    label="Cost Price per Unit"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={data.cost_price}
                    onChange={(e) =>
                        setData('cost_price', e.target.value)
                    }
                    required
                />

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing
                        ? 'Saving Transaction...'
                        : '💾 Save Transaction'}
                </Button>

            </form>

       </Card>
    );
}