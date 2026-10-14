'use server';
import { signIn, signOut } from "@/auth";
import MongoDB from "@/config/mongoDB.config";
import Users from "@/models/user.model";
import { FormState, loginFormSchema } from "../lib/definitions";
import bcrypt from "bcryptjs";


MongoDB()

export async function logout() {
    await signOut({ redirectTo: '/' });
}

export async function login(state: FormState, formData: FormData) {
    //validation 
    const rawEmail = formData.get('email')
    const rawPassword = formData.get('password')

    const emailStr = typeof rawEmail == 'string' ? rawEmail : ''
    const passwrodStr = typeof rawPassword == 'string' ? rawPassword : ''
    
    const validate = loginFormSchema.safeParse({
        email: emailStr,
        password: passwrodStr
    })

    if(!validate.success){
        return{
            errors: validate.error.flatten().fieldErrors,
            fields: {email: emailStr}
        }
    }

    // inserting into db

    const {email, password} = validate.data

    const user = await Users.findOne({email});
    if(!user){
        return{
            errors: {email: ['Invalid Email Address.']},
            fields: {email}
        }
    }

    const isPasswrodValid = await bcrypt.compare(password, user.password)
    if(!isPasswrodValid){
        return{
            errors: {password: ['Incorrect Password']}
        }
    }


    console.log('got here at last')
    await signIn('credentials',{
        email,
        password,
        redirectTo: '/dashboard'
    })
}
export async function CheckEmailRegistered(email: string) {
    const user = await Users.findOne({email});
    return !!user
}