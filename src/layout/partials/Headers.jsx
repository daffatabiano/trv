import { Icons } from '@/components/Icons';

export default function Headers() {
    return (
        <nav className="flex gap-4 items-center bg-transparent sticky top-0 text-slate-950">
            <div>
                <Icons.Home />
            </div>
        </nav>
    );
}
