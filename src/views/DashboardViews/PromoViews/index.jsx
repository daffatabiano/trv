import useGet from '@/hooks/useGet';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import usePost from '@/hooks/usePost';
import { useEffect, useMemo, useState } from 'react';
import ReusableDashboardActions from '@/views/DashboardViews/reusable';
import Toast from '@/components/ui/Toast';
import { motion } from 'framer-motion';
import Input, { InputImagePoster } from '@/components/ui/Input';
import useUpload from '@/hooks/useUpload';
import {
  SUB_EMPTY_IMAGE_PROMO,
  SUBT_EMPTY_IMAGE,
} from '@/services/SUB_DATA/data';
import ModalDelete from '@/components/ui/Modals/modal-delete';
import { useRouter } from 'next/router';
import Form, { InputForm } from '@/components/forms';
import { Icons } from '@/components/Icons';

export default function Promo() {
  const { getData } = useGet();
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [sort, setSort] = useState('sort');

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

  const getPromos = async () => {
    const res = await getData('promos', token);
    setData(res.data.data);
  };

  useEffect(() => {
    getPromos();
  }, [token]);

  return (
    <ReusableDashboardActions
      slug="promo"
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

export const AddPromo = () => {
  const { post } = usePost();
  const [imageUrl, setImageUrl] = useState({});
  const [toast, setToast] = useState({});
  const { upload } = useUpload();
  const [token, setToken] = useState('');
  const [hoverActive, setHoverActive] = useState(false);
  const [promoName, setPromoName] = useState('');

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
              message: 'Your promo image success to be applied',
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
  const addPromo = async (e) => {
    e.preventDefault();

    const body = {
      imageUrl: imageUrl,
      title: promoName,
      description: e?.target?.description?.value,
      terms_condition: e?.target?.terms_conditions?.value,
      promo_code: e?.target?.promo_code?.value,
      promo_discount_price: Number(e?.target?.promo_discount_price?.value),
      minimum_claim_price: Number(e?.target?.minimum_claim_price?.value),
    };

    const res = await post('create-promo', body, token);
    if (res?.status === 200) {
      setToast({
        variant: 'success',
        title: 'Promo Added',
        message: 'Promo success to be added!',
        show: true,
      });
      setTimeout(() => {
        window.location.href = '/dashboard/promo';
      }, 3000);
    } else {
      setToast({
        variant: 'error',
        title: 'Add Promo Failed',
        message: 'Something went wrong!',
        show: true,
      });
    }
  };

  const handleHover = useMemo(() => {
    return () => {
      setHoverActive(!hoverActive);
    };
  }, [hoverActive]);

  const removeImage = async () => {
    setImageUrl({});
    setToast({
      variant: 'success',
      title: 'Image Removed',
      message: 'Promo picture success to removed!',
      show: true,
    });
  };

  return (
    <div className="bg-rose-300/80 w-full min-h-screen h-full flex flex-col justify-center">
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
        <div
          onMouseEnter={handleHover}
          className={` m-auto bg-white h-[85vh] rounded-3xl overflow-hidden transition-all duration-300 ${
            hoverActive ? 'w-[85%] flex' : 'w-1/2'
          }`}>
          <div
            className={`${
              hoverActive ? 'w-1/2' : 'w-full'
            } p-4 bg-white flex flex-col h-full items-center `}>
            <div className="w-full justify-between px-4 text-center text-2xl flex font-bold text-amber-800">
              <h1 className="text-3xl font-bold text-rose-500 ">
                New Promo Form
              </h1>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-transparent text-amber-800 text-sm font-light hover:underline underline-offset-4">
                ← Back
              </button>
            </div>
            <div className="w-full h-[55%] mt-5">
              {imageUrl.length > 0 ? (
                <img
                  src={imageUrl}
                  alt="banner"
                  className="w-full h-full object-cover object-center rounded-3xl border border-dashed border-rose-400"
                />
              ) : (
                <div className="w-full h-full relative bg-white text-rose-300/80 hover:text-rose-400 border-rose-300/80 hover:border-rose-400 overflow-hidden border border-dashed rounded-3xl flex justify-center items-center py-4">
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
              <div className="w-full flex flex-col gap-4 mt-4 ">
                <label
                  htmlFor="promo-name"
                  className="text-xl text-rose-300 font-bold">
                  Promo Title
                </label>
                <InputForm
                  onChange={(e) => setPromoName(e.target.value)}
                  type="text"
                  name="promo-name"
                />
              </div>
            </div>
          </div>
          <div
            className={`w-1/2 bg-zinc-100 rounded-3xl ${
              !hoverActive ? 'hidden' : ''
            }`}>
            <Form onSubmit={addPromo} className="w-full p-4">
              <label htmlFor="description-promo" className="">
                Description
              </label>
              <textarea
                name="description"
                className="w-full h-48 resize-none p-4 rounded-3xl border border-rose-300/80 focus:border-rose-400 focus:outline-none"
              />
              <div className="w-full flex gap-4 mt-2">
                <div>
                  <label htmlFor="terms-condition-promo">
                    Terms and Condition
                  </label>
                  <textarea
                    name="terms_conditions"
                    className="w-full h-52 resize-none p-4 rounded-3xl border border-rose-300/80 focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="relative">
                    <label htmlFor="code-promo">Promo Code</label>
                    <InputForm type="text" name="promo_code" />
                    <button className="absolute bottom-0 right-4 top-4 flex items-center">
                      <Icons.Copy w={20} />
                    </button>
                  </div>
                  <div>
                    <label htmlFor="code-promo">Discount Price</label>
                    <InputForm type="text" name="promo_discount_price" />
                  </div>
                  <div>
                    <label htmlFor="code-promo">Minimum Purchase</label>
                    <InputForm type="text" name="minimum_claim_price" />
                  </div>
                </div>
              </div>
              <button className="w-full p-3 font-bold text-white bg-rose-400 rounded-3xl">
                {' '}
                Add Promo
              </button>
            </Form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const UpdatePromo = () => {
  const { post } = usePost();
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

  const getPromos = async () => {
    const res = await getData(`promo/${query?.slug}`, token);
    setData(res?.data?.data);
  };

  useEffect(() => {
    getPromos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, query?.slug]);

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

  const updatePromo = async (e) => {
    e.preventDefault();
    const body = {
      imageUrl: imageUrl || data?.image_url,
      title: e?.target?.title?.value,
      description: e?.target?.description?.value,
      terms_condition: e?.target?.terms_condition?.value,
      promo_code: e?.target?.promo_code?.value,
      promo_discount_price: Number(e?.target?.promo_discount_price?.value),
      minimum_claim_price: Number(e?.target?.minimum_claim_price?.value),
    };

    const res = await post(`update-promo/${query?.slug}`, body, token);
    if (res?.status === 200) {
      setToast({
        variant: 'success',
        title: 'Promo Updated',
        message: 'Promo success to be updated!',
        show: true,
      });
      setTimeout(() => {
        window.location.href = '/dashboard/promo';
      }, 3000);
    } else {
      setToast({
        variant: 'error',
        title: 'Update Failed',
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
      message: 'Promo picture success to removed!',
      show: true,
    });
  };

  return (
    <div className="bg-rose-300/80 w-full min-h-screen h-full flex flex-col justify-center">
      <Toast {...toast} duration={3000} setToast={setToast} />
      <ModalDelete
        title="promo"
        show={show}
        setShow={setShow}
        id={query?.slug}
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
        <div className="w-1/2 h-full my-4 mx-auto bg-rose-500/50 shadow-md shadow-rose-600 p-4 rounded-lg flex flex-col justify-center relative">
          <button
            type="button"
            onClick={() => (window.location.href = '/dashboard/promo')}
            className="flex items-center py-2 px-6 font-bold rounded-full text-white bg-rose-700/70 absolute left-4 top-4">
            Back
          </button>
          <div className="w-full text-center text-2xl font-bold text-rose-800 mb-2">
            <h1>Update Promo Form</h1>
          </div>
          <form
            onSubmit={updatePromo}
            className="flex flex-col justify-center gap-2 items-center">
            <div className="w-full flex flex-col justify-center">
              <Input
                text="Promo Title"
                name="title"
                type="text"
                defaultValue={data?.title}
                className="text-center font-bold uppercase"
              />
              <InputImagePoster
                src={imageUrl?.length > 0 ? imageUrl : data?.imageUrl}
                onChange={uploadFile}
                clear={removeImage}
              />
            </div>
            <div className="flex flex-col w-full text-center text-white font-medium">
              <label>Description</label>
              <textarea
                className="w-full resize-none rounded-full p-2 focus:outline-none text-rose-600 text-center"
                type="text"
                name="description"
                defaultValue={data?.description}
              />
              <div className="flex gap-4">
                <div className="w-1/2 flex flex-col gap-2">
                  <label>
                    Terms & Conditions
                    <input
                      type="text"
                      name="terms_condition"
                      className="w-full rounded-full p-2 focus:outline-none text-rose-600 text-center"
                      defaultValue={data?.terms_condition}
                    />
                  </label>
                  <label>
                    Minimum Claim Price
                    <input
                      type="number"
                      name="minimum_claim_price"
                      className="w-full rounded-full p-2 focus:outline-none text-rose-600 text-center"
                      defaultValue={data?.minimum_claim_price}
                    />
                  </label>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <label>
                    Promo Code
                    <input
                      type="text"
                      name="promo_code"
                      className="w-full rounded-full p-2 focus:outline-none text-rose-600 text-center"
                      defaultValue={data?.promo_code}
                    />
                  </label>
                  <label>
                    Promo Discount Price
                    <input
                      type="number"
                      name="promo_discount_price"
                      defaultValue={data?.promo_discount_price}
                      className="w-full rounded-full p-2 focus:outline-none text-rose-600 text-center"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <button
                type="submit"
                className="flex items-center py-2 px-6 font-bold rounded-full bg-emerald-600 text-emerald-800 hover:bg-emerald-700 hover:translate-y-1">
                Save Change
              </button>
              <p className="text-emerald-800">| or |</p>
              <button
                type="button"
                onClick={() => setShow(true)}
                className="flex items-center py-2 px-6 font-bold rounded-full  bg-rose-600 text-rose-800 hover:bg-rose-700 hover:translate-y-1">
                Delete Banner
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
