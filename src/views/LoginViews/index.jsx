import Form from '@/components/forms';
import Input, { InputPassword } from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
    const { login } = useAuth();
    const [toast, setToast] = useState({});

    const handleLogin = async (e) => {
        e.preventDefault();
        const body = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        await login('login', body)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setToast({
                        variant: 'success',
                        title: 'Login successful',
                        message: res.data.message,
                        show: true,
                    });
                } else {
                    setToast({
                        variant: 'error',
                        title: 'Login failed',
                        message: 'Something went wrong!',
                        show: true,
                    });
                }
            })
            .catch((err) => {
                setToast({
                    variant: 'error',
                    title: 'Login failed',
                    message: err?.response?.data?.message,
                    show: true,
                });
            });
    };

    return (
        <div className="bg-slate-900/60 max-w-screen w-full h-screen max-h-screen flex flex-col items-center justify-center">
            <Toast {...toast} setToast={setToast} duration={10000} />
            <div className="w-80 sm:w-96 h-full flex flex-col gap-4 items-center justify-center p-5">
                <img
                    src="/img/logo/single-logo.png"
                    alt="single-logo"
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover"
                />
                <Form onSubmit={handleLogin}>
                    <Input
                        name="email"
                        placeholder="example@mail.com"
                        type="email"
                        text="Email"
                        className="text-white"
                    />
                    <InputPassword name="password" className="text-white" />
                    <button
                        type="submit"
                        className="w-full bg-amber-300 rounded-full px-4 py-2 text-white font-bold"
                    >
                        Login
                    </button>
                </Form>
                <div>
                    <p className="text-white text-sm font-thin">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/auth/register"
                            className="text-amber-300 font-normal"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-center justify-end h-1/6 pb-5">
                <ul className="text-white text-sm flex gap-2 ">
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>
                </ul>
                <p className="text-white text-sm">
                    © 2024. Daffa Tabiano. All rights reserved.
                </p>
            </div>
        </div>
    );
}
