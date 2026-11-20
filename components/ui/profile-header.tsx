/* eslint-disable @next/next/no-img-element */
'use client';

import { Calendar, Notebook, PencilIcon, PencilSparklesIcon, User2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { EditProfileModel } from "../model";

export default function ProfileHeader() {
  const { data } = useSession();
  const category = data?.user?.category != null
    ? `${String(data.user.category).charAt(0).toUpperCase()}${String(data.user.category).slice(1)}`
    : "";
  const avatarUrl =
    data?.user.image ||
    `https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent( data?.user?.email || '')}`;

    const fallbackBanner = `https://api.dicebear.com/10.x/shapes/svg?seed=${encodeURIComponent( data?.user?.email || '')}`;
  return (
    <div className="w-[90%] relative rounded-3xl bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-2 shadow-xl dark:shadow-2xl shadow-gray-300 dark:shadow-gray-800">
      <div style={{ backgroundImage: `url("${encodeURI(fallbackBanner)}")` }} className={`z-10 w-full rounded-t-3xl h-32 lg:h-60 bg-cover bg-center bg-no-repeat md:max-h-60`}>

      </div>
      <div className="h-40">

      </div>
      {/* profile pic and info div */}
      <div className="flex flex-col justify-center items-center absolute top-[30%] lg:top-[50%] left-[50%] -translate-x-1/2 ">
        <img className="size-28 rounded-full border-4 border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800"
          src={avatarUrl} alt="" />

        <div className="font-bold text-2xl capitalize">
          {data?.user.username}
        </div>
        <div className="flex flex-row gap-3 items-center justify-center text-md text-gray-600 dark:text-gray-300">
          <div className="category flex flex-row items-center justify-center gap-1">
            <User2Icon className="w-4 capitalize" />
            {category}
          </div>
          <div className="email text-blue-500 flex flex-row items-center justify-center gap-1">
            <Notebook className="w-4" />
            johnDoe.gmail.com
          </div>
          <div className="hidden  joined-on lg:flex flex-row items-center justify-center gap-1">
            <Calendar className="w-4" />
            Joined March 2025
          </div>
        </div>


      </div>

      <EditProfileModel>
        <button className="w-fit h-fit p-1 rounded-full bg-gray-500 text-white absolute inset-e-4 top-4 hover:bg-gray-400">
          <PencilIcon className="w-4 h-4" />
        </button>
      </EditProfileModel>
    </div>
  )
}
