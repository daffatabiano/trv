import { Icons } from '../Icons';

const toasterVariant = {
    success: {
        icon: <Icons.Success w={12} />,
        color: 'bg-emerald-700',
        barColor: 'bg-emerald-800',
        textColor: 'text-emerald-700',
    },
};

export default function Toast(prop) {
    const { title, message, variant } = prop;

    return (
        <div className="absolute right-4 top-4">
            <div className="relative flex flex-col gap-2 bg-white rounded-lg ">
                <div className="flex gap-2 p-4 items-center">
                    <div
                        className={`p-2 w-14 h-14 ${toasterVariant[variant].textColor}`}
                    >
                        {toasterVariant[variant].icon}
                    </div>
                    <div className="flex flex-col gap-1 pb-2">
                        <p
                            className={`text-sm ${toasterVariant[variant].textColor}`}
                        >
                            {title}
                        </p>
                        <p
                            className={`text-xs ${toasterVariant[variant].textColor}`}
                        >
                            {message}
                        </p>
                    </div>
                </div>
                <div
                    className={`w-full h-2 absolute bottom-0 rounded-lg ${toasterVariant[variant].color}`}
                />
                <div
                    className={`w-[40%] h-2 absolute bottom-0 rounded-lg    ${toasterVariant[variant].barColor}`}
                />
            </div>
        </div>
    );
}
