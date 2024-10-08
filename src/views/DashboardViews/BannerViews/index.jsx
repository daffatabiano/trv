import { InputImagePoster } from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import useUpload from '@/hooks/useUpload';
import { useRouter } from 'next/navigation';
import { useRouter as router } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SUBT_EMPTY_IMAGE } from '@/services/SUB_DATA/data';
import ReusableDashboardActions from '@/views/DashboardViews/reusable';
import ModalDelete from '@/components/ui/Modals/modal-delete';

export default function Banner() {
  const { getData } = useGet();
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [sort, setSort] = useState('sort');

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
    <ReusableDashboardActions
      title="banner"
      variant="amber"
      handleSort={handleSort}
      sort={sort}
      data={data}
      setSort={setSort}
      slug="banner"
    />
  );
}

export const AddBanners = () => {
  const { post } = usePost();
  const [imageUrl, setImageUrl] = useState('');
  const [bannerName, setBannerName] = useState('');
  const [toast, setToast] = useState({});
  const { upload } = useUpload();
  const [token, setToken] = useState('');
  const [hoverActive, setHoverActive] = useState(false);

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
    if (imageUrl.length > 0) {
      setImageUrl({});
      setToast({
        variant: 'success',
        title: 'Image Removed',
        message: 'Banners picture success to removed!',
        show: true,
      });
    } else {
      setToast({
        variant: 'error',
        title: 'No Image Found',
        message: 'Please upload image first',
        show: true,
      });
    }
  };

  const handleHover = () => {
    setHoverActive(!hoverActive);
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
        }}>
        <div className="relative">
          <div
            onClick={handleHover}
            className="md:w-1/3 w-[90%] m-auto bg-white rounded-3xl flex flex-col justify-start h-48 items-center pb-6 absolute inset-0 -translate-y-48 pt-8">
            <div className="w-full justify-between px-4 text-center text-2xl flex font-bold text-amber-800">
              <h1>Add New Banner Form</h1>
              <button
                type="button"
                onClick={() => window.history.back()}
                className={`bg-transparent text-amber-800 text-sm font-light hover:underline underline-offset-4`}>
                ← Back
              </button>
            </div>
          </div>
          <div
            className={`md:w-1/3 w-[90%] m-auto bg-slate-100 rounded-3xl flex flex-col h-[435px] items-center p-4 absolute inset-0 ${
              hoverActive || 'hover:' ? 'translate-y-2' : ''
            } -translate-y-10 transition-all`}>
            {imageUrl.length > 0 ? (
              <img
                src={imageUrl}
                alt="banner"
                className="w-full h-[35%] object-cover object-center rounded-3xl border border-dashed border-amber-400"
              />
            ) : (
              <div className="w-full relative bg-white text-amber-400 border-amber-400 h-[35%] overflow-hidden border border-dashed rounded-3xl flex justify-center items-center py-4">
                <p>📎</p>
                <p>Attach your files</p>
                <input
                  type="file"
                  onChange={(e) => uploadFile(e)}
                  className="absolute w-full h-full opacity-1 py-4 flex justify-center items-center opacity-0"
                />
              </div>
            )}
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => removeImage()}
                className="bg-transparent underlined text-md p-2 underlined text-rose-600">
                clear
              </button>
            </div>
            <div className="flex w-full mt-4 flex-col gap-2">
              <label htmlFor="banner-name">Banner Name</label>
              <input
                onChange={(e) => setBannerName(e.target.value)}
                type="text"
                placeholder="Banner Name"
                className="w-full p-4 rounded-3xl border border-amber-300/80 focus:border-amber-400 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => addBanners()}
              className="w-full p-4 font-bold text-white bg-amber-400 rounded-3xl mt-8">
              Add Banner
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const UpdateBanners = () => {
  const { post } = usePost();
  const [bannerName, setBannerName] = useState('');
  const [toast, setToast] = useState({});
  const { upload } = useUpload();
  const [token, setToken] = useState('');
  const { query } = router();
  const { getData } = useGet();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const getBanner = async () => {
    const res = await getData(`banner/${query?.slug}`, token);
    setData(res?.data?.data);
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, query?.slug]);

  const [imageUrl, setImageUrl] = useState('');

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

  const updateBanners = async () => {
    const body = {
      name: bannerName,
      imageUrl: imageUrl?.length > 0 ? imageUrl : data?.imageUrl,
    };

    const res = await post(`update-banner/${query?.slug}`, body, token);
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
    <div className="bg-amber-200/80 w-full h-screen flex flex-col justify-center">
      <Toast {...toast} duration={3000} setToast={setToast} />
      <ModalDelete title="banner" show={show} setShow={setShow} id={data?.id} />
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
        }}>
        <div className="w-1/2 m-auto bg-amber-300/50 shadow-md shadow-amber-600 p-4 rounded-lg flex flex-col justify-center relative">
          <button
            type="button"
            onClick={() => (window.location.href = '/dashboard/banner')}
            className="flex items-center py-2 px-6 font-bold rounded-full text-white bg-amber-700/70 absolute left-4 top-4">
            Back
          </button>
          <div className="w-full text-center text-2xl font-bold text-amber-800">
            <h1>Update Banner </h1>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <div className="w-full flex justify-center">
              <InputImagePoster
                src={imageUrl?.length > 0 ? imageUrl : data?.imageUrl}
                onChange={() => uploadFile()}
                clear={() => removeImage()}
              />
            </div>
            <div className="flex flex-col text-center text-white font-medium">
              <label htmlFor="">Banner name</label>
              <input
                className="w-full rounded-full p-2 focus:outline-none text-amber-600 text-center"
                type="text"
                onChange={(e) => setBannerName(e?.target?.value)}
                defaultValue={data?.name}
              />
            </div>
            <div className="flex gap-2 items-center mt-4">
              <button
                type="button"
                onClick={() => updateBanners()}
                className="flex items-center py-2 px-6 font-bold rounded-full bg-amber-600 text-amber-800 hover:bg-amber-700 hover:translate-y-1">
                Save Change
              </button>
              <p className="text-amber-800">| or |</p>
              <button
                type="button"
                onClick={() => setShow(true)}
                className="flex items-center py-2 px-6 font-bold rounded-full  bg-rose-600 text-rose-800 hover:bg-rose-700 hover:translate-y-1">
                Delete Banner
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
