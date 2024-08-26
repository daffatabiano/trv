import { Icons } from '@/components/Icons';
import { InputImage, InputImagePoster } from '@/components/ui/Input';
import { BorderAnimation } from '@/components/ui/moving-borders';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    }, [token]);
    return (
        <div className="rounded-lg overflow-hidden flex flex-col gap-4 w-full h-full">
            <div className="w-full flex justify-between p-2 h-[15%] bg-amber-300 shadow-lg shadow-stone-400/70">
                <div className="flex flex-col p-2 w-[60%]">
                    <h1 className="text-3xl text-amber-700 font-bold ">
                        Banner Control
                    </h1>
                    <p className="ps-2 italic text-amber-700">
                        “Banner control that allows you to easily add, update,
                        or remove banners on your web pages.”
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
            <div className="bg-amber-300 w-full h-[85%] "></div>
        </div>
    );
}

export const AddBanners = (props) => {
    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState({});
    const [bannerName, setBannerName] = useState('');
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
    const addBanners = async () => {
        const body = {
            name: bannerName,
            imageUrl: imageUrl,
        };

        const res = await post('create-banner', body, token);
        console.log(res);
    };

    const removeImage = async () => {
        setImageUrl({});
        console.log('image has been remove');
    };

    return (
        <div className="bg-amber-300 w-full h-screen flex flex-col">
            <div className="w-1/2 m-auto">
                <div className="w-full text-2xl font-bold text-amber-800">
                    <h1>Add New Banner Form</h1>
                </div>
                <div>
                    <div>
                        <InputImagePoster
                            image={imageUrl}
                            onChange={uploadFile}
                            clear={removeImage}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Banner name</label>
                        <input
                            type="text"
                            onChange={(e) => setBannerName(e?.target?.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
