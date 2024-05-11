import React from 'react';
import OfferCard from "@/app/components/cards/OfferCard";
// @ts-ignore
import {Offer} from "@prisma/client";

interface OffersListProps {
    offers: Offer [];
}
const CoursesList = async ({offers}: OffersListProps) => {

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
            {offers.map((offer) => {
                return(<OfferCard
                        key={offer.id}
                        id={offer.id}
                        name={offer.name == null ? "Good time" : offer.name}
                        category={offer.category == null ? "" : offer.category}
                        description={offer.description}
                        link={offer.link}
                        location={offer.location == null ? "Online" : offer.location}
                        time={offer.time == null ? "-" : offer.time.toTimeString()}/>
                )})}
        </div>
    );
};

export default CoursesList;