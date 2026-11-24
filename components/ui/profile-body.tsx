'use client'

import { getUserDetails } from "@/app/action/profile"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import CandidateDetails from "../candidate-details"
import RecruiterDetails from "../recruiter-details"
import Resume from "../resume"
import RecruiterStats from "../recruiter-stats"

export default function ProfileBody() {
  const { data, status } = useSession()
  const [type, setType] = useState<string>();
  const [details, setDetails] = useState<object | null>();

  useEffect(() => {
    if (status === "loading") return;

    const email = data?.user?.email || '';
    if (!email) return;

    let cancelled = false

    async function fetchUserDetails() {
      const detailsResponse = await getUserDetails(email);
      if (cancelled) return;

      if (detailsResponse.success) {
        setType(detailsResponse.type);
        setDetails(detailsResponse.details);
      }
    }
    fetchUserDetails()
    return () => {
      cancelled = true;
    };
  }, [data?.user?.email, status])
  return (
    <div className="w-[90%] flex flex-col lg:flex-row gap-3 m-3">
      <div className="w-full lg:w-[50%] relative rounded-2xl bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-2 shadow-xl dark:shadow-2xl shadow-gray-300 dark:shadow-gray-800">
        {type == 'developer'? <CandidateDetails/> : <RecruiterDetails/>}
      </div>
      <div className="w-full lg:w-[50%] relative rounded-3xl bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-2 shadow-xl dark:shadow-2xl shadow-gray-300 dark:shadow-gray-800">
        {type == 'developer'? <Resume/> : <RecruiterStats/>}
      </div>
    </div>
  )
}
