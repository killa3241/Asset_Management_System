import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, BarChart2 } from "lucide-react"

export function FinancialReports() {
  const reports = [
    {
      id: 1,
      title: "Asset Valuation Report",
      description: "Current value of all assets including depreciation",
      lastGenerated: "2023-05-13",
    },
    {
      id: 2,
      title: "Asset Acquisition Cost Report",
      description: "Total acquisition costs by department and asset type",
      lastGenerated: "2023-05-09",
    },
    {
      id: 3,
      title: "Depreciation Schedule Report",
      description: "Detailed depreciation schedule for all assets",
      lastGenerated: "2023-04-27",
    },
    {
      id: 4,
      title: "Total Cost of Ownership Report",
      description: "Complete cost analysis including maintenance and operations",
      lastGenerated: "2023-05-03",
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

