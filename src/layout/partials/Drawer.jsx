import { Icons } from '@/components/Icons';
import { useState } from 'react';

export default function Drawer() {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            <nav
                className={`flex w-full h-20 items-center justify-between  backdrop-blur-md sticky top-0 text-slate-950 px-4 pt-2`}
            >
                <div className="w-1/6">
                    <img src="/img/logo/main-logo.png" alt="logo-company" />
                </div>
                <div className="w-5/6 flex justify-end">
                    <button onClick={() => setShowDrawer(!showDrawer)}>
                        <Icons.Hamburger />
                    </button>
                </div>
            </nav>
        </>
    );
}
