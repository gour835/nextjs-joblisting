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

export function EditProfileModel({children}: {children: React.ReactElement}) {
  return (
    <Dialog >
      <DialogTrigger render={children} />
      <DialogContent className={'max-w-[100vw] sm:max-w-137.5'} >
        <DialogHeader className="border-b-2 flex py-3">
          <DialogTitle>Edit Profile</DialogTitle>
         
        </DialogHeader>
        <div className="h-32 w-full bg-amber-50">
        
                    </div>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
         <ProfileHeaderModelForm/>
        </div>
        <DialogFooter className="border-t-2 p-3" >
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
