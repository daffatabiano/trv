'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { listsDashboard } from '@/services/Headers/data';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/Sidebar';
import { SUB_EMPTY_PROFILE } from '@/services/SUB_DATA/data';

export function SidebarAdmin(props) {
    const { children } = props;
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                'rounded-md h-screen flex flex-col md:flex-row bg-indigo-600 dark:bg-neutral-800 w-full flex-1 border border-indigo-200 dark:border-neutral-700 overflow-hidden',
                'min-h-screen min-w-screen'
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {listsDashboard.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: props.name || 'Admin',
                                href: '#',
                                icon: (
                                    <Image
                                        src={
                                            props.profilePictureUrl ||
                                            SUB_EMPTY_PROFILE
                                        }
                                        className="h-8 w-8 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard>{children}</Dashboard>
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-lg text-black py-1 relative z-20"
        >
            <img
                src="/img/logo/sec-logo.png"
                alt="company-logo-opened"
                className="w-20 h-20 object-cover"
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-amber-300 dark:text-white whitespace-pre"
            >
                Control Panel
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <img
                src="/img/logo/single-logo.png"
                alt="company-logo"
                className="w-20 h-20 object-cover"
            />
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = () => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">
                    {[...new Array(4)].map((i) => (
                        <div
                            key={'first-array' + i}
                            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex gap-2 flex-1">
                    {[...new Array(2)].map((i) => (
                        <div
                            key={'second-array' + i}
                            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
