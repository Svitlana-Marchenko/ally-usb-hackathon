
import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {database} from "@/lib/database";
import {Link} from "@nextui-org/react";
import ProfileList from "@/app/components/lists/ProfilesList";
import {City, Interests, User} from "@prisma/client";
import {Request} from "@prisma/client";
import {off} from "next/dist/client/components/react-dev-overlay/pages/bus";


const OfferPage = async ({params}: { params: { myOfferId: string } }) => {
    // const offer = await database.offer.findUnique({
    //     where: {
    //         id: params.myOfferId
    //     },
    //     include: {
    //         user: true,
    //         requests: {
    //             include: {
    //                 user: true
    //             }
    //         }
    //     }
    // })

    const offer = {
        "id": "60aeb6b998de9f001fd10122",
        "userId": "60aeb6b998de9f001fd10121",
        "name": "Hiking Adventure",
        "description": "Join us for an exciting hiking adventure in the mountains!",
        "location": "Mountain Trail",
        "city": City.Kyiv,
        "time": "2022-01-20T12:01:30.543Z",
        "category": "OutdoorAdventures",
        "link": "fghjk",
        "user": {
            "id": "60aeb6b998de9f001fd10121",
            "email": "example@example.com",
            "name": "John Doe",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "university": "University of Example",
            "major": "Computer Science",
            "work": "Software Engineer",
            "instagram": "john_doe",
            "telegram": "@johndoe",
            "interests": [Interests.reading]
        },
        "requests": [
            {
                "id": "60aeb6b998de9f001fd10123",
                "userId": "60aeb6b998de9f001fd10124",
                "offerId": "60aeb6b998de9f001fd10122",
                "user": {
                    "id": "60aeb6b998de9f001fd10121",
                    "email": "example@example.com",
                    "name": "John Doe",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "university": "University of Example",
                    "major": "Computer Science",
                    "work": "Software Engineer",
                    "instagram": "john_doe",
                    "telegram": "@johndoe",
                    "interests": [Interests.reading]
                }
            }
        ]
    }

    //todo add time

    if (offer == null) {
        return (
            <p>NOT FOUND</p>
        )
    }

    //todo тут треба обрати чи робити редірект на профіль нормальний чи такий як є
    // const router = useRouter();
    //
    // const handleNavigate = () => {
    //     router.push(`/profile/${offer.user.id}`);
    // };

    return (
        <div className="p-6 flex flex-col items-center w-full">
            <Card className="p-2 w-full">
                <CardHeader className="font-semibold text-lg text-center py-2 rounded-t-lg">
                    <h3 className="text-2xl font-bold">{offer.name}</h3>
                </CardHeader>
                <CardBody className="flex flex-col items-start p-4 space-y-4">
                    <p className="text-lg">{offer.description}</p>
                    <p className="text-lg"><span className="font-semibold">Локація:</span> {offer.location}, {offer.city}</p>
                    <p className="text-lg"><span className="font-semibold">Організатор: </span>
                        <Link

                            href={`/profile/${offer.user.id}`}
                            className="text-blue-500 hover:text-blue-600 transition duration-300"
                        >
                            {offer.user.name}
                        </Link>
                    </p>
                    <p className="text-lg"><span className="font-semibold">Категорія:</span> {offer.category}</p>
                    {offer.link && <Link
                        isExternal
                        showAnchorIcon
                        href={offer.link}
                    >
                        More details here
                    </Link>
                    }
                </CardBody>
            </Card>
            <p className="text-xl font-semibold my-4 w-full text-center py-2 rounded-md">Хочуть піти</p>
            <ProfileList users={offer.requests.map(request => request.user)} />
        </div>
    );
};

export default OfferPage;