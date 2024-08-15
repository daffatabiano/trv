export default function Input(props) {
    const { className, ...rest } = props;

    return (
        <input
            className={cn(
                'w-full p-2 sm:p-4 md:p-6 bg-neutral-100 rounded-lg',
                className
            )}
            {...rest}
        />
    );
}
