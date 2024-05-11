import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/react";
import {database} from "@/lib/database";
import {Interests} from "@prisma/client";
import {Chip} from "@nextui-org/react";


const ProfilePage = async ({params}: { params: { profileId: string }}) => {
    // const user = await database.user.findUnique({
    //     where: {
    //         id: params.profileId
    //     },
    //     include: {
    //
    //     }
    // })

    const user =  {
        "id": "60aeb6b998de9f001fd10121",
            "email": "example@example.com",
            "name": "John Doe",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "university": "University of Example",
            "major": "Computer Science",
            "work": "Software Engineer",
            "instagram": "john_doe",
            "telegram": "@johndoe",
            "interests": [Interests.reading, Interests.baseball]
    }

    if(user == null){
        return (
            <p>NOT FOUND</p>
        )
    }
    return (
        <div className="flex flex-col items-center w-full p-6 py-16">
            <Card className="w-full max-w-4xl shadow-xl">
                <CardBody className="flex flex-col items-center space-y-4 p-4">
                    <Avatar name={user.name} size="lg"/>
                    <h3 className="text-3xl font-bold">{user.name}</h3>
                    <p className="text-xl">{user.description}</p>
                    <p className="text-xl"><strong>Університет:</strong> {user.university}</p>
                    <p className="text-xl"><strong>Спеціальність:</strong> {user.major}</p>
                    <p className="text-xl"><strong>Робота:</strong> {user.work}</p>
                    <div className="flex flex-row gap-3">{user.interests.map(x => <Chip >{x}</Chip>)}</div>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProfilePage;