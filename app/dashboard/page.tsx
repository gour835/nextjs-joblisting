'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import isProfileUpdated from "../action/profile"
import { toast } from "sonner"



export default function Page() {
  const {data, status} = useSession()
  const hasChecked = useRef(false);

  useEffect(() => {
    const email = data?.user?.email;
    if (status !== 'authenticated' || !email || hasChecked.current) return;

    hasChecked.current = true;

    async function getProfileInfo() {
      const updated = await isProfileUpdated(email!);
      if (!updated) {
        toast.info('Complete your profile !!');
      }
    }

    getProfileInfo();
  }, [data?.user?.email, status]);
  return (
    
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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
