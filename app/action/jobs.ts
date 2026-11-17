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

        const total = await db.orm.public.Jobs
            .aggregate((a) => ({ total: a.count() }));
        return { success: true, jobListings, total : Math.floor(total.total/pageSize) }
    } catch (error) {
        console.log('error in fetching data: ', error);
        return { success: false, error }
    }

}