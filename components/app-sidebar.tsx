"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, LucidePersonStanding, PenSquareIcon, Briefcase, BriefcaseBusiness, FileUser, FilePlusCorner, MessageSquare } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

const NavDataDeveloper = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: (
        <BriefcaseBusiness
        />
      ),
    },
    {
      title: "Applications",
      url: "/applications",
      icon: (
        <FileUser
        />
      ),
    },
    {
      title: "Resume & ATS Analyser",
      url: "/pro",
      icon: (
        <FilePlusCorner
        />
      ),
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <CircleHelpIcon
        />
      ),
    }
  ],
  documents: [
    {
      name: "Chat",
      url: "/chat",
      icon: (
        <MessageSquare
        />
      ),
    }
  ],
}


const NavDataRecruiter = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Job Listings",
      url: "/job-listings",
      icon: (
        <PenSquareIcon
        />
      ),
    },
    {
      title: "Talent Pool",
      url: "/talent-pool",
      icon: (
        <ChartBarIcon
        />
      ),
    },
    {
      title: "Interviews",
      url: "/interviews",
      icon: (
        <FolderIcon
        />
      ),
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <CircleHelpIcon
        />
      ),
    }
  ],
  documents: [
    {
      name: "Chat",
      url: "/chat",
      icon: (
        <DatabaseIcon
        />
      ),
    },
    
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data} = useSession();
  const user = {
    name: data?.user.name ?? '',
    email: data?.user.email ?? '',
    category: data?.user.category ?? '',
    avatar: data?.user.image ?? 'avatar/shadcn.jpg'
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Next-JobListings.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data?.user.category == 'developer'?NavDataDeveloper.navMain: NavDataRecruiter.navMain} />
        <NavDocuments items={data?.user.category == 'developer'?NavDataDeveloper.documents: NavDataRecruiter.documents} />
        <NavSecondary items={data?.user.category == 'developer'?NavDataDeveloper.navSecondary: NavDataRecruiter.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
