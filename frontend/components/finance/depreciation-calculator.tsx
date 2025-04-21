"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DepreciationCalculator() {
  const [assetValue, setAssetValue] = useState("")
  const [salvageValue, setSalvageValue] = useState("")
  const [usefulLife, setUsefulLife] = useState("")
  const [depreciationMethod, setDepreciationMethod] = useState("straight-line")
  const [results, setResults] = useState({
    annualDepreciation: 0,
    schedule: []
  })
  const [showResults, setShowResults] = useState(false)

  const calculateDepreciation = () => {
    const initialValue = parseFloat(assetValue)
    const residualValue = parseFloat(salvageValue) || 0
    const years = parseInt(usefulLife)

    let schedule = []
    let bookValue = initialValue
    let totalDepreciation = 0

    if (depreciationMethod === "straight-line") {
      // Straight Line Depreciation
      const annualDepreciation = (initialValue - residualValue) / years

      for (let year = 1; year <= years; year++) {
        totalDepreciation += annualDepreciation
        bookValue = initialValue - totalDepreciation

        schedule.push({
          year,
          depreciation: annualDepreciation,
          totalDepreciation,
          bookValue
        })
      }

      setResults({
        annualDepreciation,
        schedule
      })
    }
    else if (depreciationMethod === "double-declining") {
      // Double Declining Balance Depreciation
      const straightLineRate = 1 / years
      const ddRate = straightLineRate * 2

      for (let year = 1; year <= years; year++) {
        // Calculate depreciation for the year
        let depreciation = bookValue * ddRate

        // Switch to straight-line for the remaining years if it's greater
        const remainingYears = years - year + 1
        const straightLineForRemaining = (bookValue - residualValue) / remainingYears

        if (straightLineForRemaining > depreciation) {
          depreciation = straightLineForRemaining
        }

        // Ensure we don't go below the salvage value
        if (bookValue - depreciation < residualValue) {
          depreciation = bookValue - residualValue
        }

        totalDepreciation += depreciation
        bookValue -= depreciation

        schedule.push({
          year,
          depreciation,
          totalDepreciation,
          bookValue
        })

        // Stop if we've reached the salvage value
        if (bookValue <= residualValue) break
      }

      setResults({
        annualDepreciation: schedule[0].depreciation,
        schedule
      })
    }

    setShowResults(true)
  }

  const resetCalculator = () => {
    setAssetValue("")
    setSalvageValue("")
    setUsefulLife("")
    setDepreciationMethod("straight-line")
    setShowResults(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="assetValue">Asset Value ($)</Label>
          <Input
            id="assetValue"
            type="number"
            placeholder="e.g. 50000"
            value={assetValue}
            onChange={(e) => setAssetValue(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salvageValue">Salvage Value ($)</Label>
          <Input
            id="salvageValue"
            type="number"
            placeholder="e.g. 5000"
            value={salvageValue}
            onChange={(e) => setSalvageValue(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="usefulLife">Useful Life (years)</Label>
          <Input
            id="usefulLife"
            type="number"
            placeholder="e.g. 5"
            value={usefulLife}
            onChange={(e) => setUsefulLife(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="depreciationMethod">Depreciation Method</Label>
          <Select
            value={depreciationMethod}
            onValueChange={setDepreciationMethod}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="straight-line">Straight Line</SelectItem>
              <SelectItem value="double-declining">Double Declining Balance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={calculateDepreciation} className="w-full md:w-auto">Calculate</Button>
        <Button onClick={resetCalculator} variant="outline" className="w-full md:w-auto">Reset</Button>
      </div>

      {showResults && (
        <div className="mt-8 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg font-medium">Annual Depreciation (Year 1)</p>
                <p className="text-3xl font-bold text-primary">${results.annualDepreciation.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-medium mb-2">Depreciation Schedule</h3>
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium">Year</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Depreciation</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Total Depreciation</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Book Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.schedule.map((row) => (
                    <tr key={row.year}>
                      <td className="px-4 py-2 text-sm">{row.year}</td>
                      <td className="px-4 py-2 text-sm">${row.depreciation.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm">${row.totalDepreciation.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm">${row.bookValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}