import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';

export default function UserSearchBar({ filters = {} }) {
    const { data, setData, get } = useForm({
        search: filters?.search ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('users.index'), {
            search: data.search,
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Card
            title="🔍 Search Users"
            className="mb-4"
        >

            <form
                onSubmit={submit}
                className="flex flex-col gap-3 sm:flex-row sm:items-end"
            >

                <div className="flex-1">

                    <Input
                        type="text"
                        placeholder="Search name or email..."
                        value={data.search}
                        onChange={(e) =>
                            setData(
                                'search',
                                e.target.value
                            )
                        }
                    />

                </div>


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