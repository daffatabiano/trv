import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import ReusableDashboardActions from '@/views/DashboardViews/reusable';
import useUpload from '@/hooks/useUpload';
import Toast from '@/components/ui/Toast';
import { InputImagePoster } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import ModalDelete from '@/components/ui/Modals/modal-delete';
import { useRouter } from 'next/router';
import {
  SUB_EMPTY_IMAGE_PROMO,
  SUBT_EMPTY_IMAGE,
} from '@/services/SUB_DATA/data';

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
            setToast({
              variant: 'success',
              title: 'Upload Success',
              message: 'Your profile picture success to be applied',
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
      title="category"
      variant="emerald"
      handleSort={handleSort}
      sort={sort}
      // refetch={getPromos()}
      data={data}
      setSort={setSort}
      slug="category"
    />
  );
}

export const AddCategory = () => {
  const { post } = usePost();
  const [imageUrl, setImageUrl] = useState({});
  const [toast, setToast] = useState({});
  const { upload } = useUpload();
  const [token, setToken] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
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
              message: 'Your Category image success to be applied',
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

  const addCategory = async (e) => {
    const body = {
      name: categoryName,
      imageUrl: imageUrl,
    };

    const res = await post('create-category', body, token);
    if (res?.status === 200) {
      setToast({
        variant: 'success',
        title: 'Category Added',
        message: 'Category success to be added!',
        show: true,
      });
      setTimeout(() => {
        window.location.href = '/dashboard/category';
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
      message: 'Category picture success to removed!',
      show: true,
    });
  };

  const handleHover = () => {
    setHoverActive(!hoverActive);
  };

  return (
    <div className="bg-emerald-300/80 w-full h-screen flex flex-col justify-center">
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
          <div className="md:w-1/3 w-[90%] m-auto bg-white rounded-3xl flex flex-col justify-start h-48 items-center pb-6 absolute inset-0 -translate-y-48 pt-8">
            <div className="w-full justify-between px-4 text-center text-2xl flex font-bold text-emerald-800">
              <h1>Add New category Form</h1>
              <button
                type="button"
                onClick={() => window.history.back()}
                className={`bg-transparent text-emerald-800 text-sm font-light hover:underline underline-offset-4`}>
                ← Back
              </button>
            </div>
          </div>
          <div
            onMouseHover={handleHover}
            className={`md:w-1/3 w-[90%] m-auto bg-slate-100 rounded-3xl flex flex-col h-[435px] items-center p-4 absolute inset-0 ${
              hoverActive || 'hover:' ? 'translate-y-2' : ''
            } -translate-y-10 transition-all`}>
            {imageUrl.length > 0 ? (
              <img
                src={imageUrl}
                alt="category"
                className="w-full h-[35%] object-cover object-center rounded-3xl border border-dashed border-emerald-400"
              />
            ) : (
              <div className="w-full relative bg-white text-emerald-400 border-emerald-400 h-[35%] overflow-hidden border border-dashed rounded-3xl flex justify-center items-center py-4">
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
              <label htmlFor="category-name">category Name</label>
              <input
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                placeholder="category Name"
                className="w-full p-4 rounded-3xl border border-emerald-300/80 focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => addCategory()}
              className="w-full p-4 font-bold text-white bg-emerald-400 rounded-3xl mt-8">
              Add category
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const UpdateCategory = () => {
  const { post } = usePost();
  const [categoryName, setCategoryName] = useState('');
  const [toast, setToast] = useState({});
  const { upload } = useUpload();
  const [token, setToken] = useState('');
  const { query } = useRouter();
  const { getData } = useGet();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const getcategory = async () => {
    const res = await getData(`category/${query?.slug}`, token);
    setData(res?.data?.data);
  };

  useEffect(() => {
    getcategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, query?.slug]);

  const uploadFile = async (e) => {
    const file = e.target.files[0];

    if (!file?.type.startsWith('image')) {
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
              message: 'Your Category image success to be applied',
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

  const updateCategory = async () => {
    const body = {
      name: categoryName,
      imageUrl: imageUrl || data?.imageUrl,
    };

    const res = await post(`update-category/${query?.slug}`, body, token);
    if (res?.status === 200) {
      setToast({
        variant: 'success',
        title: 'Category Updated',
        message: 'Category success to be updated!',
        show: true,
      });
      setTimeout(() => {
        window.location.href = '/dashboard/category';
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
      message: 'Category picture success to removed!',
      show: true,
    });
  };

  return (
    <div className="bg-emerald-300/80 w-full h-screen flex flex-col justify-center">
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
            <div className="w-full justify-between px-4 text-center text-2xl flex font-bold text-emerald-800">
              <h1>Add New category Form</h1>
              <button
                type="button"
                onClick={() => window.history.back()}
                className={`bg-transparent text-emerald-800 text-sm font-light hover:underline underline-offset-4`}>
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
                alt="category"
                className="w-full h-[35%] object-cover object-center rounded-3xl border border-dashed border-emerald-400"
              />
            ) : (
              <div className="w-full relative bg-white text-emerald-400 border-emerald-400 h-[35%] overflow-hidden border border-dashed rounded-3xl flex justify-center items-center py-4">
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
              <label htmlFor="category-name">category Name</label>
              <input
                onChange={(e) => setcategoryName(e.target.value)}
                type="text"
                placeholder="category Name"
                className="w-full p-4 rounded-3xl border border-emerald-300/80 focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => addcategorys()}
              className="w-full p-4 font-bold text-white bg-emerald-400 rounded-3xl mt-8">
              Add category
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
