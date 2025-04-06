import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, BarChart2 } from "lucide-react"

export function AssetReports() {
  const reports = [
    {
      id: 1,
      title: "Asset Inventory Report",
      description: "Complete list of all assets with their current status and assignment",
      lastGenerated: "2023-05-15",
    },
    {
      id: 2,
      title: "Asset Allocation by Department",
      description: "Distribution of assets across different departments",
      lastGenerated: "2023-05-10",
    },
    {
      id: 3,
      title: "Asset Lifecycle Report",
      description: "Analysis of asset age, depreciation, and replacement schedule",
      lastGenerated: "2023-04-28",
    },
    {
      id: 4,
      title: "Asset Utilization Report",
      description: "Metrics on how effectively assets are being used",
      lastGenerated: "2023-05-05",
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

