import { Icons } from '@/components/Icons';

export default function WarningModals({ message, title }) {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50 bg-slate-900/70">
            <div className="m-auto w-[90%] bg-slate-300/80 rounded-lg shadow-md shadow-slate-800/85 overflow-hidden">
                <div className="w-full items-center justify-start p-2 shadow-md  bg-slate-300">
                    <h1 className="text-lg font-semibold text-rose-700 w-full flex items-center gap-2">
                        <Icons.Warning w={24} /> {title}
                    </h1>
                </div>
                <div className="w-full h-full px-2 py-4 text-center text-stone-800">
                    {message}
                </div>
                <div className="w-full sm:m-auto sm:w-1/2  p-2">
                    <button className="p-2 w-full rounded-full bg-rose-600 text-white">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
