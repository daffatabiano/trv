import { useEffect, useRef, useState } from 'react';
import { Icons } from '../Icons';

const toasterVariant = {
    success: {
        icon: <Icons.Success w={32} />,
        color: 'bg-emerald-600',
        barColor: 'bg-emerald-800',
        textColor: 'text-emerald-700',
    },
    error: {
        icon: <Icons.Error w={32} />,
        color: 'bg-rose-600',
        barColor: 'bg-rose-800',
        textColor: 'text-rose-700',
    },
};

export default function Toast(prop) {
    const { title, message, variant, show, setToast, duration } = prop;
    const [lengthBar, setLengthBar] = useState(100);
    const timerRef = useRef(null);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setLengthBar((prevCurrent) => prevCurrent - 0.14);
        }, 1);
    };

    if (lengthBar < 100 && show) {
        setTimeout(() => {
            setToast({});
        }, duration);
    }

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [show]);

    return (
        <div
            className={`absolute mx-auto left-0 right-0 top-4 z-50 overflow-hidden sm:mx-0 sm:left-auto sm:right-4 origin-top transition-all duration-300 ${
                show ? 'w-[90%] sm:w-1/3 md:w-1/5' : 'w-0'
            }`}
        >
            <div
                onClick={() => setToast({})}
                className={`${
                    show ? 'absolute' : 'hidden'
                } cursor-pointer z-50 w-4 right-2 top-2 bg-neutral-200 rounded-full p-1 hover:bg-neutral-300`}
            >
                <Icons.Close />
            </div>
            <div className="relative flex flex-col gap-2 bg-white rounded-lg ">
                <div className="flex gap-2 p-4 items-center">
                    <div
                        className={`p-2 w-14 h-14 ${toasterVariant[variant]?.textColor}`}
                    >
                        {toasterVariant[variant]?.icon}
                    </div>
                    <div className="flex flex-col gap-1 pb-2 flex-1">
                        <p
                            className={`text-sm font-medium ${toasterVariant[variant]?.textColor}`}
                        >
                            {title}
                        </p>
                        <p className={`text-xs `}>{message}</p>
                    </div>
                </div>
                <div
                    className={`w-full h-2 absolute bottom-0 rounded-lg ${toasterVariant[variant]?.color}`}
                />
                <div
                    style={{ width: `${lengthBar}%` }}
                    className={` h-2 absolute bottom-0 rounded-lg ${toasterVariant[variant]?.barColor}`}
                />
            </div>
        </div>
    );
}
