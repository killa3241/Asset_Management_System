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
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AssetTable() {
  const [assets, setAssets] = useState<any[]>([])
  const [sortColumn, setSortColumn] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      
      const response = await fetch("http://localhost:8080/api/assets/all", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        if (response.status === 403) {
          toast({
            title: "Error",
            description: "You don't have permission to view assets",
            variant: "destructive"
          })
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return
      }
      
      const data = await response.json()
      setAssets(data || [])
    } catch (error) {
      console.error("Failed to fetch assets:", error)
      toast({
        title: "Error",
        description: "Failed to fetch assets. Please try again later.",
        variant: "destructive"
      })
      setAssets([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (assetId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8080/api/assets/status/${assetId}?status=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      toast({
        title: "Success",
        description: "Asset status updated successfully",
      })

      // Refresh the assets list
      fetchAssets()
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: "Error",
        description: "Failed to update asset status",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (assetId: number) => {
    if (!confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8080/api/assets/${assetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        let errorMessage = 'Failed to delete asset'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }

      toast({
        title: "Success",
        description: "Asset deleted successfully",
      })

      // Refresh the assets list
      fetchAssets()
    } catch (error) {
      console.error('Error deleting asset:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete asset",
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
      case "New": return "bg-blue-500"
      case "Available": return "bg-green-500"
      case "Assigned": return "bg-purple-500"
      case "Maintenance": return "bg-yellow-500"
      case "Obsolete": return "bg-orange-500"
      case "Disposed": return "bg-red-500"
      case "Permanently Removed": return "bg-gray-500"
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
                {asset.status === "Disposed" ? (
                  <Badge variant="outline" className="bg-red-500 text-white">
                    Disposed
                  </Badge>
                ) : (
                  <Select
                    value={asset.status}
                    onValueChange={(value) => handleStatusChange(asset.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue>
                        <Badge variant="outline" className={`${getStatusColor(asset.status)} text-white`}>
                          {asset.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {asset.status === "Available" && (
                        <>
                          <SelectItem value="Obsolete">Obsolete</SelectItem>
                          <SelectItem value="Disposed">Disposed</SelectItem>
                        </>
                      )}
                      {asset.status === "Obsolete" && (
                        <SelectItem value="Disposed">Disposed</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
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
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDelete(asset.id)}
                    >
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
