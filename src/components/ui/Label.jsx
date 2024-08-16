import { cn } from "@/lib/utils";

export default function Label({ text, variant = 'white', className,...rest }) {
    return (
        <label
            {...rest}
            className={cn(`text-${variant} text-sm md:text-lg font-medium`, className)}
        >
            {text}
        </label>
    );
}
