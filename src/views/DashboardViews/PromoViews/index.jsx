import useGet from '@/hooks/useGet';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import usePost from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import ReusableDashboardActions from '@/views/DashboardViews/reusable';

export default function Promo() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const md = useMediaQuery('(min-width: 768px)');
    const [sort, setSort] = useState('sort');
    const [toast, setToast] = useState({});

    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

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

    const getPromos = async () => {
        const res = await getData('promos', token);
        setData(res.data.data);
    };

    useEffect(() => {
        getPromos();
    }, [token]);


    return (
        <ReusableDashboardActions
            title="promo"
            variant="rose"
            handleSort={handleSort}
            sort={sort}
            // refetch={getPromos()}
            data={data}
            setSort={setSort}
        />
    );
}
