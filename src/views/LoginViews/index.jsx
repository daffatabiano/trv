import Form from '@/components/forms';
import Button from '@/components/ui/Button';
import Input, { InputPassword } from '@/components/ui/Input';

export default function Login() {
    return (
        <div className="bg-slate-900/60 w-screen h-screen flex items-center justify-center">
            <div className="w-80 h-80 flex flex-col gap-4 items-center justify-center p-5">
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
        </div>
    );
}
