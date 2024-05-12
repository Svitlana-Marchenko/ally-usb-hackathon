import React from 'react';
import {database} from "@/lib/database";
import OffersList from "@/app/components/lists/OffersList";
import {City, OfferCategory} from "@prisma/client";
import {Input} from "@nextui-org/react";
import {DateRangePicker} from "@nextui-org/react";
import OfferButton from "@/app/components/OfferButton";

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

    // const cityOptions = Object.values(City).map(key => ({
    //     value: key,
    //     label: key
    // }));

    return (
        <div className={'flex flex-col gap-6 p-8'}>
            <p className={"font-medium text-xl"}>Актуальні пропозиції</p>
            {/*<Select label="Select a City" className="max-w-xs">*/}
            {/*    {cityOptions.map((city) => (*/}
            {/*        <SelectItem key={city.value} value={city.value}>*/}
            {/*            {city.label}*/}
            {/*        </SelectItem>*/}
            {/*    ))}*/}
            {/*</Select>*/}

            <OffersList offers={offers}/>
        </div>
    );
};

export default OffersPage;