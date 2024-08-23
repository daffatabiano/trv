import useGet from '@/hooks/useGet';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal';
import { Icons } from '@/components/Icons';
import { AnimatePresence, motion } from 'framer-motion';
import { BorderAnimation } from '@/components/ui/moving-borders';
import TableUser from './partials/Table-user';
import usePost from '@/hooks/usePost';

export const Icon = ({ className, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
            />
        </svg>
    );
};

const Card = ({ title, icon, children, total }) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group/canvas-card rounded-lg overflow-hidden bg-stone-100  flex items-center justify-center  max-w-sm w-full mx-auto h-24 p-4 relative"
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 ">
                <div className="text-center flex-col group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full pt-2 inset-0 mx-auto flex items-center justify-center">
                    {icon}
                    <span>{title}</span>
                </div>
                <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black   font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
                    {total} {title}
                </h2>
            </div>
        </div>
    );
};

const ModalRole = (props) => {
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
                        <div className="relative ">
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
                        </div>
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
};

export default function Dashboard() {
    const { getData } = useGet();
    const [isToken, setIsToken] = useState('');
    const [promos, setPromos] = useState([]);
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activities, setActivities] = useState([]);
    const [profile, setProfile] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [showRole, setShowRole] = useState({
        data: '',
        token: '',
    });
    const [showModalChangeRole, setShowModalChangeRole] = useState(false);
    const md = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsToken(localStorage.getItem('token'));
        }
    }, []);

    const getAllUsers = async () => {
        const res = await getData('all-user', isToken);
        setAllUsers(res?.data?.data);
    };

    const getPromo = async () => {
        try {
            const res = await getData('promos', isToken);
            setPromos(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getBanners = async () => {
        try {
            const res = await getData('banners', isToken);
            setBanners(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getCategories = async () => {
        try {
            const res = await getData('categories', isToken);
            setCategories(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getActivites = async () => {
        try {
            const res = await getData('activities', isToken);
            setActivities(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProfile = async () => {
        const res = await getData('user', isToken);
        setProfile(res?.data?.data);
    };

    const changeRole = async (e) => {
        setShowModalChangeRole(true);
        setShowRole({
            ...showRole,
            data: e,
            token: isToken,
        });
    };

    useEffect(() => {
        getAllUsers();
        getPromo();
        getBanners();
        getCategories();
        getActivites();
        getProfile();
    }, [isToken]);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            {showModalChangeRole && (
                <ModalRole
                    {...showRole}
                    close={() => setShowModalChangeRole(false)}
                />
            )}

            <div className="rounded-t-2xl overflow-hidden w-full shadow-md h-[40%] bg-stone-50  text-center text-stone-700/70 ">
                <div className="relative">
                    <img
                        src="/img/general/amber-color.png"
                        className="w-full h-24 object-cover object-center opacity-55 hover:opacity-100"
                    />
                    <div className="flex flex-col  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <p className=" text-lg font-medium">
                            Hello,{' '}
                            <span className="font-bold text-2xl italic">
                                {profile?.name}
                            </span>
                        </p>
                        <p className="tracking-wider text-lg font-medium ">
                            Welcome Back, happy control !
                        </p>
                    </div>
                </div>
                <div className="py-4 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
                    <Card
                        title="Banner"
                        total={banners?.length}
                        icon={<Icons.Banner w={36} />}
                    >
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-amber-400"
                            colors="bg-amber-100"
                        />
                    </Card>
                    <Card
                        title="Promos"
                        total={promos?.length}
                        icon={<Icons.Promo w={36} />}
                    >
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-rose-400"
                            colors="bg-rose-100"
                        />
                    </Card>
                    <Card
                        title="Categories"
                        total={categories?.length}
                        icon={<Icons.Category w={36} />}
                    >
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-emerald-400"
                            colors="bg-emerald-100"
                        />
                    </Card>
                    <Card
                        title="Activities"
                        total={activities?.length}
                        icon={<Icons.Top w={36} />}
                    >
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-sky-400"
                            colors="bg-sky-100"
                        />
                    </Card>
                </div>
            </div>
            <div className="w-full h-[60%] overflow-hidden bg-stone-50 rounded-b-2xl shadow-md ">
                <div className="w-full p-4 text-xl bg-stone-200/70 flex justify-between items-center text-stone-700">
                    <h1 className="font-normal flex gap-2">
                        <Icons.User w={24} /> User{' '}
                        <span className="font-bold">Management</span>
                    </h1>
                    <BorderAnimation
                        borderRadius="1.75rem"
                        className="bg-emerald-300/40 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    >
                        <span className="font-extrabold text-emerald-600 pe-2">
                            • {allUsers?.length}{' '}
                        </span>{' '}
                        Total Active
                    </BorderAnimation>
                </div>
                <div className="overflow-y-auto">
                    <TableUser
                        {...[allUsers]}
                        changeRole={(e) => changeRole(e)}
                    />
                </div>
            </div>
        </div>
    );
}
