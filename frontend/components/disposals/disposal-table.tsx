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
const disposals = [
  {
    id: "D001",
    assetId: "A010",
    assetName: "HP Laptop",
    disposalDate: "2023-05-10",
    method: "Recycling",
    reason: "End of life cycle",
    approvedBy: "John Smith",
    value: 150,
    status: "Completed",
  },
  {
    id: "D002",
    assetId: "A011",
    assetName: "Old Printer",
    disposalDate: "2023-05-15",
    method: "Recycling",
    reason: "Broken beyond repair",
    approvedBy: "Sarah Johnson",
    value: 75,
    status: "Completed",
  },
  {
    id: "D003",
    assetId: "A012",
    assetName: "Office Desk",
    disposalDate: "2023-06-01",
    method: "Donation",
    reason: "Office renovation",
    approvedBy: null,
    value: 200,
    status: "Pending Approval",
  },
  {
    id: "D004",
    assetId: "A013",
    assetName: "Old Server",
    disposalDate: "2023-06-15",
    method: "Sale",
    reason: "Upgraded to new system",
    approvedBy: null,
    value: 500,
    status: "Pending Approval",
  },
  {
    id: "D005",
    assetId: "A014",
    assetName: "Office Chairs (5)",
    disposalDate: "2023-05-20",
    method: "Donation",
    reason: "Office renovation",
    approvedBy: "Michael Brown",
    value: 250,
    status: "Approved",
  },
  {
    id: "D006",
    assetId: "A015",
    assetName: "Old Monitors (3)",
    disposalDate: "2023-05-25",
    method: "Sale",
    reason: "Upgraded to new models",
    approvedBy: "Emily Davis",
    value: 300,
    status: "Rejected",
  },
]

export function DisposalTable() {
  const [sortColumn, setSortColumn] = useState("disposalDate")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedDisposals = [...disposals].sort((a, b) => {
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
      case "Completed":
        return "bg-green-500"
      case "Approved":
        return "bg-blue-500"
      case "Pending Approval":
        return "bg-yellow-500"
      case "Rejected":
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
              <Button variant="ghost" onClick={() => handleSort("disposalDate")} className="px-0 font-medium">
                Disposal Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("method")} className="px-0 font-medium">
                Method
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("value")} className="px-0 font-medium">
                Value
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
          {sortedDisposals.map((disposal) => (
            <TableRow key={disposal.id}>
              <TableCell className="font-medium">
                <Link href={`/disposals/${disposal.id}`} className="hover:underline">
                  {disposal.id}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/assets/${disposal.assetId}`} className="hover:underline">
                  {disposal.assetName}
                </Link>
              </TableCell>
              <TableCell>{disposal.disposalDate}</TableCell>
              <TableCell>{disposal.method}</TableCell>
              <TableCell>{disposal.reason}</TableCell>
              <TableCell>{disposal.approvedBy || "—"}</TableCell>
              <TableCell className="text-right">${disposal.value}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getStatusColor(disposal.status)} text-white`}>
                  {disposal.status}
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
                    {disposal.status === "Pending Approval" && (
                      <>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
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

