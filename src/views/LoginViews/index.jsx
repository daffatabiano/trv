import Form from '@/components/forms';
import Button from '@/components/ui/Button';
import Input, { InputPassword } from '@/components/ui/Input';

export default function Login() {
    return (
        <div className="bg-slate-900/60 w-screen h-screen flex flex-col items-center justify-center">
            <div className="w-80 h-full flex flex-col gap-4 items-center justify-center p-5">
                <img
                    src="/img/logo/single-logo.png"
                    alt="single-logo"
                    className="w-16 h-16 object-cover"
                />
                <Form>
                    <Input
                        name="email"
                        placeholder="example@mail.com"
                        type="email"
                    />
                    <InputPassword />
                    <button className="w-full bg-amber-300 rounded-full px-4 py-2 text-white font-bold">
                        Login
                    </button>
                </Form>
            </div>
            <div className="flex flex-col gap-2 text-center justify-end h-1/6 pb-5">
                <ul className="text-white text-sm flex gap-2 ">
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>
                </ul>
                <p className="text-white text-sm">
                    © 2022. Acet Labs. All rights reserved.
                </p>
            </div>
        </div>
    );
}
