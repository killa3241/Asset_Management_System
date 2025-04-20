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

const financeFormSchema = z.object({
  operationType: z.string({
    required_error: "Please select an operation type.",
  }),
  assetId: z.string().optional(),
  principalAmount: z.string().optional(),
  interestRate: z.string().optional(),
  loanTerm: z.string().optional(),
  depreciationMethod: z.string().optional(),
  usefulLife: z.string().optional(),
  salvageValue: z.string().optional(),
  salePrice: z.string().optional(),
  purchasePrice: z.string().optional(),
  transactionDate: z.string({
    required_error: "Please select a date.",
  }),
  notes: z.string().optional(),
})

type FinanceFormValues = z.infer<typeof financeFormSchema>

interface Asset {
  id: string
  name: string
  value: number
}

export function FinanceForm() {
  const router = useRouter()
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [operationType, setOperationType] = useState<string>("")

  const form = useForm<FinanceFormValues>({
    resolver: zodResolver(financeFormSchema),
    defaultValues: {
      operationType: "",
      assetId: "",
      principalAmount: "",
      interestRate: "",
      loanTerm: "",
      depreciationMethod: "",
      usefulLife: "",
      salvageValue: "",
      salePrice: "",
      purchasePrice: "",
      transactionDate: "",
      notes: "",
    },
  })

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:8080/api/assets/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
        toast({
          title: "Error",
          description: "Failed to fetch assets",
          variant: "destructive",
        });
      }
    };

    fetchAssets();
  }, []);

  const onSubmit = async (data: z.infer<typeof financeFormSchema>) => {
    try {
      const token = localStorage.getItem("token");
      
      // Format the data before sending
      const formattedData = {
        ...data,
        assetId: data.assetId ? parseInt(data.assetId) : null,
        principalAmount: data.principalAmount ? parseFloat(data.principalAmount) : null,
        interestRate: data.interestRate ? parseFloat(data.interestRate) : null,
        loanTerm: data.loanTerm ? parseInt(data.loanTerm) : null,
        usefulLife: data.usefulLife ? parseInt(data.usefulLife) : null,
        salvageValue: data.salvageValue ? parseFloat(data.salvageValue) : null,
        salePrice: data.salePrice ? parseFloat(data.salePrice) : null,
        purchasePrice: data.purchasePrice ? parseFloat(data.purchasePrice) : null,
        transactionDate: data.transactionDate ? new Date(data.transactionDate).toISOString().split('T')[0] : null
      };

      console.log('Sending data:', formattedData);

      const response = await fetch('http://localhost:8080/api/finance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formattedData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        let errorMessage = 'Failed to create finance record';
        try {
          if (responseText) {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      toast({
        title: "Success",
        description: "Finance record created successfully",
      });
      form.reset();
    } catch (error) {
      console.error('Error creating finance record:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create finance record",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="operationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operation Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setOperationType(value)
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an operation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Loan Calculation">Loan Calculation</SelectItem>
                  <SelectItem value="Depreciation Calculation">Depreciation Calculation</SelectItem>
                  <SelectItem value="Asset Sale">Asset Sale</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the type of financial operation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {operationType === "Loan Calculation" && (
          <>
            <FormField
              control={form.control}
              name="principalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter principal amount" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the loan principal amount
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter interest rate" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the annual interest rate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term (years)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter loan term" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the loan term in years
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {operationType === "Depreciation Calculation" && (
          <>
            <FormField
              control={form.control}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an asset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.name} (${asset.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the asset for depreciation calculation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depreciationMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depreciation Method</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select depreciation method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Straight Line">Straight Line</SelectItem>
                      <SelectItem value="Double Declining">Double Declining</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the depreciation calculation method
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="usefulLife"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Useful Life (years)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter useful life" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the asset's useful life in years
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salvageValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salvage Value</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter salvage value" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the asset's salvage value
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {operationType === "Asset Sale" && (
          <>
            <FormField
              control={form.control}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an asset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.name} (${asset.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the asset being sold
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter sale price" 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the sale price of the asset
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="transactionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Date</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                When did this transaction occur?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes..."
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                Add any additional information about this transaction
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
} 