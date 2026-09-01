'use server';

import { signIn } from "@/auth";
import MongoDB from "@/config/mongoDB.config";
import Users from "@/models/user.model";
import { AuthError } from "next-auth";

MongoDB();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function SearchUserNames(username: string) {
  const user = await Users.findOne({username}).lean();
  return user? JSON.stringify(user): null;
}

export async function SearchUserEmails(email: string) {
  const user = await Users.findOne({email}).lean();
   return user? JSON.stringify(user): null;
}

export async function SaveUser(formData: FormData) {
  await Users.create(Object.fromEntries(formData.entries()));
  return ({success: true});
}