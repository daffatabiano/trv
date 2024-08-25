import { Icons } from '@/components/Icons';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useEffect, useState } from 'react';

export default function Banner() {
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

    const getBanner = async () => {
        const res = await getData('banners', token);
        setData(res.data.data);
    };

    useEffect(() => {
        getBanner();
    }, [token]);
    return (
        <div className="bg-amber-300 w-full h-full">
            <div className="w-full flex justify-between h-[20%] bg-amber-300/80">
                <h1 className="text-3xl text-amber-700">Banner Control</h1>
                <div className="flex">
                    <button className="text-amber-700 bg-amber-300/60 p-2 rounded-lg">
                        <Icons.Add w={24} />
                        Add
                    </button>
                </div>
            </div>
            <div className="bg-amber-300/45 w-full h-[80%] "></div>
        </div>
    );
}
