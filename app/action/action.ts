'use server'

import { db } from "@/src/prisma/db"

export async function getUsers(){
    try {
        const users = await db.orm.public.User.select("id", "username", "email").limit(2).all();
        return {success: true, users};
    } catch (error) {
        console.log('error in getting data from prisma: ', error);
        return {success: false, error};
    }

}