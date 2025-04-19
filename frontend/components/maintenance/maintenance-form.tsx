"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const maintenanceFormSchema = z.object({
  assetId: z.string({
    required_error: "Please select an asset.",
  }),
  scheduledDate: z.string({
    required_error: "Please select a date.",
  }),
  type: z.string({
    required_error: "Please select maintenance type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  technician: z.string().min(1, {
    message: "Please enter technician name.",
  }),
  cost: z.string().min(1, {
    message: "Please enter estimated cost.",
  }),
})

type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>

interface Asset {
  id: string
  name: string
  status: string
}

export function MaintenanceForm() {
  const router = useRouter()
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
  })

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("/api/assets")
        const data = await response.json()
        setAssets(data)
      } catch (error) {
        console.error("Error fetching assets:", error)
        toast({
          title: "Error",
          description: "Failed to fetch assets",
          variant: "destructive",
        })
      }
    }

    fetchAssets()
  }, [])

  async function onSubmit(data: MaintenanceFormValues) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create maintenance record")
      }

      toast({
        title: "Success",
        description: "Maintenance scheduled successfully",
      })
      router.push("/maintenance")
    } catch (error) {
      console.error("Error scheduling maintenance:", error)
      toast({
        title: "Error",
        description: "Failed to schedule maintenance",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="assetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {assets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.name} ({asset.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the asset that needs maintenance
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduledDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheduled Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                When should the maintenance be performed?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maintenance Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select maintenance type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Preventive">Preventive</SelectItem>
                  <SelectItem value="Corrective">Corrective</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                What type of maintenance is required?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the maintenance required..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide details about the maintenance work
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technician"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technician</FormLabel>
              <FormControl>
                <Input placeholder="Enter technician name" {...field} />
              </FormControl>
              <FormDescription>
                Who will perform the maintenance?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Cost</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter estimated cost" {...field} />
              </FormControl>
              <FormDescription>
                What is the estimated cost of maintenance?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Scheduling..." : "Schedule Maintenance"}
        </Button>
      </form>
    </Form>
  )
} 