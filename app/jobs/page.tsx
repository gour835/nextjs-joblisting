'use server'

import { AppSidebar } from "@/components/app-sidebar"
import { CardImage } from "@/components/ImageCard"
import { SiteHeader } from "@/components/site-header"
import {  SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getJobs } from "../action/jobs"

export default async function page() {
  const JobListingsResponse = await getJobs();
  const jobs = JobListingsResponse.success ? JobListingsResponse.jobListings: [];
console.log(jobs)

  return (
    <>
   <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="grid grid-cols-3 gap-4 py-4 md:gap-6 md:py-6">
              {jobs?.map((jobs, idx)=>{
                return <CardImage key={idx}/>
               
              })}
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  )
}

