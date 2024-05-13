import React from 'react';
import {database} from "@/lib/database";
import OffersList from "@/app/components/lists/OffersList";
import {City, OfferCategory} from "@prisma/client";

interface OffersPageProps {
    searchParams: {
        title: string;
        category?: OfferCategory;
        city?: City;
        startDate?: Date;
        endDate?: Date;
    }
}

const OffersPage = async ({
                               searchParams
                           }: OffersPageProps) => {
    const offers = await database.offer.findMany({
        where: {
            name: {
                contains: searchParams.title,
                mode: 'insensitive'
            },
            category: searchParams.category ? { equals: searchParams.category } : undefined,
            location: searchParams.city ? { equals: searchParams.city } : undefined,
            time: {
                gte: searchParams.startDate || new Date(),
                lte: searchParams.endDate || new Date('9999-12-31')
            }
        },
        include: {
            user: true
        },
    });

    return (
        <div className={'flex flex-col gap-6 p-8'}>
            <p className={"font-medium text-xl"}>Актуальні пропозиції</p>
            <OffersList offers={offers}/>
        </div>
    );
};

export default OffersPage;