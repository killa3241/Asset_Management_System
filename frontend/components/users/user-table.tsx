"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample data
const users = [
  {
    id: "U001",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "IT",
    role: "Developer",
    assetCount: 3,
    avatar: "/placeholder.svg",
    initials: "JD",
  },
  {
    id: "U002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "HR",
    role: "Manager",
    assetCount: 2,
    avatar: "/placeholder.svg",
    initials: "JS",
  },
  {
    id: "U003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    department: "Finance",
    role: "Analyst",
    assetCount: 2,
    avatar: "/placeholder.svg",
    initials: "RJ",
  },
  {
    id: "U004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Marketing",
    role: "Specialist",
    assetCount: 1,
    avatar: "/placeholder.svg",
    initials: "ED",
  },
  {
    id: "U005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    department: "Operations",
    role: "Coordinator",
    assetCount: 2,
    avatar: "/placeholder.svg",
    initials: "MW",
  },
  {
    id: "U006",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    department: "IT",
    role: "Designer",
    assetCount: 3,
    avatar: "/placeholder.svg",
    initials: "SB",
  },
  {
    id: "U007",
    name: "David Miller",
    email: "david.miller@example.com",
    department: "Finance",
    role: "Director",
    assetCount: 1,
    avatar: "/placeholder.svg",
    initials: "DM",
  },
]

export function UserTable() {
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

  const sortedUsers = [...users].sort((a, b) => {
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
            <TableHead>Email</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("department")} className="px-0 font-medium">
                Department
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("role")} className="px-0 font-medium">
                Role
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button variant="ghost" onClick={() => handleSort("assetCount")} className="px-0 font-medium">
                Assets
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <Link href={`/users/${user.id}`} className="hover:underline">
                  {user.id}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  {user.name}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="bg-primary text-white">
                  {user.assetCount}
                </Badge>
              </TableCell>
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
                    <DropdownMenuItem>View Assets</DropdownMenuItem>
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

