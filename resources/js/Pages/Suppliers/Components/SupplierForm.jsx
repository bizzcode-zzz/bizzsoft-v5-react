import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';

export default function SupplierForm({ supplier }) {
    const { data, setData, post, put } = useForm({
        supplier_name: supplier?.supplier_name ?? '',
        contact_person: supplier?.contact_person ?? '',
        phone_number: supplier?.phone_number ?? '',
        email: supplier?.email ?? '',
        address: supplier?.address ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (supplier) {
            put(route('suppliers.update', supplier.id), {
                preserveScroll: true,
            });
        } else {
            post(route('suppliers.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <Card
            title={supplier ? '🏢 Edit Supplier' : '🏢 Add Supplier'}
            className="mb-4"
        >
            <form onSubmit={submit}>

                <Input
                    label="Supplier Name"
                    type="text"
                    placeholder="e.g. ABC Trading"
                    value={data.supplier_name}
                    onChange={(e) =>
                        setData('supplier_name', e.target.value)
                    }
                />

                <Input
                    label="Contact Person"
                    type="text"
                    placeholder="e.g. Juan Dela Cruz"
                    value={data.contact_person}
                    onChange={(e) =>
                        setData('contact_person', e.target.value)
                    }
                />

                <Input
                    label="Phone Number"
                    type="text"
                    placeholder="e.g. 09123456789"
                    value={data.phone_number}
                    onChange={(e) =>
                        setData('phone_number', e.target.value)
                    }
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="e.g. supplier@email.com"
                    value={data.email}
                    onChange={(e) =>
                        setData('email', e.target.value)
                    }
                />

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-[#f0f6fc]">
                        Address
                    </label>

                    <textarea
                        rows="2"
                        placeholder="e.g. Manila, Philippines"
                        value={data.address}
                        onChange={(e) =>
                            setData('address', e.target.value)
                        }
                        className="
                            w-full
                            max-w-md
                            rounded-md
                            border
                            border-[#30363d]
                            bg-[#0d1117]
                            px-3
                            py-2
                            text-sm
                            text-[#f0f6fc]
                            placeholder-[#8b949e]
                            outline-none
                            transition
                            focus:border-[#238636]
                            focus:ring-2
                            focus:ring-[#238636]
                        "
                    />
                </div>

                <Button type="submit">
                    {supplier
                        ? '💾 Update Supplier'
                        : '💾 Save Supplier'}
                </Button>

            </form>
        </Card>
    );
}