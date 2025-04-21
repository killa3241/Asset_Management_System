"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LoanCalculator() {
  const [principalAmount, setPrincipalAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    amortizationSchedule: []
  })
  const [showResults, setShowResults] = useState(false)

  const calculateLoan = () => {
    // Convert inputs to numbers
    const principal = parseFloat(principalAmount)
    const rate = parseFloat(interestRate) / 100 / 12 // Monthly interest rate
    const term = parseFloat(loanTerm) * 12 // Term in months
    
    // Calculate monthly payment
    const monthlyPayment = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1)
    const totalPayment = monthlyPayment * term
    const totalInterest = totalPayment - principal
    
    // Generate amortization schedule
    let balance = principal
    let amortizationSchedule = []
    
    for (let month = 1; month <= Math.min(term, 24); month++) {
      const interest = balance * rate
      const principalPayment = monthlyPayment - interest
      balance -= principalPayment
      
      amortizationSchedule.push({
        month,
        payment: monthlyPayment,
        principalPayment,
        interest,
        balance
      })
    }
    
    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortizationSchedule
    })
    
    setShowResults(true)
  }

  const resetCalculator = () => {
    setPrincipalAmount("")
    setInterestRate("")
    setLoanTerm("")
    setShowResults(false)
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="principalAmount">Principal Amount ($)</Label>
          <Input
            id="principalAmount"
            type="number"
            placeholder="e.g. 100000"
            value={principalAmount}
            onChange={(e) => setPrincipalAmount(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.01"
            placeholder="e.g. 5.5"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="loanTerm">Loan Term (years)</Label>
          <Input
            id="loanTerm"
            type="number"
            placeholder="e.g. 30"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button onClick={calculateLoan} className="w-full md:w-auto">Calculate</Button>
        <Button onClick={resetCalculator} variant="outline" className="w-full md:w-auto">Reset</Button>
      </div>
      
      {showResults && (
        <div className="mt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium">Monthly Payment</p>
                  <p className="text-3xl font-bold text-primary">${results.monthlyPayment.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium">Total Payment</p>
                  <p className="text-3xl font-bold text-primary">${results.totalPayment.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium">Total Interest</p>
                  <p className="text-3xl font-bold text-primary">${results.totalInterest.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Amortization Schedule (first 24 months)</h3>
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium">Month</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Payment</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Principal</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Interest</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.amortizationSchedule.map((row) => (
                    <tr key={row.month}>
                      <td className="px-4 py-2 text-sm">{row.month}</td>
                      <td className="px-4 py-2 text-sm">${row.payment.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm">${row.principalPayment.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm">${row.interest.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm">${row.balance.toFixed(2)}</td>
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