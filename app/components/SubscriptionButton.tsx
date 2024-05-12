import React, {useEffect, useState} from "react";
import Image from 'next/image'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
    Card, CardHeader, CardBody, Chip, CardFooter
} from "@nextui-org/react";
import {usePathname} from "next/navigation";
const SubscriptionButton = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function getPlanFromLocalStorage() {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            return user.subscriptionPlan;
        }
        return null;
    }
    const [userPlan, setUserPlan] = useState(null);

    useEffect(() => {
        const userIdFromLocalStorage = getPlanFromLocalStorage();
        setUserPlan(userIdFromLocalStorage);
    }, []);

    if (!userPlan) {
        return null;
    }

    return (
        <>
            <Button onPress={onOpen} color="warning" variant="shadow">Оновити план</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size='5xl'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Оберіть зручний варіант</ModalHeader>
                            <ModalBody>
                                <div className='grid grid-cols-3 gap-2'>
                                    <Card className="py-4">
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
                                            <Chip color="primary" variant="shadow" className="absolute right-4">Free</Chip>
                                            <h4 className="font-bold text-large">Базовий рівень</h4>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <ul>
                                                <li>✅ 1 оголошення / місяць</li>
                                                <li>✅ Фільтрація лише за датою</li>
                                                <li>✅ Лише локація має пріоритет в показі оголошення</li>
                                            </ul>
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                color="warning"
                                                variant="shadow" className="w-full"
                                                isDisabled={userPlan==='free'}
                                            >Обрати</Button>
                                        </CardFooter>
                                    </Card>
                                    <Card className="py-4">
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
                                            <Chip color="warning" variant="shadow" className="absolute right-4">$4.45</Chip>
                                            <h4 className="font-bold text-large">Базовий рівень</h4>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2 space-y-2 items-center">
                                            <ul>
                                                <li>✅ Безліч оголошень</li>
                                                <li>✅ Доступні усі фільтри</li>
                                                <li>✅ До уваги беруться інтереси, освіта і тд.</li>
                                                <li>✅ Відсутність реклами</li>
                                            </ul>
                                            <Chip
                                                variant="flat"
                                                color="primary"
                                            >
                                                Для студентів -  знижка 50%
                                            </Chip>
                                        </CardBody>
                                        <CardFooter>
                                            <Button color="warning" variant="shadow" className="w-full" isDisabled={userPlan==='premium'||userPlan==='student'}>Обрати</Button>
                                        </CardFooter>
                                    </Card>
                                    <Card className="py-4">
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
                                            <Chip color="secondary" variant="shadow" className="absolute right-4">$8.85</Chip>
                                            <h4 className="font-bold text-large">Бізнес рівень</h4>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <ul>
                                                <li>✅ Все, що у комфортному</li>
                                                <li>✅ Таргет оголошень</li>
                                                <li>✅ Аналітика оголошень</li>
                                            </ul>
                                        </CardBody>
                                        <CardFooter>
                                            <Button color="warning" variant="shadow" className="w-full" isDisabled={userPlan==='company'}>Обрати</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default SubscriptionButton;
