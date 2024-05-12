'use client'
import React from 'react';
import Image from 'next/image'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, User} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import OfferButton from "@/app/components/OfferButton";

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
                <OfferButton/>
                <NavbarItem>
                    <User
                        name="Junior Garcia"
                        description={(
                            <Link href="profile/1" size="sm">
                                random@email.com
                            </Link>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};