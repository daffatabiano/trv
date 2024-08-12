export default function Button({ text, ...rest }) {
    return (
        <button
            {...rest}
            className="bg-amber-300 rounded-full w-fit text-emerald-950 font-bold px-4 py-2 hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
        >
            {text}
        </button>
    );
}
