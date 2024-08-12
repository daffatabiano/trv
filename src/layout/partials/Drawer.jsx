import { Icons } from '@/components/Icons';
import { lists } from '@/services/Headers/data';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = ({ lists }) => {
    return (
        <aside className="w-full sm:w-1/4 bg-amber-400 h-screen z-[100] fixed top-0 ">
            <div className="w-full">
                <img src="/img/logo/sec-logo.png" alt="logo-company" />
            </div>
            <div className="w-full">
                {lists.map((item) => (
                    <ul key={item.id}>
                        <li>
                            <Link href={item.path} className="text-white">
                                {item.icon} {item.name}
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
            <div className="w-full">
                <img src="/img/logo/main-logo.png" alt="logo-company" />
            </div>
        </aside>
    );
};

export default function Drawer() {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            {showDrawer && <Sidebar lists={lists} />}
            <nav
                className={`${
                    showDrawer ? 'none' : 'flex'
                } w-full h-20 items-center justify-between z-20 backdrop-blur-md sticky top-0 text-slate-950 pe-4 pt-4`}
            >
                <div className="w-5/6 flex flex-col justify-start ">
                    <button
                        className="bg-amber-400 ps-2 pe-1 py-8 rounded-tr-full rounded-br-full text-white w-10 hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
                        onClick={() => setShowDrawer(!showDrawer)}
                    >
                        <Icons.Hamburger />
                    </button>
                </div>
                <div className="w-1/6">
                    <img src="/img/logo/main-logo.png" alt="logo-company" />
                </div>
            </nav>
            <aside className=" w-[10%] fixed top-0 h-screen flex flex-col gap-4 justify-between py-36 items-start ">
                {lists.map((item) => (
                    <button
                        className="bg-amber-400 ps-2 pe-1 py-8 rounded-tr-full rounded-br-full text-white hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
                        key={item.id}
                    >
                        {item.icon}
                    </button>
                ))}
            </aside>
        </>
    );
}
