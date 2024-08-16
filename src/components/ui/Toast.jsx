import { Icons } from '../Icons';

const toasterVariant = {
    success: {
        icon: <Icons.Success w="w-4" />,
        color: 'bg-emerald-900',
        barColor: 'bg-emerald-950',
        textColor: 'text-emerald-950',
    },
};

export default function Toast(prop) {
    const { title, message, variant } = prop;

    return (
        <div className="absolute right-4 top-4">
            <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
                <div className="flex gap-2">
                    <div className="p-2">{toasterVariant[variant].icon}</div>
                    <div className="flex flex-col gap-1">
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
                    className={`w-full h-px absolute bottom-0 ${toasterVariant[variant].color}`}
                />
                <div
                    className={`w-full h-px absolute bottom-0 ${toasterVariant[variant].barColor}`}
                />
            </div>
        </div>
    );
}
