import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, BarChart2 } from "lucide-react"

export function AuditReports() {
  const reports = [
    {
      id: 1,
      title: "Asset Audit Report",
      description: "Results of the latest asset audit with discrepancies",
      lastGenerated: "2023-05-12",
    },
    {
      id: 2,
      title: "Compliance Report",
      description: "Asset compliance with organizational policies and regulations",
      lastGenerated: "2023-05-07",
    },
    {
      id: 3,
      title: "Asset Tracking Accuracy Report",
      description: "Analysis of asset tracking system accuracy",
      lastGenerated: "2023-04-25",
    },
    {
      id: 4,
      title: "Audit History Report",
      description: "Historical record of all asset audits and findings",
      lastGenerated: "2023-05-01",
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

