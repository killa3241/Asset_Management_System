import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, BarChart2 } from "lucide-react"

export function MaintenanceReports() {
  const reports = [
    {
      id: 1,
      title: "Maintenance Schedule Report",
      description: "Upcoming maintenance activities for all assets",
      lastGenerated: "2023-05-14",
    },
    {
      id: 2,
      title: "Maintenance Cost Analysis",
      description: "Breakdown of maintenance costs by asset type and department",
      lastGenerated: "2023-05-08",
    },
    {
      id: 3,
      title: "Maintenance History Report",
      description: "Complete maintenance history for all assets",
      lastGenerated: "2023-04-30",
    },
    {
      id: 4,
      title: "Maintenance Performance Report",
      description: "Analysis of maintenance timeliness and effectiveness",
      lastGenerated: "2023-05-02",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <CardTitle>{report.title}</CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Last generated: {report.lastGenerated}</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <BarChart2 className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

