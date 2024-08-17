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
        <div className="bg-slate-900/60 max-w-screen w-full h-full md:min-h-screen md:max-h-screen flex flex-col items-center justify-center">
            <Toast {...toast} setToast={setToast} duration={10000} />
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-5">
                <div className="flex flex-col w-full  justify-center items-center">
                    <img
                        src="/img/logo/sec-logo-2.png"
                        alt="single-logo"
                        className="w-3/4 sm:w-24 md:w-40 h-min object-cover"
                    />
                    <h3 className="flex flex-col mt-2 text-center justify-center font-bold text-xl text-amber-300">
                        SIGN UP{' '}
                        <span className="text-sm font-light text-white italic">
                            Create your account and to be part of us
                        </span>
                    </h3>
                </div>
                <Form onSubmit={handleRegister}>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className=" flex flex-col gap-3">
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
                        <div className="flex flex-col gap-3">
                            <Input
                                name="phoneNumber"
                                placeholder="+62 123 xxx xxxx"
                                type="number"
                                text="Phone"
                            />
                            <InputImage />
                        </div>
                    </div>
                    <p className="text-amber-300 italic">
                        * Default Role is USER, contact ADMIN for change role
                    </p>
                    <button
                        type="submit"
                        className="w-full bg-amber-300 rounded-full px-4 py-2 text-white font-bold"
                    >
                        Register
                    </button>
                </Form>
                <div>
                    <p className="text-white text-sm font-thin">
                        Already have an account?{' '}
                        <Link
                            href="/auth/login"
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
