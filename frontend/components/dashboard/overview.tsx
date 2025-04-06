"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    assigned: 65,
    returned: 42,
    maintenance: 12,
  },
  {
    name: "Feb",
    assigned: 59,
    returned: 38,
    maintenance: 10,
  },
  {
    name: "Mar",
    assigned: 80,
    returned: 43,
    maintenance: 15,
  },
  {
    name: "Apr",
    assigned: 81,
    returned: 55,
    maintenance: 18,
  },
  {
    name: "May",
    assigned: 56,
    returned: 36,
    maintenance: 8,
  },
  {
    name: "Jun",
    assigned: 55,
    returned: 27,
    maintenance: 14,
  },
  {
    name: "Jul",
    assigned: 40,
    returned: 30,
    maintenance: 5,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="assigned" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="returned" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="maintenance" fill="#06b6d4" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

