import {JWTPayload} from 'jose'
import * as z from "zod";
import { CheckEmailRegistered } from "../action/auth";

export const RegisterFormSchema = z.object({
    name: z
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z
        .email({ error: 'Please Enter a Valid Email' })
        .refine(async (email) => {
            const isRegisteredEmail = await CheckEmailRegistered(email);
            return !isRegisteredEmail
        }, {
            message: 'This Email is Already in Use'
        })
        .trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),

})

export const loginFormSchema = z.object({
    email: z
        .email({ error: 'Please Enter a Valid Email' })
        .trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .trim(),

})

export type FormState =
  | {
    errors?: {
      name?: string[]
      email?: string[]
      password?: string[]
    }
    message?: string;
    fields?: {
        email?: string;
      };
  }
  | undefined

  export interface SessionPayload extends JWTPayload {
  userId: string;
  // You can optionally add other non-sensitive fields here, for example:
  // email?: string;
  // role?: 'user' | 'admin';
}