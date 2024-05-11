import React from 'react';
import {database} from "@/lib/database";
import OffersList from "@/app/components/lists/OffersList";

interface OffersPageProps {
    searchParams: {
        title: string;
    }
}

const CoursesPage = async ({
                               searchParams
                           }: OffersPageProps) => {
    const offers = await database.offer.findMany({
        where: {
            name: {
                contains: searchParams.title,
                mode: 'insensitive'
            },
            time: {
                gt: new Date()
            }
        },
        include: {
            user: true
        },
    });

    return (
        <div className={'flex flex-col gap-6 p-6'}>
            <p>Актуальні пропозиції</p>
            <OffersList offers={offers}/>
        </div>
    );
};

export default CoursesPage;