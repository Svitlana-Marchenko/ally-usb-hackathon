
import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {database} from "@/lib/database";
import {Link} from "@nextui-org/react";
import ProfileList from "@/app/components/lists/ProfilesList";


const OfferPage = async ({params}: { params: { myOfferId: string } }) => {
    const offer = await database.offer.findUnique({
        where: {
            id: params.myOfferId
        },
        include: {
            user: true,
            requests: {
                include: {
                    user: true
                }
            }
        }
    })

    if (offer == null) {
        return (
            <p>NOT FOUND</p>
        )
    }

    // @ts-ignore
    return (
        <div className="p-6 flex flex-col items-center w-full">
            <Card className="p-2 w-full">
                <CardHeader className="font-semibold text-lg text-center py-2 rounded-t-lg">
                    <h3 className="text-2xl font-bold">{offer.name}</h3>
                </CardHeader>
                <CardBody className="flex flex-col items-start p-4 space-y-4">
                    <p className="text-lg">{offer.description}</p>
                    <p className="text-lg"><span className="font-semibold">Локація:</span> {offer.location}, {offer.city}</p>
                    {offer.time ? <p className="text-lg"><span className="font-semibold">Дата та час:</span> {new Date(offer.time).toLocaleString()} </p> : ""}
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