import Image from 'next/image';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export const Card = React.memo(
    ({ card, index, hovered, setHovered, variant }) => {
        const isoString = card?.updatedAt;
        const [datePart, timePart] = isoString.split('T');
        const [year, month, day] = datePart.split('-');
        const [hours, minutes, seconds] = timePart.split(':');

        const cleanSeconds = seconds.split('.')[0];

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${cleanSeconds}`;

        const { push } = useRouter();

        return (
            <div
                onClick={() => push(`/dashboard/banner/${card.id}`)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                    'rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out',
                    hovered !== null &&
                        hovered !== index &&
                        'blur-sm scale-[0.98]'
                )}
            >
                <Image
                    src={card.imageUrl}
                    alt={card.name}
                    fill
                    className="object-cover absolute inset-0"
                />
                <div
                    className={cn(
                        'absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300',
                        hovered === index ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <p
                        className={cn(
                            'absolute top-2 right-2 flex flex-col text-end italic font-medium',
                            `text-${variant}-600`
                        )}
                    >
                        {formattedDate}{' '}
                        <span className="text-sm font-light">
                            {formattedTime}
                        </span>
                    </p>
                    <div
                        className={`capitalize text-xl font-bold md:text-2xl bg-clip-text text-${variant}-300 tracking-wider`}
                    >
                        {card.name}
                    </div>
                </div>
            </div>
        );
    }
);

Card.displayName = 'Card';

export function FocusCards({ cards, variant }) {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto md:px-4 w-full">
            {cards.map((card, index) => (
                <Card
                    key={card.name}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                    variant={variant}
                />
            ))}
        </div>
    );
}
