/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import { ProfileHeaderModelForm } from "./profile-header-model-form"
import { useSession } from "next-auth/react"

export function EditProfileModel({ imageUrl, setImageUrl, children }: { children: React.ReactElement, imageUrl: string, setImageUrl: (newUrl: string) => void }) {
  const { data } = useSession();


  const fallbackBanner = `https://api.dicebear.com/10.x/shapes/svg?seed=${encodeURIComponent(data?.user?.email || '')}`;


  return (
    <Dialog >
      <DialogTrigger render={children} />
      <DialogContent className={'max-w-[100vw] sm:max-w-137.5'} >
        <DialogHeader className="border-b-2 mb-3.5 flex py-3">
          <DialogTitle>Edit Profile</DialogTitle>

        </DialogHeader>
        <div style={{ backgroundImage: `url("${encodeURI(fallbackBanner)}")` }} className="relative h-32 mb-4 scale-110 w-full bg-cover bg-center bg-no-repeat">
          <img className="absolute top-20 left-6 size-20 rounded-full border-4 border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800"
            src={imageUrl} alt="user profile-pic" />
        </div>
        <div className="no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <ProfileHeaderModelForm setImageUrl={setImageUrl} />
        </div>
        <DialogFooter className="border-t-2 p-3" >
          <DialogClose render={<button className={'bg-purple-700 py-1 px-2 rounded-3xl font-semibold border border-green-400 hover:bg-purple-800'} />}>
            Submit
          </DialogClose>
          <DialogClose render={<Button variant="outline" />}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
