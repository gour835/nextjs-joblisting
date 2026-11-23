'use server';

import { db } from "@/src/prisma/db";

export async function isProfileUpdated(user_email: string) {
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

export async function getUserJoiningDate(user_email:string) {
    try {
        const user = await db.orm.public.User.select('createdAt').first({email: user_email});
        if (!user){
            return {success: false, error: 'no user with this email'};
        }
        return {success: true, createdAt : user.createdAt};
        
    } catch (error) {
        console.log('error fethcing profile created at: ', error);
        return {success: false, error};
    }
}

export async function getUserInfo(user_email: string){
    try {
        const user = await db.orm.public.User.select('category','email', 'username', 'image').first({email: user_email});
        if(!user){
            return {success: false, error: 'User not found'};
        }
        return {success: true, user};
    } catch (error) {
        console.log('error geting user information for profile: ', error);
        return {success: false, error};
    }
}

export async function getUserDetails(user_email: string){
    try {
        const user = await db.orm.public.User.first({email: user_email});

        if(user?.category == 'developer'){
            const CandidateDetails= await db.orm.public.CandidateDetails.first({id: user?.id});
            return {success: true, type: 'developer', details: CandidateDetails};
        }else{
            const RecruiterDetails = await db.orm.public.RecruiterDetails.first({id: user?.id});
            return {success: true, type: 'recruiter', details: RecruiterDetails};
        }
    } catch (error) {
        console.log('error getting user details for profile: ', error);
        return {success: false, error};
    }
}