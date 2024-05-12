import React from 'react';
import OfferCard from "@/app/components/cards/OfferCard";
// @ts-ignore
import {Offer} from "@prisma/client";

interface OffersListProps {
    offers: Offer [];
    linkOnClick?: string
}
const CoursesList = async ({offers, linkOnClick = "/[userId]/"}: OffersListProps) => {

    return (
        <div className="flex flex-col items-center w-full px-4" >
            {offers.map((offer) => (
                <OfferCard
                    key={offer.id}
                    id={offer.id}
                    name={offer.name || "Good time"}
                    category={offer.category || ""}
                    link={offer.link}
                    location={offer.location || "Online"}
                    time={offer.time ? new Date(offer.time).toLocaleTimeString() : ""}
                    city={offer.city}
                    linkOnClick={linkOnClick}
                />
            ))}
        </div>
    );
};

export default CoursesList;