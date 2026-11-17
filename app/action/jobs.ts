'use server'

import { db } from "@/src/prisma/db"

export async function getJobs(page = 1) {
    try {
        const pageSize = 20;
        const offset = (page - 1) * pageSize;
    
        const jobListings = await db.orm.public.Jobs
            .orderBy((j) => j.createdAt.desc())
            .limit(pageSize)
            .offset(offset)
            .all();
        return {success: true, jobListings}
    } catch (error) {
        console.log('error in fetching data: ', error);
        return {success: false, error}
    }

}