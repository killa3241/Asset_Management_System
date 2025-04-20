"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

interface Maintenance {
  id: string
  maintenanceId: string
  assetName: string
  scheduledDate: string
  type: string
  description: string
  technician: string
  cost: number
  status: string
}

export function MaintenanceTable() {
  const router = useRouter()
  const [maintenanceRecords, setMaintenanceRecords] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMaintenanceRecords()
  }, [])

  const fetchMaintenanceRecords = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:8080/api/maintenance", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Failed to fetch maintenance records")
      }

      const data = await response.json()
      setMaintenanceRecords(data)
    } catch (error) {
      console.error("Error fetching maintenance records:", error)
      toast({
        title: "Error",
        description: "Failed to fetch maintenance records",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8080/api/maintenance/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Failed to delete maintenance record")
      }

      toast({
        title: "Success",
        description: "Maintenance record deleted successfully",
      })

      // Refresh the maintenance records
      fetchMaintenanceRecords()
    } catch (error) {
      console.error("Error deleting maintenance record:", error)
      toast({
        title: "Error",
        description: "Failed to delete maintenance record",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading maintenance records...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.maintenanceId}</TableCell>
              <TableCell>{record.assetName}</TableCell>
              <TableCell>{new Date(record.scheduledDate).toLocaleDateString()}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.description}</TableCell>
              <TableCell>{record.technician}</TableCell>
              <TableCell>${record.cost}</TableCell>
              <TableCell>{record.status}</TableCell>
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
                    <DropdownMenuItem
                      onClick={() => router.push(`/maintenance/${record.id}/edit`)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(record.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
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

