import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import { useEffect, useMemo, useState } from 'react';
import ReusableDashboardActions from '@/views/DashboardViews/reusable';
import Toast from '@/components/ui/Toast';
import { InputImagePoster } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import useUpload from '@/hooks/useUpload';
import { SUBT_EMPTY_IMAGE } from '@/services/SUB_DATA/data';
import Form, { InputForm } from '@/components/forms';
import { Icons } from '@/components/Icons';

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
  const [imageUrl, setImageUrl] = useState([]);
  const [toast, setToast] = useState({});
  const { upload } = useUpload();
  const [token, setToken] = useState('');
  const [category, setCategory] = useState([]);
  const { getData } = useGet();
  const [hoverActive, setHoverActive] = useState(false);
  const [activityTitle, setActivityTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

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
            setImageUrl([...imageUrl, res.data.url]);
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

  console.log(imageUrl);

  const addActivities = async (e) => {
    e?.preventDefault();

    const body = {
      categoryId: categoryId,
      title: activityTitle,
      description: description,
      imageUrls: imageUrl,

      price: Number(e?.target?.price?.value),
      price_discount: Number(e?.target?.price_discount?.value),
      total_reviews: e?.target?.total_reviews?.value,
      facilties: <p>{e?.target?.facilities?.value}</p>,

      address: e?.target?.address?.value,
      provincy: e?.target?.provincy?.value,
      city: e?.target?.location_maps?.value,
      location_maps: e?.target?.location_maps?.value,
    };

    const res = await post('create-activity', body, token);
    if (res?.status === 200) {
      setToast({
        variant: 'success',
        title: 'Activity Added',
        message: 'Activity success to be added!',
        show: true,
      });
      setTimeout(() => {
        window.location.href = '/dashboard/activity';
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

  const handleHover = useMemo(() => {
    return () => {
      setHoverActive(!hoverActive);
    };
  }, [hoverActive]);

  return (
    <div className="bg-slate-300/80 w-full min-h-screen h-full flex flex-col justify-center">
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
          onMouseLeave={() => setHoverActive(false)}
          className={` m-auto bg-white h-[90vh] rounded-3xl overflow-hidden transition-all duration-300 ${
            hoverActive ? 'w-[85%] flex' : 'w-1/2'
          }`}>
          <div
            className={`h-full ${
              hoverActive ? 'w-1/2' : 'w-full'
            } p-4 bg-white flex flex-col items-center `}>
            <div className="w-full justify-between px-4 text-center text-2xl flex font-bold text-amber-800">
              <h1 className="text-3xl font-bold text-slate-500 ">
                New Activity Form
              </h1>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-transparent text-slate-800 text-sm font-light hover:underline underline-offset-4">
                ← Back
              </button>
            </div>
            <div className="w-full h-[35%] mt-5 overflow-hidden">
              {imageUrl.length > 0 ? (
                imageUrl?.map((image, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full flex flex-col justify-center overflow-auto">
                      <img
                        src={image}
                        alt="banner"
                        className="w-24 h-24 object-cover object-center rounded-3xl border border-dashed border-slate-400"
                      />
                      <input
                        type="file"
                        onChange={(e) => uploadFile(e)}
                        className="w-full p-2 rounded-3xl "
                      />
                    </div>
                  );
                })
              ) : (
                <div className="w-full relative h-[35%] text-slate-300/80 hover:text-slate-400 border-slate-300/80 hover:border-slate-400 overflow-hidden border border-dashed rounded-3xl flex justify-center items-center py-4">
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
                  className="bg-transparent underlined text-md p-2 underlined text-red-600">
                  clear
                </button>
              </div>
              <div className="w-full flex flex-col gap-2 ">
                <div className="w-full flex items-center gap-2">
                  <label
                    htmlFor="promo-name"
                    className="text-slate-300 font-bold">
                    Choose Category
                  </label>
                  <select
                    className="border border-slate-300/80 p-2 rounded-3xl focus:border-slate-400 focus:outline-none"
                    onChange={(e) => setCategoryId(e.target.value)}
                    id="">
                    <option value="">Choose Category</option>
                    {category.map((item, index) => (
                      <option
                        className="text-black"
                        key={index}
                        value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="promo-title"
                    className="text-slate-300 font-bold">
                    Activity Title
                  </label>
                  <InputForm
                    onChange={(e) => setActivityTitle(e.target.value)}
                    type="text"
                    name="promo-name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="promo-description"
                    className="text-slate-300 font-bold">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 p-4 resize-none rounded-3xl border border-slate-300/80 focus:border-slate-400 focus:outline-none"
                    id=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`w-1/2 bg-zinc-100 rounded-3xl ${
              !hoverActive ? 'hidden' : ''
            }`}>
            <Form onSubmit={addActivities} className="w-full p-4">
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <label htmlFor="price">
                    Price
                    <InputForm type="number" name="price" />
                  </label>
                  <label htmlFor="price-discount">
                    Price Discount
                    <InputForm type="number" name="price_discount" />
                  </label>
                  <label htmlFor="total-reviews">
                    Total Reviews
                    <InputForm type="number" name="total_reviews" />
                  </label>
                </div>
                <label htmlFor="facilities">Facilities</label>
                <InputForm type="text" name="facilities" />
              </div>

              <div className="w-full flex justify-between gap-4 mt-2">
                <div className="flex flex-col w-full">
                  <label htmlFor="address">Address</label>
                  <textarea
                    name=""
                    id=""
                    className="w-full p-4 h-36 resize-none rounded-3xl border border-slate-300/80 focus:border-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="province">Province</label>
                    <InputForm type="text" name="province" />
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <InputForm type="text" name="city" />
                  </div>
                </div>
              </div>

              <label htmlFor="maps">
                Maps
                <textarea
                  name="maps"
                  id=""
                  className="w-full p-4 h-24 resize-none rounded-3xl border border-slate-300/80 focus:border-slate-400 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="w-full p-3 font-bold text-white bg-slate-400 rounded-3xl">
                {' '}
                Add Activity
              </button>
            </Form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
