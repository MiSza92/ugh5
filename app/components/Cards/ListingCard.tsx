"use client";
import Listing from "../../schemas/listing";

import Image from "next/image";

interface ListingCardProps {
  data: Listing;
  onAction?: (id: String) => void;
  actionLabel?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  actionLabel,
}) => {
  return (
    <div
      className="
      z-0
      col-span-1
    cursor-pointer
    group 
"
    >
      <div className="flex flex-col gap-2 w-full h-56">
        <div
          className="
        aspect-square
       
        relative
        overflow-hidden
        rounded-xl
        w-40"
        >
          <Image
            fill
            alt="Listing"
            src={data.images[0]}
            className="
            object-cover
            h-full
            w-full
            group-hover:scale-110
            transition"
          />
        </div>
        <div className="font-semibold text-lg">{data.location}</div>
        <div className="font-light text-neutral-500">{data.tasks}</div>
      </div>
    </div>
  );
};

export default ListingCard;
