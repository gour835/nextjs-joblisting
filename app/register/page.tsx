'use client';
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/toast";
import { SaveUser, SearchUserEmails, SearchUserNames } from "@/lib/action";
import { Reg_data } from "@/lib/type";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';


export default function Register() {
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

    async function HandleLoginSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isEmailValid || !isUsernameValid) {
            toast.add({ title: 'Please check email and username' })
            return
        }
        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload = Object.fromEntries(formData.entries());

        console.log(formData);
        const response = (await SaveUser(payload as unknown as Reg_data)).success;
        toast.add({ title: response ? 'Registerd Successfully' : 'Some Error Occured. Please Try Again After some time' });
        setTimeout(() => {
            redirect(response ? '/login' : '/')
        }, 1500);
    }
    const SearchExistingUserNames = useDebouncedCallback(async (term) => {
        console.log(term);
        const result = await SearchUserNames(term);
        setIsUsernameValid(result ? false : true);
    }, 1000)

    const SearchExistingUserEmails = useDebouncedCallback(async (term) => {
        console.log(term);
        const result = await SearchUserEmails(term);
        setIsEmailValid(result ? false : true);
    }, 1000)
    return (
        <div className="flex h-full flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-15 px-16 dark:bg-black sm:items-start">

                <h1 className="max-w-xs text-6xl mx-auto font-bold text-black dark:text-zinc-50">
                    Register
                </h1>
                <div className="w-full  text-center sm:items-start sm:text-left">
                    <div className="w-130 text-black dark:text-zinc-50 shadow-2xl p-8 shadow-mauve-600 rounded-2xl m-auto">
                        <div className="mt-15 mb-3 w-full h-full">
                            <form onSubmit={HandleLoginSubmit} >
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="email">
                                                    Enter Email Address:
                                                </FieldLabel>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="johndoe@gmail.com"
                                                    onChange={(e) => {
                                                        SearchExistingUserEmails(e.target.value);
                                                    }}
                                                    required
                                                    aria-invalid={!isEmailValid}
                                                />


                                                <FieldDescription className={`${isEmailValid ? 'hidden' : ''}`}>
                                                    This Email is Already in use.
                                                </FieldDescription>
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="username">
                                                    Enter Username:
                                                </FieldLabel>
                                                <Input
                                                    id="username"
                                                    name="username"
                                                    placeholder="john_doe@1234"
                                                    onChange={(e) => {
                                                        SearchExistingUserNames(e.target.value);
                                                    }}
                                                    required
                                                    aria-invalid={!isUsernameValid}
                                                />
                                                <FieldDescription className={`${isUsernameValid ? 'hidden' : ''}`}>
                                                    This UserName is Already Taken.
                                                </FieldDescription>
                                            </Field>
                                            <Field >
                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                <InputGroup>
                                                    <InputGroupInput
                                                        id="password"
                                                        name="password"
                                                        type={`${passwordVisible ? 'text' : 'password'}`}
                                                        placeholder="Enter password"


                                                    />
                                                    <InputGroupAddon align="inline-end">
                                                        <EyeIcon className={`${!passwordVisible ? 'hidden ' : 'cursor-pointer'}`} onClick={() => {
                                                            setPasswordVisible(false);
                                                        }} />
                                                        <EyeOffIcon className={`${passwordVisible ? 'hidden ' : 'cursor-pointer'}`} onClick={() => {
                                                            setPasswordVisible(true);
                                                        }} />
                                                    </InputGroupAddon>
                                                </InputGroup>

                                            </Field>
                                            <FieldSet className="w-full">
                                                <FieldLegend variant="label">Which Describes you the best:</FieldLegend>
                                                <RadioGroup name="category" defaultValue="developer" className="w-full">
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
                                                    <FieldLabel htmlFor="recruter">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Recruter</FieldTitle>
                                                                <FieldDescription>For individuals or firms who wants to Hire.</FieldDescription>
                                                            </FieldContent>
                                                            <RadioGroupItem value="recruter" id="recruter" />
                                                        </Field>
                                                    </FieldLabel>

                                                </RadioGroup>
                                            </FieldSet>


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
                            Already Registered? <a className="text-blue-400" href="/login">Login</a>
                        </span>
                    </div>
                </div>

            </main>
        </div>
    );
}
