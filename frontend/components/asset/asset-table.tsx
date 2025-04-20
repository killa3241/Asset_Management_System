import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Asset } from '@/types/asset'

interface AssetTableProps {
  assets: Asset[]
  onDelete: (id: string) => Promise<void>
}

export function AssetTable({ assets, onDelete }: AssetTableProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleScheduleMaintenance = (assetId: string) => {
    router.push(`/maintenance/new?assetId=${assetId}`)
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">{asset.name}</td>
                <td className="p-4 align-middle">{asset.category}</td>
                <td className="p-4 align-middle">{asset.status}</td>
                <td className="p-4 align-middle">{asset.location}</td>
                <td className="p-4 align-middle">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleScheduleMaintenance(asset.id)}>
                        Schedule Maintenance
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(asset.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 