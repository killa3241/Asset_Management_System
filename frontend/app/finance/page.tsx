import { FinanceForm } from "@/components/finance/finance-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinancePage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Financial Operations</CardTitle>
          <CardDescription>
            Perform financial calculations and record transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FinanceForm />
        </CardContent>
      </Card>
    </div>
  )
} 