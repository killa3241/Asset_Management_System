"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DepartmentFilters() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0 mb-6">
      <div className="flex-1 space-y-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search departments..." className="pl-8" />
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Reset Filters</Button>
      </div>
    </div>
  )
}

