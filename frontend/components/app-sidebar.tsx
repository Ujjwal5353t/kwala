"use client";

import { Calendar, Home, Inbox, Search, Settings, Menu } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  //   SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAccount } from "@starknet-react/core"
import { ConnectButton, DisconnectButton } from "./connection/connect";

// Menu items.
const items = [
  {
    title: "Home",
    url: "",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { account } = useAccount();
  const { toggleSidebar, state } = useSidebar();

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-8 left-4 z-50 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        title="Toggle sidebar"
      >
        <Menu size={24} className="text-gray-700 dark:text-gray-300" />
      </button>

      <div className={`transition-all duration-300 overflow-hidden ${state === "collapsed" ? "w-0" : "w-[--sidebar-width]"}`}>
        <Sidebar 
          collapsible="none" 
          className="border-r h-screen"
        >
          <SidebarContent>
            <SidebarGroup>
              {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col space-y-10 top-20 mt-20">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                {account ? <DisconnectButton /> : <ConnectButton />}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  )
}
