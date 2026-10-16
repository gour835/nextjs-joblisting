'use client';
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useActionState } from "react";
import { register } from "../action/auth";
import SignIn from "@/components/signIn";



export default function Register() {
    const [state, action, isPending] = useActionState(register, undefined)
    return (
        <div className="flex h-full flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-15 px-16 dark:bg-black sm:items-start">

                <h1 className="max-w-xs text-6xl mx-auto font-bold text-black dark:text-zinc-50">
                    Register
                </h1>
                <div className="w-full  text-center sm:items-start sm:text-left">
                    <div className="w-130 text-black dark:text-zinc-50 shadow-2xl p-8 shadow-mauve-600 rounded-2xl m-auto">
                        <div className="mt-15 mb-3 w-full h-full">
                            <form action={action} >
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="email">
                                                    Enter Email Address:
                                                </FieldLabel>
                                                <Input
                                                    key={state?.fields?.email}
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="johndoe@gmail.com"
                                                    defaultValue={state?.fields?.email || ''}
                                                    aria-invalid={state?.errors?.email && true}
                                                    required
                                                />

                                                {state?.errors?.email && <p className="text-red-400 mt-1 text-sm">{state.errors.email}</p>}
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="username">
                                                    Enter Username:
                                                </FieldLabel>
                                                <Input
                                                    key={state?.fields?.username}
                                                    id="username"
                                                    name="username"
                                                    placeholder="john_doe@1234"
                                                    defaultValue={state?.fields?.username || ''}
                                                    aria-invalid={state?.errors?.username && true}
                                                    required
                                                />
                                                {state?.errors?.username && <p className="text-red-400 mt-1 text-sm">{state.errors.username}</p>}
                                            </Field>
                                            <Field >
                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                <InputGroup className="flex flex-col">
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type={` 'password'`}
                                                        placeholder="Enter password"


                                                    />
                                                </InputGroup>
                                                 {state?.errors?.password &&

                                                        <div className="">
                                                            <p className="text-red-400 mt-1 text-sm">Password Must:</p>
                                                            {state.errors.password.map((error, index) => {
                                                                return (
                                                                    <p key={index} className="text-red-400 mt-1 text-sm">{error}</p>
                                                                )
                                                            })}

                                                        </div>

                                                    }

                                            </Field>
                                            <FieldSet className="w-full">
                                                <FieldLegend variant="label">Which Describes you the best:</FieldLegend>
                                                <RadioGroup name="category"  className="w-full">
                                                    <FieldLabel htmlFor="developer">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Developer</FieldTitle>
                                                                <FieldDescription>
                                                                    For individuals who wants to be Hired.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <RadioGroupItem value="developer" id="developer" />
                                                        </Field>
                                                    </FieldLabel>
                                                    <FieldLabel htmlFor="recruiter">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Recruiter</FieldTitle>
                                                                <FieldDescription>For individuals or firms who wants to Hire.</FieldDescription>
                                                            </FieldContent>
                                                            <RadioGroupItem value="recruiter" id="recruiter" />
                                                        </Field>
                                                    </FieldLabel>

                                                </RadioGroup>
                                                {state?.errors?.category && <p className="text-red-400 mt-1 text-sm">{state.errors.category}</p>}
                                            </FieldSet>


                                        </FieldGroup>
                                    </FieldSet>
                                    <Field orientation="horizontal" className="mb-4">
                                        <Button type="submit" aria-disabled={isPending}>Submit</Button>
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Field>

                                </FieldGroup>
                            </form>
                            <SignIn/>
                        </div>
                        <span className="mt-4">
                            Already Registered? <a className="text-blue-400" href="/login">Login</a>
                        </span>
                    </div>
                </div>

            </main>
        </div>
    );
}
