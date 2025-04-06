"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Pencil, PenToolIcon as Tool, Trash2, UserPlus } from "lucide-react"

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
const assets = [
  {
    id: "A001",
    name: 'MacBook Pro 16"',
    type: "Laptop",
    purchaseDate: "2023-01-15",
    status: "In Use",
    value: 2499,
    assignedTo: "John Doe",
  },
  {
    id: "A002",
    name: "Dell XPS 15",
    type: "Laptop",
    purchaseDate: "2022-11-05",
    status: "In Use",
    value: 1899,
    assignedTo: "Jane Smith",
  },
  {
    id: "A003",
    name: "iPhone 13 Pro",
    type: "Mobile",
    purchaseDate: "2022-09-20",
    status: "In Use",
    value: 999,
    assignedTo: "Robert Johnson",
  },
  {
    id: "A004",
    name: 'iPad Pro 12.9"',
    type: "Tablet",
    purchaseDate: "2023-02-10",
    status: "Available",
    value: 1099,
    assignedTo: null,
  },
  {
    id: "A005",
    name: "HP LaserJet Pro",
    type: "Printer",
    purchaseDate: "2022-07-12",
    status: "Maintenance",
    value: 449,
    assignedTo: null,
  },
  {
    id: "A006",
    name: "Samsung Galaxy S22",
    type: "Mobile",
    purchaseDate: "2022-08-15",
    status: "In Use",
    value: 799,
    assignedTo: "Emily Davis",
  },
  {
    id: "A007",
    name: "Logitech MX Master 3",
    type: "Peripheral",
    purchaseDate: "2023-03-05",
    status: "Available",
    value: 99,
    assignedTo: null,
  },
  {
    id: "A008",
    name: 'Dell UltraSharp 27"',
    type: "Monitor",
    purchaseDate: "2022-10-18",
    status: "In Use",
    value: 499,
    assignedTo: "Michael Wilson",
  },
]

export function AssetTable() {
  const [sortColumn, setSortColumn] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue === null) return 1
    if (bValue === null) return -1

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Use":
        return "bg-green-500"
      case "Available":
        return "bg-blue-500"
      case "Maintenance":
        return "bg-yellow-500"
      case "Disposed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

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
              <Button variant="ghost" onClick={() => handleSort("type")} className="px-0 font-medium">
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("purchaseDate")} className="px-0 font-medium">
                Purchase Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")} className="px-0 font-medium">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("value")} className="px-0 font-medium">
                Value
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">
                <Link href={`/assets/${asset.id}`} className="hover:underline">
                  {asset.id}
                </Link>
              </TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>{asset.purchaseDate}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getStatusColor(asset.status)} text-white`}>
                  {asset.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${asset.value}</TableCell>
              <TableCell>{asset.assignedTo || "—"}</TableCell>
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
                      <UserPlus className="mr-2 h-4 w-4" />
                      Assign
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Tool className="mr-2 h-4 w-4" />
                      Schedule Maintenance
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

