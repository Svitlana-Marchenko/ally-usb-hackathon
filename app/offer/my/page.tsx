import React from 'react';
import {database} from "@/lib/database";
import OffersList from "@/app/components/lists/OffersList";
import {Interests, City, OfferCategory} from "@prisma/client";

interface OffersPageProps {
    searchParams: {
        title: string;
    }
}

const CoursesPage = async ({
                               searchParams
                           }: OffersPageProps) => {

    const userId = "60aeb6b998de9f001fd10121" //todo change it to current user id

    // const offers = await database.[userId].findMany({
    //     where: {
    //         userId: userId
    //     },
    //     include: {
    //        // user: true
    //     },
    // });

    const offers = [{
        "id": "60aeb6b998de9f001fd10122",
        "userId": "60aeb6b998de9f001fd10121",
        "name": "Hiking Adventure",
        "description": "Join us for an exciting hiking adventure in the mountains!",
        "location": "Mountain Trail",
        "city": City.Kyiv,
        "time": null,
        "category": OfferCategory.ArtisticOutings,
        "link": "fghjk",
        // "user": {
        //     "id": "60aeb6b998de9f001fd10121",
        //     "email": "example@example.com",
        //     "name": "John Doe",
        //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        //     "university": "University of Example",
        //     "major": "Computer Science",
        //     "work": "Software Engineer",
        //     "instagram": "john_doe",
        //     "telegram": "@johndoe",
        //     "interests": [Interests.reading]
        // }
    }]

    return (
        <div className={'flex flex-col gap-6 p-6'}>
            <p className={"text-center text-xl"}>Ваші пропозиції</p>
            <OffersList offers={offers} linkOnClick={"/[userId]/my/"}/>
        </div>
    );
};

export default CoursesPage;