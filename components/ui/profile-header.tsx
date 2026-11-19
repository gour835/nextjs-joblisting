'use client';

import { PencilIcon, PencilSparklesIcon } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="w-[90%] relative rounded-3xl bg-gray-300 dark:bg-gray-800">
      <div className="z-10 w-full rounded-t-3xl h-32 lg:h-60 bg-cover bg-center bg-no-repeat md:max-h-60 bg-[url('https://images.unsplash.com/photo-1735926199195-85b726600751?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000')]">

      </div>
      <div className="h-40">

      </div>
      {/* profile pic and info div */}
      <div className="flex flex-col justify-center items-center absolute top-[30%] lg:top-[50%] left-[50%] -translate-x-1/2 ">
        <img className="size-28 rounded-full border-4 border-gray-300 dark:border-gray-800" src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=200" alt="" />

        <div className="font-bold text-2xl capitalize">
          josh Doe
        </div>
        <div className="flex flex-row gap-3">
          <div className="category">
            Developer
          </div>
          <div className="email">
            johnDoe.gmail.com
          </div>
          <div className="hidden lg:block joined-on">
            Joined March 2025
          </div>
        </div>


      </div>
        <button onClick={()=>{
          console.log('first')
        }} className="w-fit h-fit p-1 rounded-full bg-gray-500 text-white absolute inset-e-4 top-4">
          <PencilIcon className="w-4 h-4" />
        </button>
    </div>
  )
}
