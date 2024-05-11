'use client'

import React from "react";
import {User} from "@nextui-org/react";
import { useRouter } from 'next/navigation'

interface ProfileCardProps {
    id: string;
    name: string;
    instagram: string | null;
    telegram: string;
}

const ProfileCard = ({id, name, instagram, telegram}: ProfileCardProps) => {

    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/profile/${id}`);
    };

    return (
        <div onClick={handleNavigate} style={{cursor: 'pointer'}}>
            <User
                name={name}
                description={(
                    <>
                        <p className="text-md">tg: {telegram}</p>
                        <p className="text-md">ins: {instagram || "Not provided"}</p>
                    </>
                )}
                avatarProps={{
                    src: "",
                }}
            />
        </div>
    );
};

export default ProfileCard;
