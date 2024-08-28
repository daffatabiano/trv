import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import ReusableDashboardActions from '@/views/DashboardViews/reusable';

export default function Category() {
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

    const getCategory = async () => {
        const res = await getData('categories', token);
        setData(res.data.data);
    };

    useEffect(() => {
        getCategory();
    }, [token]);

    return (
        <ReusableDashboardActions
            title="Category"
            variant="emerald"
            handleSort={handleSort}
            sort={sort}
            // refetch={getPromos()}
            data={data}
            setSort={setSort}
        />
    );
}
