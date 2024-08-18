import AuthFooter from '@/components/Footers/AuthFooter';
import Form from '@/components/forms';
import Input, { InputImage, InputPassword } from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import useAuth from '@/hooks/useAuth';
import useUpload from '@/hooks/useUpload';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterViews() {
    const { auth } = useAuth();
    const { upload } = useUpload();
    const [toast, setToast] = useState({});
    const { push } = useRouter();
    const [imageUrl, setImageUrl] = useState('');

    const changeFile = (e) => {
        const file = e.target.files[0];

        if (!file.type.startsWith('image')) {
            setToast({
                variant: 'error',
                title: 'Upload Failed',
                message: 'Format file should be .jpg/.png/.jpeg/.gif/.svg',
                show: true,
            });
            return;
        }

        if (file.size > 1000000) {
            setToast({
                variant: 'error',
                title: 'Too big size',
                message: `Maximum upload 1 MB , your file size ${file.size}`,
                show: true,
            });
            return;
        } else {
            setTimeout(async () => {
                const newFile = new FormData();
                newFile.append('image', file);

                await upload('upload-image', newFile)
                    .then((res) => {
                        console.log(res);
                        setToast({
                            variant: 'success',
                            title: 'Upload Success',
                            message:
                                'Your profile picture success to be applied',
                            show: true,
                        });
                        setImageUrl(res.data.url);
                        setTimeout(() => {
                            push('/auth/login');
                        }, 3000);
                    })
                    .catch((err) => {
                        setToast({
                            variant: 'error',
                            title: 'Upload Failed',
                            message: err?.response?.message?.data,
                            show: true,
                        });
                    });
            }, 1000);
        }
    };

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
            const res = await auth('register', body);
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

    const removePicture = () => {
        setImageUrl({});
        setToast({
            variant: 'success',
            title: 'Success',
            message: 'Picture success to remove',
            show: true,
        });
    };

    return (
        <div className="bg-slate-900/60 max-w-screen w-full h-full md:min-h-screen flex flex-col items-center justify-center">
            <Toast {...toast} setToast={setToast} duration={6000} />
            <div className="w-full h-full sm:w-4/5 lg:w-2/3 flex flex-col gap-2 items-center justify-center p-5">
                <div className="flex flex-col w-full  justify-center items-center">
                    <img
                        src="/img/logo/sec-logo-2.png"
                        alt="single-logo"
                        className="w-3/4 sm:w-24 md:w-40 h-min object-cover"
                    />
                    <h3 className="flex flex-col mt-2 text-center justify-center font-bold text-xl md:text-2xl text-amber-300">
                        SIGN UP{' '}
                        <span className="text-sm font-light text-white italic">
                            Create your account and to be part of us
                        </span>
                    </h3>
                </div>
                <Form onSubmit={handleRegister}>
                    <div className="flex flex-col sm:flex-row gap-4 my-6">
                        <div className=" flex flex-col gap-3 sm:w-1/2">
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
                        <div className="flex flex-col gap-3 sm:w-1/2">
                            <Input
                                name="phoneNumber"
                                placeholder="+62 123 xxx xxxx"
                                type="number"
                                text="Phone"
                            />
                            <InputImage
                                onChange={changeFile}
                                image={imageUrl}
                                clear={removePicture}
                            />
                        </div>
                    </div>
                    <p className="text-amber-300 italic text-sm sm:mx-auto  -mb-2 opacity-75">
                        * Default Role is USER, contact ADMIN for change role
                    </p>
                    <button
                        type="submit"
                        className="w-full bg-amber-300 rounded-full px-4 py-2 sm:w-1/2 sm:mx-auto text-white font-bold"
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
            <div className="flex flex-col mt-2 gap-1 text-center justify-end h-1/6 pb-2 sm:pb-0">
                <AuthFooter />
            </div>
        </div>
    );
}
