/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Calendar, Notebook, PencilIcon, PencilSparklesIcon, User2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { EditProfileModel } from "../profile-header-model";
import { useEffect, useState } from "react";
import { getUserJoiningDate } from "@/app/action/profile";
import { toast } from "sonner";

export default function ProfileHeader() {
  const [joindedAt, setJoinedAt] = useState<string>();
  const { data, status } = useSession();

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (data?.user?.image) {
      setImageUrl(data?.user?.image);
    }
    else {
      setImageUrl(`https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(data?.user?.email || '')}`)
    }
  }, [data?.user?.email])
  useEffect(() => {
    if (status === "loading") return;

    const email = data?.user?.email || '';
    if (!email) return;

    let cancelled = false;

    async function fetchUserJoiningDate() {
      const response = await getUserJoiningDate(email);
      if (cancelled) return;

      if (!response.success) {
        toast.error("Error getting user details");
        console.log(response.error);
        return;
      }

      setJoinedAt(
        response.createdAt
          ? new Date(response.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
          : undefined
      );
    }

    fetchUserJoiningDate();

    return () => {
      cancelled = true;
    };
  }, [data?.user?.email, status])
  const category = data?.user?.category != null
    ? `${String(data.user.category).charAt(0).toUpperCase()}${String(data.user.category).slice(1)}`
    : "";

  const fallbackBanner = `https://api.dicebear.com/10.x/shapes/svg?seed=${encodeURIComponent(data?.user?.email || '')}`;
  return (
    <div className="w-[90%] relative rounded-3xl bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-2 shadow-xl dark:shadow-2xl shadow-gray-300 dark:shadow-gray-800">
      <div style={{ backgroundImage: `url("${encodeURI(fallbackBanner)}")` }} className={`z-10 w-full rounded-t-3xl h-32 lg:h-60 bg-cover bg-center bg-no-repeat md:max-h-60`}>

      </div>
      <div className="h-40">

      </div>
      {/* profile pic and info div */}
      <div className="flex flex-col justify-center items-center absolute top-[30%] lg:top-[50%] left-[50%] -translate-x-1/2 ">
        {imageUrl &&
          <>
            <img className="size-28 rounded-full border-4 border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800"
              src={imageUrl} alt="" referrerPolicy="no-referrer" />

          </>
        }

        <div className="font-bold text-2xl capitalize overflow-auto ">
          {data?.user.username}
        </div>
        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2 sm:gap-3 w-full min-w-0 items-center justify-center text-sm sm:text-md text-gray-600 dark:text-gray-300 overflow-x-hidden">
          <div className="category flex flex-row shrink-0 items-center justify-center gap-1">
            <User2Icon className="w-4 h-4 shrink-0 capitalize" />
            <span>{category}</span>
          </div>

          <div className="email text-blue-500 flex flex-row min-w-0 items-center justify-center gap-1">
            <Notebook className="w-4 h-4 shrink-0" />
            <span className="truncate">{data?.user.email}</span>
          </div>

          <div className="hidden joined-on lg:flex shrink-0 items-center justify-center gap-1">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Joined {joindedAt}</span>
          </div>
        </div>


      </div>

      <EditProfileModel setImageUrl={setImageUrl} imageUrl={imageUrl}>
        <button className="w-fit h-fit p-1 rounded-full bg-gray-500 text-white absolute inset-e-4 top-4 hover:bg-gray-400">
          <PencilIcon className="w-4 h-4" />
        </button>
      </EditProfileModel>
    </div>
  )
}
