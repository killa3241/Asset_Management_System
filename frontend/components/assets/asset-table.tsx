// components/assets/asset-table.tsx
"use client"

import { useEffect, useState } from "react"
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

export function AssetTable() {
  const [assets, setAssets] = useState<any[]>([])
  const [sortColumn, setSortColumn] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")

  useEffect(() => {
    fetch("http://localhost:8080/api/assets/all")
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error("Failed to fetch assets:", err))
  }, [])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

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
      case "In Use": return "bg-green-500"
      case "Available": return "bg-blue-500"
      case "Maintenance": return "bg-yellow-500"
      case "Disposed": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Type", key: "type" },
              { label: "Purchase Date", key: "purchaseDate" },
              { label: "Status", key: "status" },
              { label: "Value", key: "value" },
            ].map((col) => (
              <TableHead key={col.key} className="text-left">
                <Button variant="ghost" onClick={() => handleSort(col.key)} className="px-0 font-medium">
                  {col.label}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            ))}
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
              <TableCell className="text-right">₹{asset.value}</TableCell>
              <TableCell>{asset.assignedUser?.username || "—"}</TableCell>
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
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" /> Assign
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Tool className="mr-2 h-4 w-4" /> Schedule Maintenance
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
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
