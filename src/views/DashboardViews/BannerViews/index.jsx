import { Icons } from '@/components/Icons';
import { FocusCards } from '@/components/ui/Cards/focus-card';
import { InputImage, InputImagePoster } from '@/components/ui/Input';
import { BorderAnimation } from '@/components/ui/moving-borders';
import Toast from '@/components/ui/Toast';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import useUpload from '@/hooks/useUpload';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/styles/scrollbar/scrollbar.module.scss';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Banner() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [sort, setSort] = useState('sort');
    const { push } = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBanner = async () => {
        const res = await getData('banners', token);
        setData(res.data.data);
    };

    const handleSort = () => {
        setSort((value) => {
            if (value === 'sort') {
                return 'newest';
            } else if (value === 'newest') {
                return 'oldest';
            } else if (value === 'oldest') {
                return 'newest';
            }
        });
    };

    useEffect(() => {
        getBanner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="rounded-lg overflow-hidden flex flex-col gap-4 w-full h-full">
            <div className="w-full flex justify-between p-2 h-[15%] bg-amber-300 shadow-lg shadow-stone-400/70">
                <div className="flex flex-col p-2 w-[60%]">
                    <h1 className="text-3xl text-amber-700 font-bold ">
                        Banner Control
                    </h1>
                    <p className="ps-2 italic text-amber-700">
                        “Banner control that allows you to easily{' '}
                        <span
                            className="text-amber-700
bg-amber-200/50 p-1 rounded-lg"
                        >
                            add, update, or remove
                        </span>{' '}
                        banners on your web pages.”
                    </p>
                </div>
                <div className="flex items-center justify-between px-2 w-[40%] py-2 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="flex gap-2 text-amber-700"
                                onClick={handleSort}
                            >
                                {sort ? (
                                    sort === 'newest' ? (
                                        <Icons.CalendarArrowUp w={24} />
                                    ) : (
                                        <Icons.CalendarArrowDown w={24} />
                                    )
                                ) : (
                                    <Icons.Calendar w={24} />
                                )}
                                {sort}
                            </button>
                            <button
                                type="button"
                                onClick={() => setSort('sort')}
                                className="w-8 h-8 p-2 rounded-full text-amber-700 bg-amber-200/50 flex justify-center items-center"
                            >
                                <Icons.Refresh w={18} />
                            </button>
                        </div>
                        <button
                            type="button"
                            className="text-amber-700 h-fit w-fit bg-amber-200/50 p-2 rounded-lg flex gap-2"
                            onClick={() => push('/dashboard/banner/add')}
                        >
                            <Icons.Add w={24} />
                            Add New
                        </button>
                    </div>
                    <BorderAnimation
                        borderRadius="1.75rem"
                        className={`w-full py-2 capitalize px-4 rounded-lg flex justify-between bg-amber-400/30 text-amber-600 `}
                        borderClassName={
                            'bg-[radial-gradient(var(--amber-600)_40%,transparent_60%)]'
                        }
                    >
                        <span className={`font-extrabold pe-2 text-amber-700 `}>
                            • {data?.length}{' '}
                        </span>{' '}
                        Banners Total
                    </BorderAnimation>
                </div>
            </div>
            <div
                className={cn(
                    `bg-amber-300  p-4 w-full h-[85%] overflow-y-auto`,
                    styles['scrollbar-banners']
                )}
            >
                <FocusCards cards={data} variant={'amber'} />
            </div>
        </div>
    );
}

export const AddBanners = () => {
    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState({});
    const [bannerName, setBannerName] = useState('');
    const [toast, setToast] = useState({});
    const { upload } = useUpload();
    const [token, setToken] = useState('');

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
                        setToast({
                            variant: 'success',
                            title: 'Upload Success',
                            message: 'Your Banner image success to be applied',
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
    const addBanners = async () => {
        const body = {
            name: bannerName,
            imageUrl: imageUrl,
        };

        const res = await post('create-banner', body, token);
        if (res?.status === 200) {
            setToast({
                variant: 'success',
                title: 'Banner Added',
                message: 'Banner success to be added!',
                show: true,
            });
            setTimeout(() => {
                window.location.href = '/dashboard/banner';
            }, 3000);
        } else {
            setToast({
                variant: 'error',
                title: 'Upload Failed',
                message: 'Something went wrong!',
                show: true,
            });
        }
    };

    const removeImage = async () => {
        setImageUrl({});
        setToast({
            variant: 'success',
            title: 'Image Removed',
            message: 'Banners picture success to removed!',
            show: true,
        });
    };

    return (
        <div className="bg-amber-300/80 w-full h-screen flex flex-col justify-center">
            <Toast {...toast} duration={3000} setToast={setToast} />
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: 'spring',
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001,
                    },
                }}
            >
                <div className="w-1/2 m-auto bg-amber-500/50 shadow-md shadow-amber-600 p-4 rounded-lg flex flex-col justify-center relative">
                    <button
                        type="button"
                        onClick={() =>
                            (window.location.href = '/dashboard/banner')
                        }
                        className="flex items-center py-2 px-6 font-bold rounded-full text-white bg-amber-700/70 absolute left-4 top-4"
                    >
                        Back
                    </button>
                    <div className="w-full text-center text-2xl font-bold text-amber-800">
                        <h1>Add New Banner Form</h1>
                    </div>
                    <div className="flex flex-col justify-center gap-2 items-center">
                        <div className="w-full flex justify-center">
                            <InputImagePoster
                                image={imageUrl}
                                onChange={uploadFile}
                                clear={removeImage}
                            />
                        </div>
                        <div className="flex flex-col text-center text-white font-medium">
                            <label htmlFor="">Banner name</label>
                            <input
                                className="w-full rounded-full p-2 focus:outline-none text-amber-600 text-center"
                                type="text"
                                onChange={(e) =>
                                    setBannerName(e?.target?.value)
                                }
                            />
                        </div>
                        <button
                            type="button"
                            onClick={addBanners}
                            className="flex items-center py-2 px-6 font-bold rounded-full bg-white"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
