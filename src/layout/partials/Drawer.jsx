import { Icons } from '@/components/Icons';
import { lists } from '@/services/Headers/data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Sidebar = ({ lists, show }) => {
    return (
        <aside
            className={`w-full xs:w-1/4 gap-4  bg-amber-400 justify-between h-screen z-[100] fixed top-0 rounded-tr-3xl rounded-br-3xl  transition-all duration-300`}
        >
            <div className="w-full flex h-[20%] justify-center  items-center">
                <img
                    src="/img/logo/sec-logo.png"
                    className="w-full object-cover h-full"
                    alt="logo-company"
                />
                <span
                    className={`text-white font-bold w-fit text-center absolute text-sm p-2 top-2 right-2 rounded-full bg-amber-300 `}
                >
                    x
                </span>
            </div>
            <div className="w-full h-[50%]  px-2 py-8 flex flex-col gap-4 justify-between items-center">
                {lists.map((item) => (
                    <ul key={item.id}>
                        <li>
                            <Link
                                href={item.path}
                                className="text-white flex items-center gap-2 link"
                            >
                                {item.icon} {item.name}
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
            <div className="w-full h-[10%] mt-24  justify-end items-end flex">
                <img src="/img/logo/main-logo.png" alt="logo-company" />
            </div>
        </aside>
    );
};

export default function Drawer() {
    const [show, setShow] = useState(true);
    const [active, setActive] = useState(false);
    const { pathname } = useRouter();

    console.log(pathname, 'routerr');
    const handleClick = () => {
        setShow((curr) => !curr);
    };

    return (
        <>
            {/* <nav
                className={`${'flex'} w-full h-20 items-center justify-between z-20 backdrop-blur-md sticky top-0 text-slate-950 pe-4 pt-4`}
            >
                <div className="w-5/6 flex flex-col justify-start ">
                    <button
                        className="bg-amber-400 px-2 py-8 rounded-tr-full rounded-br-full  w-10 hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
                        onClick={handleClick}
                        id="btn-sidebar"
                    >
                        {show ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
                    </button>
                </div>
                <div className="w-1/6">
                    <img src="/img/logo/main-logo.png" alt="logo-company" />
                </div>
            </nav> */}

            <aside
                className={`w-full xs:w-3/4 sm:w-[40%] gap-4 bg-amber-400 justify-between h-screen z-[100] fixed top-0 rounded-tr-3xl rounded-br-3xl transition-all duration-300`}
            >
                <div
                    className={`w-full flex pt-2 h-[15%] space-x-20 ${
                        show
                            ? 'justify-center'
                            : 'justify-between items-center pe-4'
                    } items-center transition-all duration-300`}
                >
                    {show ? (
                        <img
                            src="/img/logo/sec-logo.png"
                            className={`overflow-hidden transition-all w-36 duration-300`}
                            alt="logo-company"
                        />
                    ) : (
                        <img
                            src="/img/logo/single-logo.png"
                            className={`overflow-hidden transition-all w-20 duration-300`}
                            alt="logo-company"
                        />
                    )}

                    <span
                        className={`text-white font-bold w-fit text-center text-sm p-2 top-2 right-2 rounded-full bg-amber-300 `}
                        onClick={handleClick}
                    >
                        {show ? <Icons.ChevronLeft /> : <Icons.ChevronRight />}
                    </span>
                </div>
                <hr className="w-full h-[1px] border-amber-300" />
                <div className="w-full h-[70%]  px-2 py-8 flex flex-col items-start">
                    {lists.map((item) => (
                        <ul key={item.id} className="w-full">
                            <li className=" w-full">
                                <Link
                                    href={item.path}
                                    className={`text-white w-full h-full rounded flex items-center gap-4 link py-4 px-2 ${
                                        item.path === pathname
                                            ? 'bg-gradient-to-l from-amber-400 to-amber-600 text-amber-950'
                                            : 'hover:bg-amber-600/30 '
                                    }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div>
                <hr className="w-full h-[1px] border-amber-300" />
                <div className="w-full px-2 mt-4 h-[10%] flex justify-between items-center">
                    <div className="flex gap-2">
                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                            alt="profile"
                            className="w-14 h-14 rounded-lg"
                        />
                        <span className="flex flex-col text-white font-normal w-fit h-fit p-2 items-start text-center text-sm rounded-lg bg-gradient-to-l from-amber-400 to-amber-500 text-amber-950">
                            John Doe
                            <em>Johndoe@gmail.com</em>
                        </span>
                    </div>
                    <div className="w-1/6 ">
                        <button className="text-white font-bold w-fit text-center text-sm p-2 top-2 right-2 rounded-full bg-amber-300 ">
                            <Icons.ThreeDots />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
