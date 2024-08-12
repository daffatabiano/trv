import { Icons } from '@/components/Icons';
import { useEffect, useState } from 'react';

export default function Headers() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const stickyTop = document.querySelector('.sticky');
        const handleScroll = () => {
            if (window.scrollY >= 'sticky') {
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
            className={`flex gap-4 items-center ${
                isScrolled ? 'bg-zinc-900 text-white' : 'bg - transparent'
            } sticky top-0 text-slate-950 `}
        >
            <div>
                <Icons.Home />
            </div>
        </nav>
    );
}
