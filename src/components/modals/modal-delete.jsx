import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useDelete from '@/hooks/useDelete';

const ModalDelete = (props) => {
  const { title, show, setShow, id } = props;
  const [token, setToken] = useState('');
  const { deleteData } = useDelete();

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
    console.log(res);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`w-full h-full bg-zinc-950/20 fixed top-0 left-0 items-center justify-center z-50 ${
        show ? 'flex' : 'hidden'
      }`}>
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
