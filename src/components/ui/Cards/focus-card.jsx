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
                            `absolute top-2 right-2 flex flex-col text-end italic font-medium bg-${variant}-300 px-2 py-1 rounded-md`,
                            `text-transparent bg-clip-text`
                        )}
                    >
                        {formattedDate}{' '}
                        <span className="text-sm font-light">
                            {formattedTime}
                        </span>
                    </p>
                    <div
                        className={`capitalize tracking-wider text-xl font-extrabold md:text-2xl text-transparent bg-clip-text bg-${variant}-300`}
                    >
                        {card.name}
                    </div>
                </div>
            </div>
        );
    }
);

Card.displayName = 'Card';

export function FocusCards({ cards, variant, sorting }) {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto md:px-4 w-full">
            {sorting === 'sort'
                ? cards.map((card, index) => (
                      <Card
                          key={card.name}
                          card={card}
                          index={index}
                          hovered={hovered}
                          setHovered={setHovered}
                          variant={variant}
                      />
                  ))
                : sorting === 'newest'
                ? cards
                      ?.sort(
                          (a, b) =>
                              new Date(b.updatedAt) - new Date(a.updatedAt)
                      )
                      ?.map((card, index) => (
                          <Card
                              key={card.name}
                              card={card}
                              index={index}
                              hovered={hovered}
                              setHovered={setHovered}
                              variant={variant}
                          />
                      ))
                : sorting === 'oldest' &&
                  cards
                      ?.sort(
                          (a, b) =>
                              new Date(a.updatedAt) - new Date(b.updatedAt)
                      )
                      ?.map((card, index) => (
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
