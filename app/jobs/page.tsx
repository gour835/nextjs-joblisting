'use server'

import { AppSidebar } from "@/components/app-sidebar"
import { CardImage } from "@/components/ImageCard"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getJobs } from "../action/jobs"
import SimplePagination from "@/components/simplePagination"

export default async function page() {
  const JobListingsResponse = await getJobs();
  const jobs = JobListingsResponse.success ? JobListingsResponse.jobListings : [];
  const jobsTotal = JobListingsResponse.success ? JobListingsResponse.total : 1;
  console.log(jobsTotal)

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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-4 md:gap-6 md:py-6">
                {jobs?.map((jobs, idx) => {
                  return <CardImage key={idx} />
                })}

              </div>
              <div>
                <SimplePagination total={ jobsTotal}/>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

