import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import ReusableDashboardActions from '@/views/DashboardViews/reusable';
import Toast from '@/components/ui/Toast';
import { InputImagePoster } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import useUpload from '@/hooks/useUpload';
import { SUBT_EMPTY_IMAGE } from '@/services/SUB_DATA/data';

export default function Activity() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');

    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState({});

    const [sort, setSort] = useState('sort');

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

    const getActivity = async () => {
        const res = await getData('activities', token);
        setData(res.data.data);
    };

    useEffect(() => {
        getActivity();
    }, [token]);

    return (
        <ReusableDashboardActions
            title="activity"
            variant="slate"
            handleSort={handleSort}
            sort={sort}
            // refetch={getPromos()}
            data={data}
            setSort={setSort}
        />
    );
}

export const AddActivity = () => {
    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState({});
    const [toast, setToast] = useState({});
    const { upload } = useUpload();
    const [token, setToken] = useState('');
    const [category, setCategory] = useState([]);
    const { getData } = useGet();

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

    const addActivity = async (e) => {
        const body = {
            categoryId: e.target?.categoryId?.value,
            title: e?.target?.title?.value,
            description: e?.target?.description?.value,
            imageUrls: imageUrl,
            price: e?.target?.price?.value,
            price_discount: e?.target?.price_discount?.value,
            total_reviews: e?.target?.total_reviews?.value,
            facilties: <p>e?.target?.facilities?.value</p>,
            address: e?.target?.address?.value,
            provincy: e?.target?.provincy?.value,
            city: e?.target?.location_maps?.value,
            location_maps: e?.target?.location_maps?.value,
        };

        const res = await post('create-activity', body, token);
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
            message: 'Activity picture success to removed!',
            show: true,
        });
    };

    const getCategory = async () => {
        const res = await getData('categories', token);
        setCategory(res.data.data);
    };
    useEffect(() => {
        getCategory();
    }, [token]);

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
                                image={
                                    imageUrl?.length > 0
                                        ? imageUrl
                                        : SUBT_EMPTY_IMAGE
                                }
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
                            onClick={addActivity}
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
