import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useDelete from '@/hooks/useDelete';
import Toast from '../ui/Toast';

const ModalDelete = (props) => {
  const { title, show, setShow, id } = props;
  const [token, setToken] = useState('');
  const { deleteData } = useDelete();
  const [toast, setToast] = useState({});

  console.log(id);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const close = () => {
    setShow(false);
  };

  const handleDelete = async () => {
    const res = await deleteData(`delete-${title}/${id}`, token);
    if (res?.status === 200) {
      setToast({
        variant: 'success',
        title: 'Delete Success',
        message: res?.data?.message,
        show: true,
      });
      setTimeout(() => {
        window.history.back();
      }, 3000);
    } else {
      setToast({
        variant: 'error',
        title: 'Delete Failed',
        message: res?.data?.message,
        show: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`w-full h-full bg-zinc-950/20 fixed top-0 left-0 items-center justify-center z-50 ${
        show ? 'flex' : 'hidden'
      }`}>
      <Toast {...toast} setToast={setToast} duration={3000} />
      <div className="w-64 h-64 rounded-lg bg-slate-100 overflow-hidden">
        <div className="w-full bg-slate-200">
          <h1 className="text-2xl p-2 text-center capitalize font-bold">
            Delete {title}
          </h1>
        </div>
        <p className="text-lg text-secondary px-4 py-8 ">
          Are you sure you want to delete this {title}?
        </p>
        <div className="w-full flex-row-reverse flex gap-2 mt-4  py-2 px-4 ">
          <button
            className="w-full bg-emerald-400 text-white py-2 rounded"
            onClick={handleDelete}>
            Yes
          </button>
          <button
            className="w-full bg-red-400 text-white py-2 rounded"
            onClick={close}>
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModalDelete;
