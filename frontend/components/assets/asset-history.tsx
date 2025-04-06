import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AssetHistoryProps {
  assetId: string
}

export function AssetHistory({ assetId }: AssetHistoryProps) {
  // In a real app, you would fetch the history data based on the asset ID
  const historyItems = [
    {
      id: 1,
      date: "2023-01-20",
      action: "Assigned",
      user: "John Doe",
      department: "IT",
      notes: "Initial assignment",
    },
    {
      id: 2,
      date: "2023-03-15",
      action: "Maintenance",
      user: "Tech Support",
      department: "IT",
      notes: "Software update and cleaning",
    },
    {
      id: 3,
      date: "2023-03-18",
      action: "Returned",
      user: "John Doe",
      department: "IT",
      notes: "Maintenance completed",
    },
    {
      id: 4,
      date: "2023-03-19",
      action: "Assigned",
      user: "John Doe",
      department: "IT",
      notes: "Reassigned after maintenance",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment History</CardTitle>
        <CardDescription>Record of all assignments and transfers</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

