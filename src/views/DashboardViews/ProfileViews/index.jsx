import { Icons } from '@/components/Icons';
import Toast from '@/components/ui/Toast';
import useAuth from '@/hooks/useAuth';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import useUpload from '@/hooks/useUpload';
import { SUB_EMPTY_PROFILE } from '@/services/SUB_DATA/data';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Input = (props) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="w-full gap-1 flex flex-col relative ">
            <label className="ps-2">{props.text}</label>
            <input
                type={props.type}
                name={props.name}
                className={`w-full rounded-full p-2 focus:outline-none ${
                    isActive ? 'cursor-text' : 'cursor-not-allowed opacity-50'
                }`}
                defaultValue={props?.defaultValue}
                disabled={isActive ? false : true}
            />
            <button
                onClick={() => setIsActive((curr) => !curr)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                type="button"
            >
                <Icons.Edit w={12} />
            </button>
        </div>
    );
};

const Tutorial = (props) => {
    return (
        <div className="flex gap-2 w-1/3 items-center">
            {/* <img
                            src="/vid/step-1.png"
                            alt=""
                            className={`rounded-lg absolute z-3 w-[200px]`}
                        /> */}
            <video className="rounded-lg" width={200} autoPlay controls loop>
                <source src={props?.video} type="video/mp4" />
            </video>
            <div>
                <p className="text-sm text-justify">{props.text}</p>
            </div>
        </div>
    );
};

export default function Profile() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [toast, setToast] = useState({});
    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { upload } = useUpload();
    const { logout } = useAuth();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const uploadFile = async (e) => {
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

    const editProfile = async (e) => {
        try {
            e.preventDefault();
            const body = {
                name: e.target.name.value,
                email: e.target.email.value,
                profilePictureUrl:
                    imageUrl.length > 0 ? imageUrl : data.profilePictureUrl,
                phoneNumber: e.target.phoneNumber.value,
            };
            const res = await post('update-profile', body, token);
            if (res.status === 200) {
                setToast({
                    variant: 'success',
                    title: 'Profile is changed',
                    message: res.data.message,
                    show: true,
                });
                setShowModal(false);
                setTimeout(() => {
                    getProfile();
                }, 3000);
            } else {
                setToast({
                    variant: 'error',
                    title: 'Edit Failed',
                    message: 'Something went wrong!',
                    show: true,
                });
            }
        } catch (err) {
            setToast({
                variant: 'error',
                title: 'Edit Failed',
                message: err?.response?.data?.message,
                show: true,
            });
        }
    };

    const getProfile = async () => {
        const res = await getData('user', token);
        setData(res?.data?.data);
    };

    const handleLogout = async () => {
        try {
            const res = await logout('logout', isToken);
            if (res.status === 200) {
                setToast({
                    variant: 'success',
                    title: 'Logout Success',
                    message: res.data.message,
                    show: true,
                });
                setTimeout(() => {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                    }
                    window.location.href = '/auth/login';
                }, 3000);
            }
        } catch (error) {
            setToast({
                variant: 'error',
                title: 'Logout Failed',
                message: error?.response?.data?.message,
                show: true,
            });
        }
    };

    useEffect(() => {
        getProfile();
    }, [token]);

    return (
        <div className="w-full h-full">
            <Toast setToast={setToast} {...toast} duration={3000} />
            {showModal && (
                <div
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/60 z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-1/2 h-[90%] bg-slate-100 rounded-lg overflow-hidden"
                    >
                        <div className="uppercase flex justify-between text-lg w-full bg-slate-400/40 text-stone-700 font-bold p-4">
                            <h1>edit profile</h1>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="p-2 rounded-full bg-slate-100 hover:bg-slate-400 hover:text-stone-800"
                            >
                                <Icons.Close w={'w-4'} />
                            </button>
                        </div>
                        <form
                            className="overflow-y-auto overflow-x-hidden w-full h-full flex flex-col gap-4 py-4 px-8"
                            onSubmit={editProfile}
                        >
                            <div className="w-full gap-1 flex flex-col mx-auto items-center  justify-center">
                                <label className="ps-2">Profile Picture</label>
                                <img
                                    src={
                                        imageUrl.length > 0
                                            ? imageUrl
                                            : data?.profilePictureUrl ||
                                              SUB_EMPTY_PROFILE
                                    }
                                    alt={`profile picture ${data?.name}`}
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                                <input
                                    type="file"
                                    name="profilePictureUrl"
                                    className="focus:outline-none file:hidden mt-2 cursor-pointer p-2 rounded-full bg-slate-300/80 text-white"
                                    onChange={uploadFile}
                                />
                            </div>
                            <Input
                                text="Name"
                                name="name"
                                type="text"
                                defaultValue={data?.name}
                            />
                            <Input
                                text="Email"
                                name="email"
                                type="email"
                                defaultValue={data?.email}
                            />
                            <Input
                                text="Phone Number"
                                type="number"
                                name="phoneNumber"
                                defaultValue={data?.phoneNumber}
                            />
                            <button
                                type="submit"
                                className="p-2 w-full bg-emerald-600 rounded-full mt-4 font-medium hover:bg-emerald-700 text-neutral-50"
                            >
                                Save Change
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <header className="bg-slate-50 h-[65%] shadow-md rounded-lg overflow-hidden relative">
                <div className="w-full">
                    <img
                        src="/img/general/dashboard.jpg"
                        alt="jumbotron-profile"
                        className="w-full h-52 object-cover object-center"
                    />
                </div>
                <div className="absolute w-[90%] px-4 h-1/3 flex justify-between rounded-lg bg-transparent backdrop-blur-sm top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md ">
                    <div className="flex items-center gap-4">
                        <img
                            src={data?.profilePictureUrl || SUB_EMPTY_PROFILE}
                            alt="profile"
                            className="w-20 h-20 my-auto object-cover rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-stone-800">
                                <span className="me-4 rounded-full bg-emerald-500 px-1 " />
                                {data?.name}{' '}
                            </p>
                            <p className="text-stone-500 font-normal text-sm italic">
                                {data?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setDropdown((curr) => !curr)}
                            className="p-4 rounded-full bg-slate-400/30 hover:bg-slate-400 text-white"
                        >
                            <Icons.ThreeDots w={24} />
                        </button>
                        {dropdown && (
                            <ul
                                className={`w-36 px-2 py-2 flex flex-col gap-2 absolute top-20 right-6 z-50 rounded-lg bg-stone-300 text-amber-950`}
                            >
                                <li className="w-full">
                                    <button
                                        onClick={() => {
                                            setShowModal(true);
                                            setDropdown(false);
                                        }}
                                        type="button"
                                        className="text-white w-full h-full rounded flex items-center gap-4 link p-2 hover:bg-stone-600/30 hover:text-stone-950"
                                    >
                                        <Icons className={'w-5 h-5'}>
                                            <Icons.Edit w={24} />
                                        </Icons>
                                        Edit
                                    </button>
                                </li>
                                <hr />
                                <li className="w-full">
                                    <button
                                        type="button"
                                        className={`${'text-red-600 hover:bg-red-600/30'} w-full h-full rounded flex items-center gap-4 link p-2 `}
                                        onClick={handleLogout}
                                    >
                                        <Icons className={'w-5 h-5'}>
                                            <Icons.Logout />
                                        </Icons>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className=" pt-20 pb-4 ps-7 pe-6 text-stone-600">
                    <h1 className="text-xl font-bold ">Dashboard Profile</h1>
                    <p className={`ps-1 mt-1`}>
                        Hello{' '}
                        <span className="font-medium italic uppercase">
                            {data?.name}
                        </span>
                        , Welcome to
                        <span className="bg-stone-300/30 hover:bg-stone-600/30 hover:cursor-default hover:text-stone-950 p-1 rounded-lg">
                            Dashboard Profile
                        </span>{' '}
                        is used to manage your account. you can edit your
                        profile here, with your{' '}
                        <span className="bg-stone-300/30 hover:bg-stone-600/30 hover:cursor-default hover:text-stone-950 p-1 rounded-lg">
                            {' '}
                            name, email, phone number, and also your picture
                            profile.
                        </span>{' '}
                        follow the steps below to edit your profile. and also
                        you can remove your account with the{' '}
                        <span className="bg-stone-300/30 hover:bg-stone-600/30 hover:cursor-default hover:text-stone-950 p-1 rounded-lg">
                            logout
                        </span>{' '}
                        button in three dots button{' '}
                        <span className="bg-stone-300/30 hover:bg-stone-600/30 hover:cursor-default hover:text-stone-950 p-1 rounded-lg">
                            {'(•••)'}
                        </span>{' '}
                        above.
                    </p>
                </div>
            </header>
            <section className="w-full my-3 py-2 bg-slate-50 h-[35%] shadow-md rounded-lg overflow-hidden relative">
                <h1 className="text-xl text-stone-600 font-bold ps-8">
                    Guide to Update Profile
                </h1>
                <div className="px-8 flex gap-2 w-full ">
                    <Tutorial
                        text={
                            <>
                                {' '}
                                Go to sidebar admin and click on profile bar,
                                then click three dots button{' '}
                                <span>{`(•••)`}</span> in the top right corner
                                and select edit profile.
                            </>
                        }
                        video="/vid/step-1.mp4"
                    />
                    <Tutorial
                        text={
                            <>
                                Click edit profile and you can see your data
                                profile, and the form is disable first, you
                                should click right corner, and edit with you
                                want
                            </>
                        }
                        video="/vid/step-2.mp4"
                    />
                    <Tutorial
                        text={
                            <>
                                Also if you want change the profile picture, you
                                can upload file with terms max.1mb, and format
                                {'(.jpg,.png,.jpeg'} if you finish, you could
                                click Save Change.
                            </>
                        }
                        video="/vid/step-3.mp4"
                    />
                </div>
            </section>
        </div>
    );
}
