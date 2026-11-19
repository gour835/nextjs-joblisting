'use server';

import { db } from "@/src/prisma/db";

export default async function isProfileUpdated(user_email: string) {
    try {
        const User = await db.orm.public.User.select('category', 'id').first(({ email: user_email }));

        if (User?.category === 'developer') {
            const profile = await db.orm.public.CandidateDetails.first({ id: User.id });
            return Boolean(profile);
        }

        if (User?.category === 'recruiter') {
            const profile = await db.orm.public.RecruiterDetails.first({ id: User.id });
            return Boolean(profile);
        }

        return false

    } catch (error) {
        console.log('error checking profile: ', error);
        return { success: false, error };
    }
}