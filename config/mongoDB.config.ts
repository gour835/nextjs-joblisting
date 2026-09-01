import mongoose from "mongoose";

export default async function MongoDB() {
     mongoose.connection.on('connected', ()=>{
        console.log("Database Connected");
    });

    mongoose.connect(`${process.env.DATABASE_URL}/nextJobs`);
}