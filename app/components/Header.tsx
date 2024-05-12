'use client'
import React from 'react';
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
import {usePathname} from "next/navigation";
import OfferButton from "@/app/components/OfferButton";
import SubscriptionButton from "@/app/components/SubscriptionButton";

export default function Header () {
    const pathname = usePathname();
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
                <div className='space-x-2'>
                    <OfferButton/>
                 <SubscriptionButton/>
                </div>
                <NavbarItem>
                    <Link href="profile/1">
                    <Avatar
                        icon={<AvatarIcon />}
                        classNames={{
                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                            icon: "text-black/80",
                        }}
                    />
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};