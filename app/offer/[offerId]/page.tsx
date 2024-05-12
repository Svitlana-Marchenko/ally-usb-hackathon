import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Link} from "@nextui-org/react";
import {Interests} from "@prisma/client";


const OfferPage = async ({params}: { params: { offerId: string } }) => {
    // const [userId] = await database.[userId].findUnique({
    //     where: {
    //         id: params.offerId
    //     },
    //     include: {
    //     user: true
    //     }
    // })

    const offer = {
        "id": "60aeb6b998de9f001fd10122",
        "userId": "60aeb6b998de9f001fd10121",
        "name": "Hiking Adventure",
        "description": "Join us for an exciting hiking adventure in the mountains!",
        "location": "Mountain Trail",
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
        }
    }

    //todo add time

    if (!offer) {
        return (
            <p>NOT FOUND</p>
        )
    }
    return (
        <div className="p-6 flex flex-col items-center w-full">
            <Card className="p-2 w-full">
                <CardHeader className="font-semibold text-lg text-center py-2 rounded-t-lg">
                    <h3 className="text-2xl font-bold">{offer.name}</h3>
                </CardHeader>
                <CardBody className="flex flex-col items-start p-4 space-y-4">
                    <p className="text-lg">{offer.description}</p>
                    <p className="text-lg"><span className="font-semibold">Локація:</span> {offer.location}</p>
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

        </div>
    );
};

export default OfferPage;