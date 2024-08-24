import { Icons } from '@/components/Icons';
import usePost from '@/hooks/usePost';
import { useState } from 'react';
import DropdownDashboardProfile from '../Dropdowns/dropdown-dashboard-profile';

export default function ModalRole(props) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const { post } = usePost();

    console.log(props);

    const updateRole = async () => {
        const res = await post(
            `update-user-role/${props?.data?.id}`,
            {
                role: value,
            },
            props?.token
        );
        console.log(res);
    };
    return (
        <div className={`w-full h-full fixed inset-0 bg-slate-900/70 z-[60]`}>
            <div
                className={`w-1/3 m-auto mt-20 rounded-lg p-4 ${
                    props?.data?.role === 'admin'
                        ? 'bg-emerald-100 border-emerald-400/80'
                        : 'bg-rose-100 border-rose-400/80'
                }`}
            >
                <div className="w-full bg-stone-400/30 py-2 px-4 rounded-lg flex justify-between">
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
                                className="py-2 ps-4 text-start bg-transparent w-full font-bold uppercase hover:bg-emerald-100 mb-2 rounded-lg cursor-pointer"
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
                                className="py-2 ps-4 text-start bg-transparent w-full font-bold uppercase hover:bg-emerald-100 mb-2 rounded-lg cursor-pointer"
                                onClick={() => {
                                    setValue('user');
                                    setShow(false);
                                }}
                                type="button"
                            >
                                User
                            </button>
                        </DropdownDashboardProfile>
                        {/* <div className="relative ">
                            <button
                                type="button"
                                onClick={() => setShow((prev) => !prev)}
                                className={`w-full py-2 ps-4 text-start font-bold  rounded-lg uppercase ${
                                    props?.data?.role === 'admin'
                                        ? 'bg-emerald-300 text-emerald-600'
                                        : 'bg-rose-300 text-rose-600'
                                } `}
                            >
                                {!value ? props?.data?.role : value}
                            </button>
                            <span
                                className="absolute right-4 top-0 translate-y-[40%] cursor-pointer"
                                onClick={() => setShow((prev) => !prev)}
                            >
                                {show ? (
                                    <Icons.CharretUp w={24} />
                                ) : (
                                    <Icons.CharretDown w={24} />
                                )}
                            </span>
                        </div>

                        <div
                            className={`flex flex-col w-full rounded-lg bg-emerald-300 mt-2 overflow-hidden p-2 ${
                                show ? 'visible' : 'invisible'
                            }`}
                        >
                            <button
                                className="py-2 ps-4 text-start bg-transparent w-full font-bold uppercase hover:bg-emerald-100 mb-2 rounded-lg cursor-pointer"
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
                                className="py-2 ps-4 text-start bg-transparent w-full font-bold uppercase hover:bg-emerald-100 mb-2 rounded-lg cursor-pointer"
                                onClick={() => {
                                    setValue('user');
                                    setShow(false);
                                }}
                                type="button"
                            >
                                User
                            </button>
                        </div> */}
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => updateRole()}
                            className="p-2 mt-4 w-full rounded-full bg-rose-600 text-white"
                        >
                            Save Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
