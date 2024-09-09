const { default: useDelete } = require('@/hooks/useDelete');
const { Icons } = require('../Icons');
const { useState, useEffect } = require('react');

const ModalDelete = ({ title, show, setShow }) => {
  const [token, setToken] = useState('');
  const { deleteData } = useDelete();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const close = () => {
    setShow(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteData(e?.id, token);
    console.log(res);
  };

  return (
    <div
      className={`w-full h-full bg-zinc-950/20 fixed top-0 left-0 items-center justify-center z-50 ${
        show ? 'flex' : 'hidden'
      }`}>
      <div className="w-32 h-32 bg-slate-100">
        <div className="relative w-full bg-slate-200">
          <h1 className="text-3xl">Delete {title}</h1>
          <button className="absolute top-2 right-2" onClick={close}>
            <Icons.Close w={24} />
          </button>
        </div>
        <p className="text-lg text-secondary">
          Are you sure you want to delete this {title}?
        </p>
        <div className="w-full flex gap-2">
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
    </div>
  );
};
