import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MaintenanceTable } from "@/components/maintenance/maintenance-table"
import { MaintenanceFilters } from "@/components/maintenance/maintenance-filters"

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
        <Button asChild>
          <Link href="/maintenance/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Schedule Maintenance
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
          <CardDescription>Track and manage asset maintenance</CardDescription>
        </CardHeader>
        <CardContent>
          <MaintenanceFilters />
          <MaintenanceTable />
        </CardContent>
      </Card>
    </div>
  )
}

