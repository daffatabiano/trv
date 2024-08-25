import useGet from '@/hooks/useGet';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal';
import { Icons } from '@/components/Icons';
import { AnimatePresence, motion } from 'framer-motion';
import { BorderAnimation } from '@/components/ui/moving-borders';
import TableUser from './partials/Table-user';
import usePost from '@/hooks/usePost';
import ModalRole from '@/components/ui/Modals/modal-role';
import DropdownDashboardProfile from '@/components/ui/Dropdowns/dropdown-dashboard-profile';
import { useRouter } from 'next/navigation';

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

const Card = ({ title, icon, children, total, path }) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onClick={path}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group/canvas-card rounded-lg overflow-hidden bg-stone-100  flex items-center justify-center  max-w-sm w-full mx-auto h-full p-4 relative"
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
                <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black cursor-pointer font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
                    {total} {title}
                </h2>
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
    const [showDropdown, setShowDropdown] = useState(false);
    const [valueDropdown, setValueDropdown] = useState(false);
    const md = useMediaQuery('(min-width: 768px)');
    const { push } = useRouter();

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

    const totalUsers = allUsers
        ?.map((user) => user?.role)
        ?.filter((role) => role === valueDropdown)?.length;

    useEffect(() => {
        getAllUsers();
        getPromo();
        getBanners();
        getCategories();
        getActivites();
        getProfile();
    }, [isToken]);

    return (
        <div className="w-full h-full flex flex-col gap-4 max-h-screen">
            {showModalChangeRole && (
                <ModalRole
                    {...showRole}
                    close={() => setShowModalChangeRole(false)}
                />
            )}

            <div className="rounded-t-2xl w-ful overflow-hidden shadow-md h-[40%] bg-stone-50  text-center hover:text-stone-300 text-stone-700/70 ">
                <div className="relative">
                    <img
                        src="/img/general/stone.jpg"
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
                <div className="pt-2 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
                    <Card
                        title="Banner"
                        total={banners?.length}
                        icon={<Icons.Banner w={36} />}
                        path={() => push('/dashboard/banner')}
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
                        path={() => push('/dashboard/promo')}
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
                        path={() => push('/dashboard/category')}
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
                        path={() => push('/dashboard/activity')}
                    >
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-sky-400"
                            colors="bg-sky-100"
                        />
                    </Card>
                </div>
            </div>

            <div className="w-full h-[60%] max-h-[60%] bg-stone-50 overflow-hidden rounded-b-2xl shadow-md ">
                <div className="w-full p-4 text-xl bg-stone-200/70 flex justify-between items-center text-stone-700">
                    <h1 className="font-normal flex gap-2">
                        <Icons.User w={24} /> User{' '}
                        <span className="font-bold">Management</span>
                    </h1>
                    <div className="flex gap-6 items-center relative">
                        <div className="flex gap-1 ">
                            <DropdownDashboardProfile
                                show={showDropdown}
                                setShow={setShowDropdown}
                            >
                                <button
                                    className="p-2 text-start text-sm bg-transparent w-full hover:bg-stone-100 mb-[5px] rounded-lg cursor-pointer"
                                    onClick={() => {
                                        setValueDropdown('admin');
                                        setShowDropdown(false);
                                    }}
                                    type="button"
                                >
                                    Admin
                                </button>
                                <hr className="mx-1" />
                                <button
                                    className="p-2 text-start text-sm bg-transparent w-full  hover:bg-stone-100 mt-[5px] rounded-lg cursor-pointer"
                                    onClick={() => {
                                        setValueDropdown('user');
                                        setShowDropdown(false);
                                    }}
                                    type="button"
                                >
                                    User
                                </button>
                            </DropdownDashboardProfile>
                            <button
                                onClick={() => setValueDropdown('')}
                                type="button"
                                className="bg-stone-200 p-2 rounded-full flex items-center cursor-pointer"
                            >
                                <Icons.Refresh w={16} />
                            </button>
                        </div>
                        <BorderAnimation
                            borderRadius="1.75rem"
                            className={`w-full py-2 capitalize px-4 rounded-lg flex justify-between ${
                                valueDropdown
                                    ? valueDropdown === 'admin'
                                        ? 'bg-emerald-400/30 text-emerald-600'
                                        : 'bg-rose-400/30 text-rose-600'
                                    : 'bg-stone-400/30 text-stone-600'
                            }`}
                            borderClassName={
                                valueDropdown
                                    ? valueDropdown === 'admin'
                                        ? 'bg-[radial-gradient(var(--emerald-500)_40%,transparent_60%)]'
                                        : 'bg-[radial-gradient(var(--rose-500)_40%,transparent_60%)]'
                                    : 'bg-[radial-gradient(var(--stone-500)_40%,transparent_60%)]'
                            }
                        >
                            <span
                                className={`font-extrabold pe-2 ${
                                    valueDropdown
                                        ? valueDropdown === 'admin'
                                            ? 'text-emerald-600'
                                            : 'text-rose-600'
                                        : 'text-stone-600'
                                }`}
                            >
                                •{' '}
                                {valueDropdown ? totalUsers : allUsers?.length}{' '}
                            </span>{' '}
                            {valueDropdown ? valueDropdown : 'All'} Role
                        </BorderAnimation>
                    </div>
                </div>
                <div className="overflow-auto h-full pb-24">
                    <TableUser
                        {...[allUsers]}
                        filter={valueDropdown}
                        changeRole={(e) => changeRole(e)}
                    />
                </div>
            </div>
        </div>
    );
}
