'use client'
import ProfileBody from "./ui/profile-body";
import ProfileHeader from "./ui/profile-header";

export default function Profile() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <ProfileHeader/>
      <ProfileBody/>
    </main>
  )
}
