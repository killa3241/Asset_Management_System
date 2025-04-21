// components/maintenance/maintenance-table.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Pencil, Check } from "lucide-react"

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
import { toast } from "@/components/ui/use-toast"

export function MaintenanceTable() {
  const [maintenanceAssets, setMaintenanceAssets] = useState<any[]>([])
  const [sortColumn, setSortColumn] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMaintenanceAssets()
  }, [])

  const fetchMaintenanceAssets = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:8080/api/assets/maintenance", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        if (response.status === 403) {
          toast({
            title: "Error",
            description: "You don't have permission to view maintenance assets",
            variant: "destructive"
          })
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return
      }

      const data = await response.json()
      console.log("Maintenance assets:", data)
      setMaintenanceAssets(data || [])
    } catch (error) {
      console.error("Failed to fetch maintenance assets:", error)
      toast({
        title: "Error",
        description: "Failed to fetch maintenance assets. Please try again later.",
        variant: "destructive"
      })
      setMaintenanceAssets([])
    } finally {
      setLoading(false)
    }
  }

  const completeMaintenanceAsset = async (assetId: number) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8080/api/assets/maintenance/complete/${assetId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to complete maintenance')
      }

      toast({
        title: "Success",
        description: "Asset maintenance completed successfully",
      })

      fetchMaintenanceAssets()
    } catch (error) {
      console.error('Error completing maintenance:', error)
      toast({
        title: "Error",
        description: "Failed to complete maintenance",
        variant: "destructive"
      })
    }
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedAssets = [...maintenanceAssets].sort((a, b) => {
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

  if (loading) {
    return <div>Loading maintenance assets...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Assets Under Maintenance</h2>
        <Button onClick={fetchMaintenanceAssets}>Refresh</Button>
      </div>

      {maintenanceAssets.length === 0 ? (
        <div className="p-4 border rounded-md bg-gray-50 text-center">
          No assets currently under maintenance.
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  { label: "ID", key: "id" },
                  { label: "Name", key: "name" },
                  { label: "Type", key: "type" },
                  { label: "Last Maintenance Date", key: "lastMaintenanceDate" },
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
                <TableHead>Notes</TableHead>
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
                  <TableCell>{asset.lastMaintenanceDate || "Not available"}</TableCell>
                  <TableCell className="text-right">₹{asset.value}</TableCell>
                  <TableCell>{asset.assignedUser ? asset.assignedUser.name : "—"}</TableCell>
                  <TableCell>{asset.notes || "—"}</TableCell>
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
                        <DropdownMenuItem onClick={() => completeMaintenanceAsset(asset.id)}>
                          <Check className="mr-2 h-4 w-4" /> Complete Maintenance
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/assets/edit/${asset.id}`} className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" /> Edit Details
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
