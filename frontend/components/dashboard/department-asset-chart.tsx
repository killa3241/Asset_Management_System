"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "IT", value: 420, color: "#adfa1d" },
  { name: "HR", value: 98, color: "#06b6d4" },
  { name: "Finance", value: 165, color: "#f97316" },
  { name: "Marketing", value: 210, color: "#8b5cf6" },
  { name: "Operations", value: 355, color: "#ec4899" },
]

export function DepartmentAssetChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

