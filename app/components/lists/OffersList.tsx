'use client'
import React, {useEffect, useState} from 'react';
import OfferCard from "@/app/components/cards/OfferCard";
// @ts-ignore
import {Offer} from "@prisma/client";
import {DateRangePicker, Input, Select, SelectItem} from "@nextui-org/react";
import {offerCategories} from "@/app/components/OfferButton";

interface OffersListProps {
    offers: Offer [];
    linkOnClick?: string
}
const CoursesList = ({offers, linkOnClick = "/[userId]/"}: OffersListProps) => {
    const [filteredOffers, setFilteredOffers] = useState(offers);
    const [category, setCategory] = useState();
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        if (selectedCategory) {
            const filteredOffers = offers.filter(offer => offer.category === selectedCategory);
            setFilteredOffers(filteredOffers);
        } else {
            setFilteredOffers(offers);
        }
    };
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

    if (!userId) {
        return null;
    }
    return (
        <div>
            <Input type="text" label="Пошук" />
            <DateRangePicker
                label="Період активностей"
                className="max-w-xs"
            />
            <Select
                label="Категорія оголошень"
                variant="bordered"
                placeholder="Оберіть одну категорію"
                onChange={handleCategoryChange}
            >
                {offerCategories.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                        {animal.name}
                    </SelectItem>
                ))}
            </Select>
        <div className="flex flex-col items-center gap-4" >
            {filteredOffers.map((offer) => (
                <OfferCard
                    key={offer.id}
                    id={offer.id}
                    name={offer.name || "Good time"}
                    category={offer.category || ""}
                    link={offer.link}
                    location={offer.location || "Online"}
                    time={offer.time ? new Date(offer.time).toLocaleTimeString() : ""}
                    city={offer.city}
                    linkOnClick={linkOnClick}
                    userId={userId}
                />
            ))}
        </div>
        </div>
    );
};

export default CoursesList;