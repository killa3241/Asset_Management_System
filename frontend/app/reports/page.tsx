import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportFilters } from "@/components/reports/report-filters"
import { AssetReports } from "@/components/reports/asset-reports"
import { MaintenanceReports } from "@/components/reports/maintenance-reports"
import { AuditReports } from "@/components/reports/audit-reports"
import { FinancialReports } from "@/components/reports/financial-reports"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
          <CardDescription>Generate and export various reports for asset management</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportFilters />
          <Tabs defaultValue="assets" className="mt-4">
            <TabsList>
              <TabsTrigger value="assets">Asset Reports</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Reports</TabsTrigger>
              <TabsTrigger value="audit">Audit Reports</TabsTrigger>
              <TabsTrigger value="financial">Financial Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="assets" className="space-y-4">
              <AssetReports />
            </TabsContent>
            <TabsContent value="maintenance" className="space-y-4">
              <MaintenanceReports />
            </TabsContent>
            <TabsContent value="audit" className="space-y-4">
              <AuditReports />
            </TabsContent>
            <TabsContent value="financial" className="space-y-4">
              <FinancialReports />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

