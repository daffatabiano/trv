import styles from '@/layout/partials/styles.module.scss';
import { useEffect, useState } from 'react';
import { lists } from '@/services/Headers/data';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';

export default function Headers(props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const md = useMediaQuery('(max-width: 768px)');
    const { push } = useRouter();

    useEffect(() => {
        const stickyTop = document.querySelector('.sticky');
        const handleScroll = () => {
            if (window.scrollY >= 1) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`flex gap-4 w-full h-24 items-center bg-transparent backdrop-blur-md sticky top-0 px-4 pt-2 ${
                isScrolled ? 'shadow-sm' : ''
            }`}
        >
            <div className="w-1/6 xl:pt-16 lg:pt-10 md:6">
                <img
                    className="w-full object-cover h-full"
                    src="/img/logo/main-logo.png"
                    alt="logo-company"
                />
            </div>
            <div className="w-10/12 flex gap-4 ">
                {lists.map((item) => (
                    <div key={item.id}>
                        <Link
                            href={item.path}
                            className={cn(
                                'text-xl text-amber-400 font-bold hover:text-amber-500 transition-all'
                            )}
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="w-1/12 me-4">
                <Button
                    text="Login"
                    type="button"
                    onClick={() => {
                        push('/auth/login');
                    }}
                />
            </div>
        </nav>
    );
}
