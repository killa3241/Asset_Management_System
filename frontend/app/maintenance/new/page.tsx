import { MaintenanceForm } from "@/components/maintenance/maintenance-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewMaintenancePage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Maintenance</CardTitle>
          <CardDescription>
            Fill out the form below to schedule maintenance for an asset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MaintenanceForm />
        </CardContent>
      </Card>
    </div>
  )
} 