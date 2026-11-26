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
import { CandidateDetailsModelForm } from "./candidate-details-model-form";

export function EditCandidateDetailsModel({  children }: { children: React.ReactElement}) {
  return (
    <Dialog >
      <DialogTrigger render={children} />
      <DialogContent className={'max-w-[100vw] sm:max-w-137.5'} >
        <DialogHeader className="border-b-2 mb-3.5 flex py-3">
          <DialogTitle>Edit Candidate Details</DialogTitle>

        </DialogHeader>
        
        <div className="no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <CandidateDetailsModelForm/>
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
