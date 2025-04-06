"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, ClipboardList } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const departments = [
  {
    id: "D001",
    name: "Information Technology",
    head: "John Smith",
    employeeCount: 42,
    assetCount: 156,
    budget: 500000,
    location: "Headquarters - Floor 3",
  },
  {
    id: "D002",
    name: "Human Resources",
    head: "Sarah Johnson",
    employeeCount: 15,
    assetCount: 45,
    budget: 250000,
    location: "Headquarters - Floor 2",
  },
  {
    id: "D003",
    name: "Finance",
    head: "Michael Brown",
    employeeCount: 28,
    assetCount: 84,
    budget: 450000,
    location: "Headquarters - Floor 4",
  },
  {
    id: "D004",
    name: "Marketing",
    head: "Emily Davis",
    employeeCount: 22,
    assetCount: 66,
    budget: 350000,
    location: "Headquarters - Floor 2",
  },
  {
    id: "D005",
    name: "Operations",
    head: "Robert Wilson",
    employeeCount: 35,
    assetCount: 105,
    budget: 400000,
    location: "Headquarters - Floor 1",
  },
  {
    id: "D006",
    name: "Research & Development",
    head: "Jennifer Lee",
    employeeCount: 18,
    assetCount: 72,
    budget: 600000,
    location: "Research Campus",
  },
  {
    id: "D007",
    name: "Customer Support",
    head: "David Miller",
    employeeCount: 30,
    assetCount: 60,
    budget: 300000,
    location: "Support Center",
  },
]

export function DepartmentTable() {
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedDepartments = [...departments].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" onClick={() => handleSort("id")} className="px-0 font-medium">
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")} className="px-0 font-medium">
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("head")} className="px-0 font-medium">
                Department Head
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button variant="ghost" onClick={() => handleSort("employeeCount")} className="px-0 font-medium">
                Employees
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button variant="ghost" onClick={() => handleSort("assetCount")} className="px-0 font-medium">
                Assets
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("budget")} className="px-0 font-medium">
                Budget
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDepartments.map((department) => (
            <TableRow key={department.id}>
              <TableCell className="font-medium">
                <Link href={`/departments/${department.id}`} className="hover:underline">
                  {department.id}
                </Link>
              </TableCell>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.head}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="bg-primary text-white">
                  {department.employeeCount}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="bg-primary text-white">
                  {department.assetCount}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${department.budget.toLocaleString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      View Assets
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

