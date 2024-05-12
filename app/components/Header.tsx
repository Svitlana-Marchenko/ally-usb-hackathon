'use client'
import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    User,
    AvatarIcon,
    Avatar
} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import OfferButton from "@/app/components/OfferButton";
import SubscriptionButton from "@/app/components/SubscriptionButton";
import {DoorOpen} from "lucide-react";

export default function Header () {
    function getUserIdFromLocalStorage() {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            return user.id;
        }
        return null;
    }
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userIdFromLocalStorage = getUserIdFromLocalStorage();
        setUserId(userIdFromLocalStorage);
    }, []);
    const pathname = usePathname();
    const router = useRouter();

    function clearLocalStorage() {
        localStorage.clear();
        router.push('/login')
    }
    if (!userId) {
        return null;
    }
    return (
        <Navbar>
            <NavbarBrand>
                <Link href='/offer'>
                    <Image alt='Logo' src='/logo.png' width={123} height={33}/>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color={(pathname.includes('my') && pathname.includes('offer')) ? 'primary' : 'foreground'} href="/offer/my">
                        Мої оголошення
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <div className='flex flex-row space-x-2'>
                    <OfferButton/>
                 <SubscriptionButton/>
                </div>
                <NavbarItem>
                    <Link href={`/profile/${userId}`}>
                    <Avatar
                        icon={<AvatarIcon />}
                        classNames={{
                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                            icon: "text-black/80",
                        }}
                    />
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Button isIconOnly variant='light' color='danger' onPress={clearLocalStorage}>
                        <DoorOpen/>
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};