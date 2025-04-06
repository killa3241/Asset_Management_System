"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react"

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
const maintenanceRecords = [
  {
    id: "M001",
    assetId: "A001",
    assetName: 'MacBook Pro 16"',
    scheduledDate: "2023-06-15",
    type: "Preventive",
    description: "Regular maintenance check",
    technician: "Tech Support",
    cost: 50,
    status: "Scheduled",
  },
  {
    id: "M002",
    assetId: "A005",
    assetName: "HP LaserJet Pro",
    scheduledDate: "2023-05-20",
    type: "Corrective",
    description: "Fix paper jam issue",
    technician: "Printer Specialist",
    cost: 75,
    status: "Completed",
  },
  {
    id: "M003",
    assetId: "A002",
    assetName: "Dell XPS 15",
    scheduledDate: "2023-07-10",
    type: "Preventive",
    description: "System cleanup and updates",
    technician: "Tech Support",
    cost: 50,
    status: "Scheduled",
  },
  {
    id: "M004",
    assetId: "A008",
    assetName: 'Dell UltraSharp 27"',
    scheduledDate: "2023-05-15",
    type: "Corrective",
    description: "Fix flickering issue",
    technician: "Display Specialist",
    cost: 100,
    status: "Completed",
  },
  {
    id: "M005",
    assetId: "A003",
    assetName: "iPhone 13 Pro",
    scheduledDate: "2023-06-05",
    type: "Preventive",
    description: "Software update and battery check",
    technician: "Mobile Support",
    cost: 45,
    status: "In Progress",
  },
  {
    id: "M006",
    assetId: "A006",
    assetName: "Samsung Galaxy S22",
    scheduledDate: "2023-07-20",
    type: "Predictive",
    description: "Battery replacement (preventive)",
    technician: "Mobile Support",
    cost: 85,
    status: "Scheduled",
  },
]

export function MaintenanceTable() {
  const [sortColumn, setSortColumn] = useState("scheduledDate")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedRecords = [...maintenanceRecords].sort((a, b) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "Scheduled":
        return "bg-blue-500"
      case "In Progress":
        return "bg-yellow-500"
      case "Cancelled":
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
              <Button variant="ghost" onClick={() => handleSort("assetName")} className="px-0 font-medium">
                Asset
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("scheduledDate")} className="px-0 font-medium">
                Scheduled Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("type")} className="px-0 font-medium">
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("technician")} className="px-0 font-medium">
                Technician
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("cost")} className="px-0 font-medium">
                Cost
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")} className="px-0 font-medium">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">
                <Link href={`/maintenance/${record.id}`} className="hover:underline">
                  {record.id}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/assets/${record.assetId}`} className="hover:underline">
                  {record.assetName}
                </Link>
              </TableCell>
              <TableCell>{record.scheduledDate}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.description}</TableCell>
              <TableCell>{record.technician}</TableCell>
              <TableCell className="text-right">${record.cost}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getStatusColor(record.status)} text-white`}>
                  {record.status}
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
                    {record.status === "Scheduled" && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </DropdownMenuItem>
                    )}
                    {record.status !== "Cancelled" && record.status !== "Completed" && (
                      <DropdownMenuItem>
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    )}
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

