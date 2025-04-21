"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function ProfitLossCalculator() {
  // Revenue inputs
  const [salesRevenue, setSalesRevenue] = useState("")
  const [otherRevenue, setOtherRevenue] = useState("")

  // Cost inputs
  const [costOfGoodsSold, setCostOfGoodsSold] = useState("")
  const [operatingExpenses, setOperatingExpenses] = useState("")
  const [taxes, setTaxes] = useState("")

  // Results
  const [results, setResults] = useState({
    totalRevenue: 0,
    totalCosts: 0,
    grossProfit: 0,
    operatingProfit: 0,
    netProfit: 0,
    profitMargin: 0
  })
  const [showResults, setShowResults] = useState(false)

  const calculateProfitLoss = () => {
    const revenue = parseFloat(salesRevenue) || 0
    const other = parseFloat(otherRevenue) || 0
    const cogs = parseFloat(costOfGoodsSold) || 0
    const opex = parseFloat(operatingExpenses) || 0
    const tax = parseFloat(taxes) || 0

    const totalRevenue = revenue + other
    const grossProfit = totalRevenue - cogs
    const operatingProfit = grossProfit - opex
    const netProfit = operatingProfit - tax
    const totalCosts = cogs + opex + tax
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

    setResults({
      totalRevenue,
      totalCosts,
      grossProfit,
      operatingProfit,
      netProfit,
      profitMargin
    })

    setShowResults(true)
  }

  const resetCalculator = () => {
    setSalesRevenue("")
    setOtherRevenue("")
    setCostOfGoodsSold("")
    setOperatingExpenses("")
    setTaxes("")
    setShowResults(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Revenue</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salesRevenue">Sales Revenue ($)</Label>
            <Input
              id="salesRevenue"
              type="number"
              placeholder="e.g. 100000"
              value={salesRevenue}
              onChange={(e) => setSalesRevenue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherRevenue">Other Revenue ($)</Label>
            <Input
              id="otherRevenue"
              type="number"
              placeholder="e.g. 5000"
              value={otherRevenue}
              onChange={(e) => setOtherRevenue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-3">Costs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="costOfGoodsSold">Cost of Goods Sold ($)</Label>
            <Input
              id="costOfGoodsSold"
              type="number"
              placeholder="e.g. 40000"
              value={costOfGoodsSold}
              onChange={(e) => setCostOfGoodsSold(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operatingExpenses">Operating Expenses ($)</Label>
            <Input
              id="operatingExpenses"
              type="number"
              placeholder="e.g. 30000"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxes">Taxes ($)</Label>
            <Input
              id="taxes"
              type="number"
              placeholder="e.g. 7500"
              value={taxes}
              onChange={(e) => setTaxes(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={calculateProfitLoss} className="w-full md:w-auto">Calculate</Button>
        <Button onClick={resetCalculator} variant="outline" className="w-full md:w-auto">Reset</Button>
      </div>

      {showResults && (
        <div className="mt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-primary">${results.totalRevenue.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium">Total Costs</p>
                  <p className="text-3xl font-bold text-primary">${results.totalCosts.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium">Net Profit</p>
                  <p className={`text-3xl font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${results.netProfit.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Profit Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Gross Profit</p>
                    <p className={`text-xl font-bold ${results.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${results.grossProfit.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Operating Profit</p>
                    <p className={`text-xl font-bold ${results.operatingProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${results.operatingProfit.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Net Profit</p>
                    <p className={`text-xl font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${results.netProfit.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">Profit Margin</p>
                    <p className={`text-xl font-bold ${results.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.profitMargin.toFixed(2)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}