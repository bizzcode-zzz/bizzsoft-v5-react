import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';

export default function SupplierSearchBar({ filters = {} }) {
    const { data, setData, get } = useForm({
        search: filters?.search ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('suppliers.index'), {
            search: data.search,
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Card
            title="🔍 Search Suppliers"
            className="mb-4"
        >
            <form onSubmit={submit}>

                <Input
                    type="text"
                    placeholder="Search supplier..."
                    value={data.search}
                    onChange={(e) =>
                        setData('search', e.target.value)
                    }
                />

                <Button
                    type="submit"
                    variant="secondary"
                >
                    🔍 Search
                </Button>

            </form>
        </Card>
    );
}