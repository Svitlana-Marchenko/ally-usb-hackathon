'use client'
import React, {useEffect, useState} from 'react';
import OfferCard from "@/app/components/cards/OfferCard";
// @ts-ignore
import {Offer} from "@prisma/client";
import {DateRangePicker, Input, Select, SelectItem} from "@nextui-org/react";
import {cities, offerCategories} from "@/app/components/OfferButton";
import {DateValue} from '@internationalized/date';
import {RangeValue} from '@react-types/shared';

interface OffersListProps {
    offers: Offer [];
    linkOnClick?: string
    requestButton?: boolean
}

const CoursesList = ({offers, linkOnClick = "/offer/", requestButton = true}: OffersListProps) => {
    const [filteredOffers, setFilteredOffers] = useState(offers);
    const [category, setCategory] = useState();
    const [city, setCity] = useState();
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()


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

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);
        if (selectedCity) {
            const filteredOffers = offers.filter(offer => offer.city === selectedCity);
            setFilteredOffers(filteredOffers);
        } else {
            setFilteredOffers(offers);
        }
    };

    const handleDateChange = (selectedRange: RangeValue<DateValue>) => {
        console.log(selectedRange)
        // @ts-ignore
        const {start, end} = selectedRange;

        const startJSDate = start ? new Date(start.year, start.month - 1, start.day, 0, 0, 0, 0) : null
        const endJSDate = end ? new Date(end.year, end.month - 1, end.day, 23, 59, 59, 0) : null;

        // @ts-ignore
        setStartDate(startJSDate)
        // @ts-ignore
        setEndDate(endJSDate)

        if (selectedRange && startJSDate && endJSDate) {
            const filteredOffers = offers.filter(offer => {
                if (!offer.time) {
                    return false
                }
                const offerDate = new Date(offer.time);
                return offerDate >= startJSDate && offerDate <= endJSDate;
            });
            setFilteredOffers(filteredOffers)
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
        const idFromLS = localStorage.getItem("userId") || null
        // @ts-ignore
        setUserId(idFromLS);
    }, []);

    if (!userId) {
        return null;
    }
    return (
        <div>
            <div className={"flex flex-row gap-3"}>
                <Input type="text" label="Пошук"/>
                <DateRangePicker
                    onChange={(selectedRange) => handleDateChange(selectedRange)}
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

                <Select
                    label="Місто оголошення"
                    variant="bordered"
                    placeholder="Оберіть одне місто"
                    onChange={handleCityChange}
                >
                    {cities.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                            {animal.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex flex-col items-center gap-4 py-6">
                {filteredOffers.map((offer) => (
                    <OfferCard
                        key={offer.id}
                        id={offer.id}
                        name={offer.name || "Good time"}
                        category={offer.category || ""}
                        link={offer.link}
                        location={offer.location || "Online"}
                        time={offer.time ? new Date(offer.time).toLocaleString() : ""}
                        city={offer.city}
                        linkOnClick={linkOnClick}
                        requestButton={requestButton}
                        userId={userId}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoursesList;