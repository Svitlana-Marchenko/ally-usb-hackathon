'use client'
import React, {useState} from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input, Textarea, Select, SelectItem, DatePicker
} from "@nextui-org/react";
import {City, OfferCategory} from "@prisma/client";
import axios from "axios"
import {useRouter} from "next/navigation";
import {getLocalTimeZone, now} from "@internationalized/date";
/*
    id          String         @id @default(auto()) @map("_id") @db.ObjectId
  userId      String         @db.ObjectId
  user        User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  description String
  city        City
  location    String
  time        DateTime?
  category    OfferCategory
  link        String?
  requests    Request[]
  */
type newOffer ={
    name: string;
    description: string;
    city: City;
    location: string;
    time: Date;
    category: OfferCategory;
    link?: string;
}
export const offerCategories = [
    { value: "OutdoorAdventures", name: "Пригоди на відкритому повітрі" },
    { value: "CulturalTreks", name: "Культурні походи" },
    { value: "NightlifeExcursions", name: "Вечірні екскурсії" },
    { value: "CafeAndEateryTours", name: "Кафе та екскурсії по закладах громадського харчування" },
    { value: "ArtisticOutings", name: "Мистецькі виходи" },
    { value: "WorkshopSeries", name: "Серії майстер-класів" },
    { value: "MasterclassSessions", name: "Сесії майстерності" },
    { value: "LearningTogether", name: "Навчання разом" }
];
export const cities = [
    { value: "Kyiv", name: "Київ" },
    { value: "Lviv", name: "Львів" },
    { value: "Odesa", name: "Одеса" },
    { value: "Dnipro", name: "Дніпро" },
    { value: "Kharkiv", name: "Харків" }
];
const OfferButton = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [link, setLink] = useState();
    const [city, setCity] = useState();
    const [time, setTime] = useState();
    const [category, setCategory] = useState();

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    const createOffer = async (onClose) => {
        const dateTime = new Date(
            time.year,
            time.month - 1, // JavaScript months are 0-indexed
            time.day,
            time.hour,
            time.minute,
            time.second,
            time.millisecond
        );
        const dateTimePrisma = new Date(dateTime).toISOString();
        const offer: newOffer = {
            name, location, time: dateTime, category, link, city, description
        }
        const userId = "664068a1014c9362408c4d27"
        try {
            await axios.post(`/api/${userId}/offer`, offer)
                .then((response) => console.log(response.data));
            router.refresh();
        } catch {
            console.error("cant create offer");
        }
        onClose();
    }
    return (
        <>
        <Button color="primary" variant="flat"  onPress={onOpen}>
            Додати оголошення
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Нове оголошення</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Назва"
                                placeholder="Як називатиметься ваше оголошення?"
                                value={name}
                                onValueChange={setName}
                            />
                            <Textarea
                                label="Опис"
                                placeholder="Опишіть оголошення більш детально"
                                value={description}
                                onValueChange={setDescription}
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
                            <DatePicker
                                label="Дата"
                                onChange={setTime}
                                hideTimeZone
                                showMonthAndYearPickers
                                defaultValue={now(getLocalTimeZone())}
                            />
                            <Select
                                label="Місто"
                                variant="bordered"
                                placeholder="Виберіть одне місто"
                                onChange={handleCityChange}
                            >
                                {cities.map((animal) => (
                                    <SelectItem key={animal.value} value={animal.value}>
                                        {animal.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                label="Адреса"
                                placeholder="Дайте точну адресу місця"
                                value={location}
                                onValueChange={setLocation}
                            />
                            <Input
                                label="Посилання"
                                placeholder="За бажанням додайте корисне посилання"
                                value={link}
                                onValueChange={setLink}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Скасувати
                            </Button>
                            <Button color="primary" onPress={() => {createOffer(onClose)}}>
                                Додати
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
    );
};

export default OfferButton;