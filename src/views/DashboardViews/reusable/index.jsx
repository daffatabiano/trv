import { Icons } from '@/components/Icons';
import { FocusCards } from '@/components/ui/Cards/focus-card';
import { BorderAnimation } from '@/components/ui/moving-borders';
import { cn } from '@/lib/utils';
import styles from '@/styles/scrollbar/scrollbar.module.scss';
import { useRouter } from 'next/navigation';

export default function ReusableDashboardActions(props) {
  const { push } = useRouter();
  return (
    <div className="rounded-lg overflow-hidden flex flex-col gap-4 w-full h-full">
      <div
        className={`w-full flex justify-between p-2 h-[15%] bg-${props?.variant}-300 shadow-lg shadow-stone-400/70`}>
        <div className="flex flex-col p-2 w-[60%]">
          <h1
            className={`text-3xl text-${props?.variant}-700 capitalize font-bold `}>
            {props?.title} Control
          </h1>
          <p className={`ps-2 italic text-${props?.variant}-700`}>
            “{props?.title} control that allows you to easily{' '}
            <span
              className={`text-${props?.variant}-700
bg-${props?.variant}-200/50 p-1 rounded-lg hover:bg-${props?.variant}-700 hover:text-${props?.variant}-200/80 cursor-default`}>
              add, update, or remove
            </span>{' '}
            {props?.title}s on your web pages.”
          </p>
        </div>
        <div className="flex items-center justify-between px-2 w-[40%] py-2 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className={`flex gap-2 text-${props?.variant}-700`}
                onClick={props?.handleSort}>
                {props?.sort === 'sort' ? (
                  <Icons.Calendar w={24} />
                ) : props?.sort === 'newest' ? (
                  <Icons.CalendarArrowUp w={24} />
                ) : (
                  <Icons.CalendarArrowDown w={24} />
                )}
                {props?.sort}
              </button>
              <button
                type="button"
                onClick={() => {
                  props?.setSort('sort');
                  setTimeout(() => {
                    props?.sortRefetching;
                  }, 500);
                }}
                className={`w-8 h-8 p-2 rounded-full text-${props?.variant}-700 bg-${props?.variant}-200/50 hover:bg-${props?.variant}-700 hover:text-${props?.variant}-200/80 flex justify-center items-center`}>
                <Icons.Refresh w={18} />
              </button>
            </div>
            <button
              type="button"
              className={`text-${props?.variant}-700 h-fit w-fit bg-${props?.variant}-200/50 hover:bg-${props?.variant}-700 hover:text-${props?.variant}-200/80 p-2 rounded-lg flex gap-2`}
              onClick={() => push(`/dashboard/${props?.title}/add`)}>
              <Icons.Add w={24} />
              Add New
            </button>
          </div>
          <BorderAnimation
            borderRadius="1.75rem"
            className={`w-full py-2 capitalize px-4 rounded-lg flex justify-between bg-${props?.variant}-400/30 text-${props?.variant}-600 `}
            borderClassName={
              'bg-[radial-gradient(var(--${variant}-600)_40%,transparent_60%)]'
            }>
            <span className={`font-extrabold pe-2 text-${props?.variant}-700 `}>
              • {props?.data?.length}{' '}
            </span>{' '}
            {props?.title}s Total
          </BorderAnimation>
        </div>
      </div>
      <div
        className={cn(
          `bg-${props?.variant}-300  p-4 w-full h-[85%] overflow-y-auto`,
          styles['scrollbar-banners']
        )}>
        <FocusCards
          slug={props?.slug}
          cards={props?.data}
          variant={props?.variant}
          sorting={props?.sort}
        />
      </div>
    </div>
  );
}
