import { useForm } from '@inertiajs/react';
import Button from '@/Components/BizzSoft/Button';
import Card from '@/Components/BizzSoft/Card';
import Input from '@/Components/BizzSoft/Input';

export default function ResetPasswordForm({ user }) {
    const {
        data,
        setData,
        patch,
        processing,
        reset,
    } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(
            route('users.reset-password.update', user.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                },
            }
        );
    };

    return (
        <Card
            title="🔐 Reset User Password"
            className="mb-4"
        >
            <div className="mb-6 rounded-md border border-[#1f6feb] bg-[#0d1b2a] px-4 py-3 text-sm text-[#58a6ff]">
                Resetting password for:
                <strong className="ml-1">
                    {user.name}
                </strong>
            </div>

            <form onSubmit={submit}>

                {/* New Password */}
                <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    value={data.password}
                    onChange={(e) =>
                        setData(
                            'password',
                            e.target.value
                        )
                    }
                    required
                />

                {/* Confirm Password */}
                <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData(
                            'password_confirmation',
                            e.target.value
                        )
                    }
                    required
                />

                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing
                        ? 'Resetting Password...'
                        : '🔐 Reset Password'}
                </Button>

            </form>
        </Card>
    );
}