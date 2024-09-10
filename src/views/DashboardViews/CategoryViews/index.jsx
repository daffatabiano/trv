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
        <div className="w-1/2 m-auto bg-emerald-500/50 shadow-md shadow-emerald-600 p-4 rounded-lg flex flex-col justify-center relative">
          <button
            type="button"
            onClick={() => (window.location.href = '/dashboard/category')}
            className="flex items-center py-2 px-6 font-bold rounded-full text-white bg-emerald-700/70 absolute left-4 top-4">
            Back
          </button>
          <div className="w-full text-center text-2xl font-bold text-emerald-800">
            <h1>Add New Category Form</h1>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <div className="w-full flex justify-center">
              <InputImagePoster
                src={imageUrl?.length > 0 ? imageUrl : SUB_EMPTY_IMAGE_PROMO}
                onChange={uploadFile}
                clear={removeImage}
              />
            </div>
            <div className="flex flex-col text-center text-white font-medium">
              <label htmlFor="">Category name</label>
              <input
                className="w-full rounded-full p-2 focus:outline-none text-emerald-600 text-center"
                type="text"
                onChange={(e) => setCategoryName(e?.target?.value)}
              />
            </div>
            <button
              type="button"
              onClick={addCategory}
              className="flex items-center py-2 px-6 font-bold rounded-full bg-white">
              Add
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

  const getBanner = async () => {
    const res = await getData(`category/${query?.slug}`, token);
    setData(res?.data?.data);
  };

  useEffect(() => {
    getBanner();
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
      <ModalDelete
        show={show}
        setShow={setShow}
        id={query?.slug}
        title="category"
      />
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
        <div className="w-1/2 m-auto bg-emerald-500/50 shadow-md shadow-emerald-600 p-4 rounded-lg flex flex-col justify-center relative">
          <button
            type="button"
            onClick={() => (window.location.href = '/dashboard/category')}
            className="flex items-center py-2 px-6 font-bold rounded-full text-white bg-emerald-700/70 absolute left-4 top-4">
            Back
          </button>
          <div className="w-full text-center text-2xl font-bold text-emerald-800">
            <h1>Update Category Form</h1>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <div className="w-full flex justify-center">
              <InputImagePoster
                src={imageUrl?.length > 0 ? imageUrl : data?.imageUrl}
                onChange={uploadFile}
                clear={removeImage}
              />
            </div>
            <div className="flex flex-col text-center text-white font-medium">
              <label htmlFor="">Category name</label>
              <input
                className="w-full rounded-full p-2 focus:outline-none text-emerald-600 text-center"
                type="text"
                defaultValue={data?.name}
                onChange={(e) => setCategoryName(e?.target?.value)}
              />
            </div>
            <div className="flex gap-2 items-center mt-4">
              <button
                type="button"
                onClick={updateCategory}
                className="flex items-center py-2 px-6 font-bold rounded-full bg-emerald-600 text-emerald-800 hover:bg-emerald-700 hover:translate-y-1">
                Save Change
              </button>
              <p className="text-emerald-800">| or |</p>
              <button
                type="button"
                onClick={() => setShow(true)}
                className="flex items-center py-2 px-6 font-bold rounded-full  bg-rose-600 text-rose-800 hover:bg-rose-700 hover:translate-y-1">
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
