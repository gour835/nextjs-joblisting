'use client';
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useActionState, useState } from "react";
import { register, UpdateRegister } from "../action/auth";
import SignIn from "@/components/signIn";
import { useSession } from "next-auth/react";

type CustomUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    category?: string;
    username?: string;
};


export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isRecruter, setIsRecruter] = useState(false);
    const [RegisterState, RegisterAction, RegisterIsPending] = useActionState(register, undefined);
    const [RegisterUpdateState, RegisterUpdateAction, RegisterUpdateIsPending] = useActionState(UpdateRegister, undefined);
    const { data, status } = useSession();
    const user = data?.user as CustomUser | undefined;

    const formAction = status == 'authenticated' && !user?.category ? RegisterUpdateAction : RegisterAction;
    const formState = status == 'authenticated' && !user?.category ? RegisterUpdateState : RegisterState;
    const formIsPending = status == 'authenticated' && !user?.category ? RegisterUpdateIsPending : RegisterIsPending;
    console.log('from client', status, data)

    let emailDefault = formState?.fields?.email || (status === 'authenticated' ? user?.email || '' : '');
    let usernameDefault = formState?.fields?.username || (status === 'authenticated' ? user?.username || '' : '');

    if (status == 'authenticated' && !data?.user?.category) {
        if (data?.user?.email) {
            console.log(data.user.email);
            emailDefault = data.user.email;
        }
        if (data?.user?.username) {
            console.log(data.user.username);
            usernameDefault = data.user.username
        }
    }
    return (
        <div className="flex h-full flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-15 px-16 dark:bg-black sm:items-start">

                <h1 className="max-w-xs text-6xl mx-auto font-bold text-black dark:text-zinc-50">
                    Register
                </h1>
                <div className="w-full  text-center sm:items-start sm:text-left">
                    <div className="lg:w-130 text-black dark:text-zinc-50 shadow-2xl p-8 shadow-mauve-600 rounded-2xl m-auto">
                        <div className="mt-15 mb-3 w-full h-full">
                            <form action={formAction} >
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="email">
                                                    Enter Email Address:
                                                </FieldLabel>
                                                <Input
                                                    key={emailDefault}
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="johndoe@gmail.com"
                                                    defaultValue={emailDefault}
                                                    disabled={status == 'authenticated' && !data?.user?.category ? true : false}
                                                    aria-disabled={status == 'authenticated' && !data?.user?.category ? true : false}
                                                    className={status == 'authenticated' && !data?.user?.category ? 'hover:cursor-no-drop' : ''}
                                                    aria-invalid={formState?.errors && 'email' in formState.errors && formState.errors.email && true}
                                                    required
                                                />

                                                {formState?.errors && 'email' in formState.errors && formState.errors.email && <p className="text-red-400 mt-1 text-sm">{formState.errors.email}</p>}
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="username">
                                                    Enter Username:
                                                </FieldLabel>
                                                <Input
                                                    key={usernameDefault}
                                                    id="username"
                                                    name="username"
                                                    placeholder="john_doe@1234"
                                                    defaultValue={usernameDefault}
                                                    // disabled={status == 'authenticated' && !data?.user?.category ? true : false}
                                                    // aria-disabled={status == 'authenticated' && !data?.user?.category ? true : false}
                                                    aria-invalid={formState?.errors && 'username' in formState.errors && formState.errors.username && true}
                                                    required
                                                />
                                                {formState?.errors && 'username' in formState.errors && formState.errors.username && <p className="text-red-400 mt-1 text-sm">{formState.errors.username}</p>}
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                <InputGroup className="flex flex-col">
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter password"
                                                        onFocus={() => setIsFocused(true)}
                                                        onBlur={() => setIsFocused(false)}
                                                        onDoubleClick={() => setShowPassword(!showPassword)}
                                                        className="cursor-pointer"
                                                    />
                                                </InputGroup>

                                                {/* Only shows when the input is focused */}
                                                {isFocused && (
                                                    <p className="text-xs text-muted-foreground mt-1 animate-fade-in">
                                                        💡 Double-click the box to {showPassword ? 'hide' : 'reveal'} password
                                                    </p>
                                                )}

                                                {formState?.errors && 'password' in formState.errors && formState.errors.password && (
                                                    <div className="">
                                                        <p className="text-red-400 mt-1 text-sm">Password Must:</p>
                                                        {formState.errors.password.map((error, index) => (
                                                            <p key={index} className="text-red-400 mt-1 text-sm">{error}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </Field>
                                            <FieldSet className="w-full">
                                                <FieldLegend variant="label">Which Describes you the best:</FieldLegend>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        console.log(value);
                                                        if (value == 'recruiter') {
                                                            setIsRecruter(true);
                                                        } else {
                                                            setIsRecruter(false);
                                                        }

                                                    }}
                                                    name="category"
                                                    className="w-full">
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
                                                {formState?.errors && 'category' in formState.errors && formState.errors.category && (
                                                    <p className="text-red-400 mt-1 text-sm">{formState.errors.category}</p>
                                                )}
                                            </FieldSet>

                                            {isRecruter && <Field>
                                                <FieldLabel htmlFor="companyWebsite">
                                                    Enter Company Website Link:
                                                </FieldLabel>
                                                <Input
                                                    id="companyWebsite"
                                                    name="companyWebsite"
                                                    placeholder="john_doe_company.com"
                                                    // disabled={status == 'authenticated' && !data?.user?.category ? true : false}
                                                    // aria-disabled={status == 'authenticated' && !data?.user?.category ? true : false}
                                                    aria-invalid={formState?.errors?.companyWebsite && true}
                                                    required
                                                />
                                                {formState?.errors?.companyWebsite && <p className="text-red-400 mt-1 text-sm">{formState.errors.companyWebsite}</p>}
                                            </Field>}


                                        </FieldGroup>
                                    </FieldSet>
                                    <Field orientation="horizontal" className="mb-4">
                                        <Button type="submit" aria-disabled={formIsPending}>Submit</Button>
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Field>

                                </FieldGroup>
                            </form>
                            <SignIn />
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
