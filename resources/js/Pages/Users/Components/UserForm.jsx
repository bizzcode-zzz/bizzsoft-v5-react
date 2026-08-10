import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';
import Select from '@/Components/BizzSoft/Select';

export default function UserForm({ user, roles = [] }) {
    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
    } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        role_id: user?.role_id ?? '',
        status: user?.status ?? true,
    });

    const submit = (e) => {
        e.preventDefault();

        if (user) {
            put(route('users.update', user.id), {
                preserveScroll: true,
            });
        } else {
            post(route('users.store'), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <Card
            title={
                user
                    ? '✏️ Edit User'
                    : '👤 Create User'
            }
            className="mb-4"
        >
            <form onSubmit={submit}>

                {/* Name */}
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="e.g. Juan Dela Cruz"
                    value={data.name}
                    onChange={(e) =>
                        setData('name', e.target.value)
                    }
                    required
                />

                {/* Email */}
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. user@example.com"
                    value={data.email}
                    onChange={(e) =>
                        setData('email', e.target.value)
                    }
                    required
                />

                {/* Password */}
                <Input
                    label="Password"
                    type="password"
                    placeholder={
                        user
                            ? 'Leave blank to keep current password'
                            : 'Enter password'
                    }
                    value={data.password}
                    onChange={(e) =>
                        setData('password', e.target.value)
                    }
                    required={!user}
                    hint={
                        user
                            ? 'Leave this blank if you do not want to change the current password.'
                            : undefined
                    }
                />

                {/* Role */}
                <Select
                    label="Role"
                    value={data.role_id}
                    onChange={(e) =>
                        setData('role_id', e.target.value)
                    }
                    required
                >
                    <option value="">
                        -- Select Role --
                    </option>

                    {roles.map((role) => (
                        <option
                            key={role.id}
                            value={role.id}
                        >
                            {role.name}
                        </option>
                    ))}
                </Select>

                {/* Status */}
                <Select
                    label="Account Status"
                    value={data.status ? '1' : '0'}
                    onChange={(e) =>
                        setData(
                            'status',
                            e.target.value === '1'
                        )
                    }
                    required
                >
                    <option value="1">
                        Active
                    </option>

                    <option value="0">
                        Inactive
                    </option>
                </Select>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing
                        ? 'Saving User...'
                        : user
                            ? '💾 Update User'
                            : '💾 Create User'}
                </Button>

            </form>
        </Card>
    );
}