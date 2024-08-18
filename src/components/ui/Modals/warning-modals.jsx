import { Icons } from '@/components/Icons';
import { motion } from 'framer-motion';

export default function WarningModals({ message, title, onClick }) {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50 bg-slate-900/70">
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: 'spring',
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001,
                    },
                }}
            >
                <div className="m-auto w-[90%] sm:w-3/4 bg-slate-300/80 rounded-lg shadow-md shadow-slate-800/85 overflow-hidden">
                    <div className="w-full items-center justify-start p-2 shadow-md  bg-slate-300">
                        <h1 className="text-lg font-semibold text-rose-700 w-full flex items-center gap-2">
                            <Icons.Warning w={24} /> {title}
                        </h1>
                    </div>
                    <div className="w-full h-full px-2 py-4 text-center text-stone-800">
                        {message}
                    </div>
                    <div className="w-full sm:m-auto sm:w-1/2  p-2">
                        <button
                            className="p-2 w-full rounded-full bg-rose-600 text-white"
                            type="button"
                            onClick={onClick}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
