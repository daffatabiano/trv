export default function Label({ text, variant = 'white', ...rest }) {
    return (
        <label
            {...rest}
            className={`text-${variant} text-sm md:text-lg font-medium`}
        >
            {text}
        </label>
    );
}
