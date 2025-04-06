import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DepartmentTable } from "@/components/departments/department-table"
import { DepartmentFilters } from "@/components/departments/department-filters"

export default function DepartmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
        <Button asChild>
          <Link href="/departments/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Department
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Department Directory</CardTitle>
          <CardDescription>Manage departments and their assets</CardDescription>
        </CardHeader>
        <CardContent>
          <DepartmentFilters />
          <DepartmentTable />
        </CardContent>
      </Card>
    </div>
  )
}

