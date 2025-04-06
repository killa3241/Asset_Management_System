import Link from "next/link"
import { ArrowLeft, Edit, PenToolIcon as Tool, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AssetHistory } from "@/components/assets/asset-history"
import { AssetMaintenance } from "@/components/assets/asset-maintenance"

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the asset data based on the ID
  const asset = {
    id: params.id,
    name: 'MacBook Pro 16"',
    type: "Laptop",
    purchaseDate: "2023-01-15",
    status: "In Use",
    value: 2499,
    serialNumber: "FVFXC2ABCDEF",
    model: 'MacBook Pro 16" M1 Pro',
    manufacturer: "Apple",
    location: "Headquarters",
    department: "IT",
    assignedTo: "John Doe",
    assignedDate: "2023-01-20",
    warrantyExpiration: "2025-01-15",
    notes: "Device has 32GB RAM and 1TB SSD",
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/assets">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>
        <Badge
          variant="outline"
          className={`ml-auto ${
            asset.status === "In Use"
              ? "bg-green-500"
              : asset.status === "Available"
                ? "bg-blue-500"
                : asset.status === "Maintenance"
                  ? "bg-yellow-500"
                  : "bg-red-500"
          } text-white`}
        >
          {asset.status}
        </Badge>
        <Button asChild>
          <Link href={`/assets/${asset.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Asset
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Basic information about this asset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">ID</div>
                  <div className="font-medium">{asset.id}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-medium">{asset.type}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Serial Number</div>
                  <div className="font-medium">{asset.serialNumber}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Model</div>
                  <div className="font-medium">{asset.model}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Manufacturer</div>
                  <div className="font-medium">{asset.manufacturer}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Value</div>
                  <div className="font-medium">${asset.value}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Purchase Date</div>
                  <div className="font-medium">{asset.purchaseDate}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Warranty Expiration</div>
                  <div className="font-medium">{asset.warrantyExpiration}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Notes</div>
                <div className="font-medium">{asset.notes}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Information</CardTitle>
            <CardDescription>Current assignment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Assigned To</div>
                  <div className="font-medium">{asset.assignedTo || "—"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Assigned Date</div>
                  <div className="font-medium">{asset.assignedDate || "—"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Department</div>
                  <div className="font-medium">{asset.department}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">{asset.location}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1">
                  <User className="mr-2 h-4 w-4" />
                  Assign Asset
                </Button>
                <Button variant="outline" className="flex-1">
                  <Tool className="mr-2 h-4 w-4" />
                  Schedule Maintenance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="mt-4">
        <TabsList>
          <TabsTrigger value="history">Assignment History</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Records</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <AssetHistory assetId={asset.id} />
        </TabsContent>
        <TabsContent value="maintenance">
          <AssetMaintenance assetId={asset.id} />
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Warranty, manuals, and other documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">No documents available for this asset.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

