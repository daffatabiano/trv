import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useEffect, useState } from 'react';

export default function Activity() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');

    const { post } = usePost();
    const [imageUrl, setImageUrl] = useState({});

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

    console.log(data);

    useEffect(() => {
        getActivity();
    }, [token]);

    return (
        <div>
            <h1>Activity</h1>
        </div>
    );
}
