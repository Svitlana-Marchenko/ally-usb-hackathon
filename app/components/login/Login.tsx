"use client"

import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {Button, Input} from "@nextui-org/react";

export const Login = () => {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
            router.push('/profile')
        } else {
            alert("Login failed: " + await response.text());
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={"flex flex-col gap-3"}>
                <Input type="email" label="Пошта" name="email" placeholder="Email" required/>
                <Input type="password" label="Пароль" name="password" placeholder="Password" required/>
                <Button type="submit">Login</Button>
            </div>
        </form>
    )
}