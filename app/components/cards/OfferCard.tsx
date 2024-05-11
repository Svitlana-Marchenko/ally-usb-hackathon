'use client'

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";

interface OfferCardProps {
    id: string;
    name: string;
    location: string | 'online';
    time: string | null;
    category: string;
    link: string | null
}

const OfferCard = ({id, name, location, time, category, link}:OfferCardProps) => {

    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-xl">{name}</p>
                    {category !== undefined && <p className="text-md">{category}</p>}
                </div>
                <div>
                    {time !== null && <p className="text-md">{time}</p>}
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p className="text-small text-default-500">{location}</p>
            </CardBody>
            <Divider/>
            <CardFooter>
                {link && <Link
                    isExternal
                    showAnchorIcon
                    href={link}
                >
                    More details here
                </Link>}
            </CardFooter>
        </Card>
    );

};

export default OfferCard;