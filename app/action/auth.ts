'use server';
import { auth, signIn, signOut } from "@/auth";
import MongoDB from "@/config/mongoDB.config";
import Users from "@/models/user.model";
import { FormState, loginFormSchema, RegisterFormSchema, RegisterUpdateSchema } from "../lib/definitions";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";


MongoDB()

export async function logout() {
    await signOut({ redirectTo: '/' });
}

export async function googleLogin() {
    await signIn("google", { redirectTo: '/dashboard' })
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

    if (!validate.success) {
        return {
            errors: validate.error.flatten().fieldErrors,
            fields: { email: emailStr }
        }
    }

    // checking from the db

    const { email, password } = validate.data

    const user = await Users.findOne({ email });
    if (!user) {
        return {
            errors: { email: ['Invalid Email Address.'] },
            fields: { email }
        }
    }

    const isPasswrodValid = await bcrypt.compare(password, user.password)
    if (!isPasswrodValid) {
        return {
            errors: { password: ['Incorrect Password'] },
            fields: { email }
        }
    }


    console.log('got here at last')
    await signIn('credentials', {
        email,
        password,
        redirectTo: '/dashboard'
    })
}
export async function register(state: FormState, formData: FormData) {
    //validation 
    const rawEmail = formData.get('email');
    const rawUsername = formData.get('username');
    const rawCategory = formData.get('category');
    const rawPassword = formData.get('password');

    const emailStr = typeof rawEmail == 'string' ? rawEmail : ''
    const usernameStr = typeof rawUsername == 'string' ? rawUsername : ''
    const categoryStr = typeof rawCategory == 'string' ? rawCategory : ''
    const passwrodStr = typeof rawPassword == 'string' ? rawPassword : ''

    const validate = await RegisterFormSchema.safeParseAsync({
        email: emailStr,
        username: usernameStr,
        category: categoryStr,
        password: passwrodStr
    })

    if (!validate.success) {
        return {
            errors: validate.error.flatten().fieldErrors,
            fields: { email: emailStr, username: usernameStr, category: categoryStr }
        }
    }

    // inserting into db

    const { email, username, category, password } = validate.data

    const userEmail = await Users.findOne({ email });
    if (userEmail) {
        return {
            errors: { email: ['Email Address Already In Use.'] },
            fields: { email, username, category }
        }
    }

    const userUsername = await Users.findOne({ username });
    if (userUsername) {
        return {
            errors: { email: ['This Username is Taken.'] },
            fields: { email, username, category }
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
        email,
        username,
        category,
        password: hashedPassword
    });

    await signIn('credentials', {
        email,
        password,
        redirectTo: '/dashboard'
    })
}

export async function UpdateRegister(state: FormState, formData: FormData) {
    const rawCategory = formData.get('category');
    const rawUsername = formData.get('username');
    const rawPassword = formData.get('password');

    const categoryStr = typeof rawCategory == 'string' ? rawCategory : '';
    const usernameStr = typeof rawUsername == 'string' ? rawUsername : '';
    const passwrodStr = typeof rawPassword == 'string' ? rawPassword : '';

    const validate = await RegisterUpdateSchema.safeParseAsync({
        category: categoryStr,
        username: usernameStr,
        password: passwrodStr
    })

    if (!validate.success) {
        return {
            errors: validate.error.flatten().fieldErrors,
            fields: { category: categoryStr }
        }
    }

    const { category, username, password } = validate.data;

    const Session = await auth();
    if (!Session) {
        return {
            errors: { category: ['Some Error Occurred'] },
            fields: { category }
        }
    }
    console.log(Session?.user.email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.findOneAndUpdate({ email: Session?.user.email }, { $set: { category, username, password: hashedPassword } }, {
        returnDocument: 'after', // Returns the modified document
        runValidators: true      // Ensures updates respect schema rules
    });
    console.log(user);

    Session.user.category = user.category;

    console.log(Session.user.category);

    redirect('/dashboard');

}
export async function CheckEmailRegistered(email: string) {
    const user = await Users.findOne({ email });
    return !!user
}
export async function CheckUsernameRegistered(username: string) {
    const user = await Users.findOne({ username });
    return !!user
}