import React from 'react';
// @ts-ignore
import {User} from "@prisma/client";
import ProfileCard from "@/app/components/cards/ProfileCard";

interface UsersListProps {
    users: User [];
}
const ProfileList = async ({users}: UsersListProps) => {

    return (
        <div className="grid grid-cols-1 gap-2">
            {users.map((user) => {
                return(<ProfileCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        instagram={user.instagram}
                        telegram={user.telegram}
                    />
                )})}
        </div>
    );
};

export default ProfileList;