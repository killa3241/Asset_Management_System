import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DisposalTable } from "@/components/disposals/disposal-table"
import { DisposalFilters } from "@/components/disposals/disposal-filters"

export default function DisposalsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Disposals</h1>
        <Button asChild>
          <Link href="/disposals/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Disposal
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Asset Disposals</CardTitle>
          <CardDescription>Track and manage asset disposal process</CardDescription>
        </CardHeader>
        <CardContent>
          <DisposalFilters />
          <DisposalTable />
        </CardContent>
      </Card>
    </div>
  )
}

