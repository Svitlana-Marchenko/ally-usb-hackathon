import React from "react";
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
const SubscriptionButton = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="warning" variant="shadow">Оновити план</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Оберіть зручний варіант</ModalHeader>
                            <ModalBody>
                                <div>

                                </div>
                                <Card className="py-4">
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
                                        <Chip color="primary" variant="shadow" className="absolute right-4">Free</Chip>
                                        <h4 className="font-bold text-large">Базовий рівень</h4>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">

                                    </CardBody>
                                    <CardFooter>
                                        <Button color="warning" variant="shadow" className="w-full">Обрати</Button>
                                    </CardFooter>
                                </Card>
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
