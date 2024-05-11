'use client'

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";
import {User} from "@prisma/client";
import { useRouter } from 'next/navigation'

interface OfferCardProps {
    id: string;
    name: string;
    location: string | 'online';
    time: string | null;
    category: string;
    link: string | null;
    city: string;
    linkOnClick: string
}

const OfferCard = ({ id, name, location, time, category, link, city, linkOnClick }: OfferCardProps) => {

    const router = useRouter();

    const handleNavigate = () => {
        router.push(`${linkOnClick}${id}`);
    };

    return (
        <div onClick={handleNavigate} style={{cursor: 'pointer'}} className={"w-full"}>
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="flex justify-between items-center p-4">
                <div>
                    <p className="text-xl font-bold">{name}</p>
                    <p className="text-md">{category}</p>
                </div>
                <div>
                    {time && <p className="text-md font-medium">{time}</p>}
                </div>
            </CardHeader>
            <Divider/>
            <CardBody className="p-4">
                <p className="text-sm text-gray-500">{location}</p>
                <p className="text-sm text-gray-500">{city}</p>
            </CardBody>
            <Divider/>
            <CardFooter className="p-4">
                {link && <Link
                    isExternal
                    href={link}
                    className="text-blue-500 hover:text-blue-600 transition duration-300"
                >
                    More details here
                </Link>}
            </CardFooter>
        </Card>
        </div>
    );
};

export default OfferCard;