import { Icons } from '@/components/Icons';
import usePost from '@/hooks/usePost';
import { useState } from 'react';
import DropdownDashboardProfile from '../Dropdowns/dropdown-dashboard-profile';
import Toast from '../Toast';

export default function ModalRole(props) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const { post } = usePost();
    const [toast, setToast] = useState({});

    console.log(value);

    const updateRole = async () => {
        const res = await post(
            `update-user-role/${props?.data?.id}`,
            {
                role: value,
            },
            props?.token
        );
        if (res?.status === 200) {
            setToast({
                variant: 'success',
                title: 'Role Updated',
                message: res?.data?.message,
                show: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            setToast({
                variant: 'error',
                title: 'Error Update Role',
                message: 'Something went wrong!',
                show: true,
            });
        }
    };
    return (
        <div className={`w-full h-full fixed inset-0 bg-slate-900/70 z-[60]`}>
            <Toast {...toast} setToast={setToast} duration={3000} />
            <div
                className={`w-1/3 m-auto mt-20 rounded-lg p-4 ${
                    value === 'admin' || props?.data?.role === 'admin'
                        ? 'bg-emerald-100 border-emerald-400/80'
                        : 'bg-rose-100 border-rose-400/80'
                }`}
            >
                <div
                    className={`w-full py-2 px-4 rounded-lg flex justify-between ${
                        props?.data?.role === 'admin' || value === 'admin'
                            ? 'bg-emerald-400/30 text-emerald-600'
                            : 'bg-rose-400/30 text-rose-600'
                    }`}
                >
                    <h1>Change user role</h1>{' '}
                    <button type="button" onClick={props.close}>
                        <Icons.Close w={'w-4'} />
                    </button>
                </div>
                <div className="p-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="role"
                            className="font-thin text-stone-400/70"
                        >
                            Choose Role
                        </label>
                        <DropdownDashboardProfile
                            show={show}
                            value={value}
                            setShow={setShow}
                            setValue={setValue}
                            {...props?.data}
                        >
                            <button
                                className={`py-2 ps-4 text-start bg-transparent w-full font-bold uppercase ${
                                    props?.data?.role === 'admin' ||
                                    value === 'admin'
                                        ? 'hover:bg-emerald-100 text-emerald-800'
                                        : 'hover:bg-rose-100 text-rose-800'
                                } mb-2 rounded-lg cursor-pointer`}
                                onClick={() => {
                                    setValue('admin');
                                    setShow(false);
                                }}
                                type="button"
                            >
                                Admin
                            </button>
                            <hr className="mx-4" />
                            <button
                                className={`py-2 ps-4 text-start bg-transparent w-full font-bold uppercase ${
                                    props?.data?.role === 'admin' ||
                                    value === 'admin'
                                        ? 'hover:bg-emerald-100 text-emerald-800'
                                        : 'hover:bg-rose-100 text-rose-800'
                                } mb-2 rounded-lg cursor-pointer`}
                                onClick={() => {
                                    setValue('user');
                                    setShow(false);
                                }}
                                type="button"
                            >
                                User
                            </button>
                        </DropdownDashboardProfile>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => updateRole()}
                            className={`p-2 mt-4 w-full rounded-full ${
                                props?.data?.role === 'admin' ||
                                value === 'admin'
                                    ? 'bg-emerald-600'
                                    : 'bg-rose-600'
                            } text-white`}
                        >
                            Save Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
