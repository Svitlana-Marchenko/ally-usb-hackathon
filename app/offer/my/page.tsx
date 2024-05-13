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

     const userId = "664068a1014c9362408c4d27" //todo change it to current user id

    const offers = await database.offer.findMany({
        where: {
            userId: userId
        }
    });

    return (
        <div className={'flex flex-col gap-6 p-6'}>
            <p className={"text-center text-xl"}>Ваші пропозиції</p>
            <OffersList offers={offers} linkOnClick={"/offer/my/"} requestButton={false}/>
        </div>
    );
};

export default CoursesPage;