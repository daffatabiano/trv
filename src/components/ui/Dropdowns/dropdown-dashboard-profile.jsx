import { Icons } from '@/components/Icons';

export default function DropdownDashboardProfile(props) {
  return (
    <>
      <div className="relative ">
        <button
          type="button"
          onClick={() => props?.setShow((prev) => !prev)}
          className={`text-start w-full  rounded-lg  ${
            props?.role
              ? props?.role === 'admin' || props?.value == 'admin'
                ? 'bg-emerald-300 text-emerald-600  py-2 ps-4 uppercase font-bold'
                : 'bg-rose-300 text-rose-600 py-2 ps-4 uppercase font-bold'
              : 'bg-transparent text-sm flex gap-2 items-center p-2'
          } `}>
          {props?.value || props?.role ? (
            props?.value ? (
              props?.value
            ) : (
              props?.role
            )
          ) : (
            <>
              <Icons.Filter w={18} /> Filter
            </>
          )}
        </button>
        {props?.role && (
          <span
            className="absolute right-4 top-0 translate-y-[40%] cursor-pointer"
            onClick={() => props?.setShow((prev) => !prev)}>
            {props?.show ? (
              <Icons.CharretUp w={24} />
            ) : (
              <Icons.CharretDown w={24} />
            )}
          </span>
        )}
      </div>
      <div
        className={`flex flex-col  rounded-lg  overflow-hidden  ${
          props?.role
            ? props?.role === 'admin' || props?.value === 'admin'
              ? 'bg-emerald-300 mt-2 inherit w-full p-2'
              : 'bg-rose-300 mt-2 inherit w-full p-2'
            : 'absolute top-10 p-1 z-[52] bg-stone-300'
        } ${props?.show ? 'visible' : 'invisible'}`}>
        {props.children}
      </div>
    </>
  );
}
