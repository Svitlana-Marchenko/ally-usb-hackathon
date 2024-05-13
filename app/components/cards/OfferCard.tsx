'use client'

import React, {useEffect, useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import {Button} from "@nextui-org/button";
import axios from "axios";

interface OfferCardProps {
    id: string;
    userId: string;
    name: string;
    location: string | 'online';
    time: string | null;
    category: string;
    link: string | null;
    city: string;
    linkOnClick: string
    requestButton: boolean
}

const OfferCard = ({ id, userId, name, location, time, category, link, city, linkOnClick, requestButton }: OfferCardProps) => {

    const router = useRouter();

    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        // @ts-ignore
        const currentUserId : string = localStorage.getItem("userId") || null
        // @ts-ignore
        setCurrentId(currentUserId)
    }, []);


    const handleNavigate = () => {
        router.push(`${linkOnClick}${id}`);
    };

    const createRequest = async () => {
        try {
            await axios.post(`/api/${userId}/offer/${id}`);
            router.refresh();
        } catch {
            console.error("cant create offer");
        }
    }
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
            <CardBody className="p-4 flex flex-row justify-between">
                <div>
                    <p className="text-sm text-gray-500">{location}</p>
                    <p className="text-sm text-gray-500">{city}</p>
                </div>
                {requestButton && <Button color='primary' onPress={createRequest}>Відгукнутись</Button>}
            </CardBody>
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