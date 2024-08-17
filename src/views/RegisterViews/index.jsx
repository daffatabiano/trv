import Form from '@/components/forms';
import Input, { InputImage, InputPassword } from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterViews() {
    const { login } = useAuth();
    const [toast, setToast] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();

        const body = {
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value,
            passwordRepeat: e.target.passwordRepeat.value,
            phoneNumber: e.target.phoneNumber.value,
            profilePictureUrl: imageUrl,
            role: 'user',
        };

        try {
            const res = await login('register', body);
            if (res.status === 200) {
                setToast({
                    variant: 'success',
                    title: 'Register successful',
                    message: res.data.message,
                    show: true,
                });
            } else {
                setToast({
                    variant: 'error',
                    title: 'Register is Fail',
                    message: 'Something went wrong!',
                    show: true,
                });
            }
        } catch (err) {
            setToast({
                variant: 'error',
                title: 'Register Fail',
                message: err.response.data.message,
                show: true,
            });
        }
    };

    return (
        <div className="bg-slate-900/60 max-w-screen w-full h-screen max-h-screen flex flex-col items-center justify-center">
            <Toast {...toast} setToast={setToast} duration={10000} />
            <div className="w-80 h-full flex flex-col gap-4 items-center justify-center p-5">
                <div className="flex flex-col w-full">
                    <img
                        src="/img/logo/sec-logo.png"
                        alt="single-logo"
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover"
                    />
                    <h3 className="flex flex-col text-start justify-start font-bold text-amber-300">
                        Register{' '}
                        <span className="text-sm font-light text-white italic">
                            Create your account and to be part of us
                        </span>
                    </h3>
                </div>
                <Form onSubmit={handleRegister}>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                            <Input
                                name="email"
                                placeholder="example@mail.com"
                                type="email"
                                text="Email"
                            />
                            <Input
                                name="name"
                                placeholder="Your Name"
                                type="text"
                                text="Name"
                            />

                            <InputPassword name="password" />
                            <InputPassword name="passwordRepeat" />
                        </div>
                        <div>
                            <Input
                                name="phoneNumber"
                                placeholder="+62 123 xxx xxxx"
                                type="number"
                                text="Phone"
                            />
                            <InputImage />
                            <p className="text-amber-300 italic">
                                * Default Role is USER, contact ADMIN for change
                                role
                            </p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-amber-300 rounded-full px-4 py-2 sm:p-4 text-white font-bold"
                    >
                        Register
                    </button>
                </Form>
                <div>
                    <p className="text-white text-sm font-thin">
                        Already have an account?{' '}
                        <Link
                            href="/auth/signup"
                            className="text-amber-300 font-normal"
                        >
                            Sign In
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
