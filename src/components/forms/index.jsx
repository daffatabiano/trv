import { cn } from '@/lib/utils';

export default function Form(props) {
  const { onSubmit, children, className } = props;
  return (
    <form
      onSubmit={onSubmit}
      className={cn('w-full flex flex-col gap-4', className)}>
      {children}
    </form>
  );
}

export const InputForm = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      onchange={props?.onChange}
      className={cn(
        'w-full p-3 rounded-3xl border border-rose-300/80 focus:border-rose-400 focus:outline-none',
        props.className
      )}
    />
  );
};
