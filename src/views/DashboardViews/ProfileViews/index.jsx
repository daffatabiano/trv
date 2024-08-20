import { Icons } from '@/components/Icons';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { SUB_EMPTY_PROFILE } from '@/services/SUB_DATA/data';
import { useState, useEffect } from 'react';

export default function Profile(props) {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [toast, setToast] = useState({});
    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState({});
    const [dropdown, setDropdown] = useState(false);

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
                profilePictureUrl: imageUrl,
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
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setToast({
                    variant: 'error',
                    title: 'Edit Failed',
                    message: res.response.data.message,
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


    useEffect(() => {
        getProfile();
    }, [token]);

    return (
        <div className="w-full h-full">
            <header className="bg-slate-50 shadow-md rounded-lg overflow-hidden relative">
                <div className="w-full">
                    <img
                        src="/img/general/dashboard.jpg"
                        alt="jumbotron-profile"
                        className="w-full h-52 object-cover object-center"
                    />
                </div>
                <div className="absolute w-[90%] px-4 h-1/3 flex justify-between rounded-lg bg-transparent backdrop-blur-sm top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md ">
                    <div className="flex items-center gap-4">
                        <img
                            src={data?.profilePictureUrl || SUB_EMPTY_PROFILE}
                            alt="profile"
                            className="w-20 h-20 my-auto object-cover rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-stone-800">
                                {data?.name}
                            </p>
                            <p className="text-stone-500 font-normal text-sm italic">
                                {data?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => setDropdown((curr) => !curr)}
                            className="p-4 rounded-full bg-slate-400/30 hover:bg-slate-400 text-white"
                        >
                            <Icons.ThreeDots w={24} />
                        </button>
                    </div>
                </div>
                <div className="px-2 pt-16 text-stone-600">
                    <h1 className="text-xl font-bold ps-6">
                        Dashboard Profile
                    </h1>
                </div>
            </header>
            <main></main>
        </div>
    );
}
