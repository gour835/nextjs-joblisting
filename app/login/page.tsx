'use client';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { EyeOffIcon } from "lucide-react";
import React from "react";


export default function Login() {

    async function HandleLoginSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        console.log(email, password);


    }
    return (
        <div className="flex h-screen flex-col items-center justify-center font-sans dark:bg-black">
            <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">

                <h1 className="max-w-xs text-6xl mx-auto font-bold text-black dark:text-zinc-50">
                    Login
                </h1>
                <div className="w-full  text-center sm:items-start sm:text-left">
                    <div className="w-130 text-black dark:text-zinc-50 shadow-2xl p-8 shadow-mauve-600 rounded-2xl m-auto">
                        <div className="mt-15 mb-4 w-full">
                            <form onSubmit={HandleLoginSubmit} >
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="email">
                                                    Enter Username/Email Address:
                                                </FieldLabel>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    placeholder="john doe"
                                                    required
                                                />
                                            </Field>
                                            <Field >
                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                <InputGroup>
                                                    <InputGroupInput
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="Enter password"


                                                    />
                                                    <InputGroupAddon align="inline-end">
                                                        <EyeOffIcon />
                                                    </InputGroupAddon>
                                                </InputGroup>

                                            </Field>

                                        </FieldGroup>
                                    </FieldSet>
                                    <Field orientation="horizontal">
                                        <Button type="submit">Submit</Button>
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Field>

                                </FieldGroup>
                            </form>
                        </div>
                            <span>
                                Not Registered yet? <a className="text-blue-400" href="/register">Register</a>
                            </span>
                    </div>
                </div>


            </main>
        </div>
    );
}
