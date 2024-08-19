import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useState, useEffect } from 'react';

export default function Profile(props) {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [toast, setToast] = useState({});
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
        <div className="bg-slate-500">
            <h1>Profile</h1>
        </div>
    );
}
