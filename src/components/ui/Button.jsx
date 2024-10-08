export default function Button({ text, ...rest }) {
    return (
        <button
            {...rest}
            className="bg-amber-300 rounded-full w-fit  font-bold px-4 py-2 text-xs md:text-lg text-white hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
            
        >
            {text}
        </button>
    );
}
