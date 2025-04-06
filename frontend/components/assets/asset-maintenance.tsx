import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AssetMaintenanceProps {
  assetId: string
}

export function AssetMaintenance({ assetId }: AssetMaintenanceProps) {
  // In a real app, you would fetch the maintenance data based on the asset ID
  const maintenanceItems = [
    {
      id: 1,
      scheduledDate: "2023-03-15",
      completedDate: "2023-03-15",
      type: "Preventive",
      description: "Software update and cleaning",
      technician: "Tech Support",
      cost: 50,
      status: "Completed",
    },
    {
      id: 2,
      scheduledDate: "2023-06-15",
      completedDate: null,
      type: "Preventive",
      description: "Regular maintenance check",
      technician: "Tech Support",
      cost: 50,
      status: "Scheduled",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Records</CardTitle>
        <CardDescription>History of maintenance activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Completed Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.scheduledDate}</TableCell>
                <TableCell>{item.completedDate || "—"}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.technician}</TableCell>
                <TableCell>${item.cost}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      item.status === "Completed"
                        ? "bg-green-500"
                        : item.status === "Scheduled"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    } text-white`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

