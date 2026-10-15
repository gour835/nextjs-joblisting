'use client';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

import { useSearchParams } from "next/navigation";
import React, { useActionState } from "react";
import { login } from "../action/auth";
import SignIn from "@/components/signIn";


export default function Login() {
    const [state, action, isPending] = useActionState(login, undefined)
    return (
        <div className="flex h-screen flex-col items-center justify-center font-sans dark:bg-black">
            <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">

                <h1 className="max-w-xs text-6xl mx-auto font-bold text-black dark:text-zinc-50">
                    Login
                </h1>
                <div className="w-full  text-center sm:items-start sm:text-left">
                    <div className="w-130 text-black dark:text-zinc-50 shadow-2xl p-8 shadow-mauve-600 rounded-2xl m-auto">
                        <div className="mt-15 mb-4 w-full">
                            <form action={action} >
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
                                                {/* {state?.errors?.email && <p className="text-red-400 mt-1 text-sm">{state.errors.email}</p>} */}
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
                                                    
                                                </InputGroup>

                                                {state?.errors?.password && <p className="text-red-400 mt-1 text-sm">{state.errors.password}</p>}

                                            </Field>

                                        </FieldGroup>
                                    </FieldSet>
                                    <Field orientation="horizontal">
                                        <Button type="submit" aria-disabled={isPending}>Submit</Button>

                                       
                                    </Field>
                                   

                                    <div
                                        className="flex h-8 items-end space-x-1"
                                        aria-live="polite"
                                        aria-atomic="true"
                                    >
                                       

                                        
                                    </div>

                                </FieldGroup>
                            </form>
                        </div>
                         <SignIn/>
                        <span>
                            Not Registered yet? <a className="text-blue-400" href="/register">Register</a>
                        </span>
                    </div>
                </div>


            </main>
        </div>
    );
}
