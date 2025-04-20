export interface Asset {
  id: string
  name: string
  category: string
  status: string
  purchaseDate: string
  purchasePrice: number
  location: string
  description?: string
  serialNumber?: string
  modelNumber?: string
  manufacturer?: string
  warrantyExpiryDate?: string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  assignedTo?: string
  notes?: string
} 