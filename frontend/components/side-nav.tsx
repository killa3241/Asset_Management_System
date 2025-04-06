"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building, ClipboardList, Home, Settings, PenToolIcon as Tool, Trash2, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Assets",
    href: "/assets",
    icon: ClipboardList,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Building,
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Tool,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Disposals",
    href: "/disposals",
    icon: Trash2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href ? "bg-muted font-medium" : "font-normal")}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

