import { Icons } from '@/components/Icons';

export default function DropdownDashboardProfile(props) {
    console.log(props, 'propss');

    return (
        <>
            <div className="relative ">
                <button
                    type="button"
                    onClick={() => props?.setShow((prev) => !prev)}
                    className={`w-full py-2 ps-4 text-start font-bold  rounded-lg uppercase ${
                        props?.role === 'admin'
                            ? 'bg-emerald-300 text-emerald-600'
                            : 'bg-rose-300 text-rose-600'
                    } `}
                >
                    {props?.value ? props?.value : props?.role}
                </button>
                <span
                    className="absolute right-4 top-0 translate-y-[40%] cursor-pointer"
                    onClick={() => props?.setShow((prev) => !prev)}
                >
                    {props?.show ? (
                        <Icons.CharretUp w={24} />
                    ) : (
                        <Icons.CharretDown w={24} />
                    )}
                </span>
            </div>
            <div
                className={`flex flex-col w-full rounded-lg bg-emerald-300 mt-2 overflow-hidden p-2 ${
                    props?.show ? 'visible' : 'invisible'
                }`}
            >
                <button
                    className="py-2 ps-4 text-start bg-transparent w-full font-bold uppercase hover:bg-emerald-100 mb-2 rounded-lg cursor-pointer"
                    onClick={() => {
                        props?.setValue('admin');
                        props?.setShow(false);
                    }}
                    type="button"
                >
                    Admin
                </button>
                <hr className="mx-4" />
                <button
                    className="py-2 ps-4 text-start bg-transparent w-full font-bold uppercase hover:bg-emerald-100 mb-2 rounded-lg cursor-pointer"
                    onClick={() => {
                        props?.setValue('user');
                        props?.setShow(false);
                    }}
                    type="button"
                >
                    User
                </button>
            </div>
        </>
    );
}
