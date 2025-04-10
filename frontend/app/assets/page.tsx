import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AssetTable } from "@/components/assets/asset-table"
import { AssetFilters } from "@/components/assets/asset-filters"

export default function AssetsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
        <Button asChild>
          <Link href="/assets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Register Asset
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Asset Inventory</CardTitle>
          <CardDescription>Manage and track all company assets</CardDescription>
        </CardHeader>
        <CardContent>
          <AssetFilters />
          <AssetTable />
        </CardContent>
      </Card>
    </div>
  )
}

