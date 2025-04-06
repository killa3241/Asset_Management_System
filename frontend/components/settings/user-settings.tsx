"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { PlusCircle } from "lucide-react"

export function UserSettings() {
  const roles = [
    {
      id: 1,
      name: "Administrator",
      description: "Full access to all system features",
      permissions: {
        assets: { create: true, read: true, update: true, delete: true },
        users: { create: true, read: true, update: true, delete: true },
        departments: { create: true, read: true, update: true, delete: true },
        maintenance: { create: true, read: true, update: true, delete: true },
        reports: { create: true, read: true, update: true, delete: true },
        disposals: { create: true, read: true, update: true, delete: true },
        settings: { create: true, read: true, update: true, delete: true },
      },
    },
    {
      id: 2,
      name: "Manager",
      description: "Access to manage assets and users",
      permissions: {
        assets: { create: true, read: true, update: true, delete: false },
        users: { create: true, read: true, update: true, delete: false },
        departments: { create: false, read: true, update: true, delete: false },
        maintenance: { create: true, read: true, update: true, delete: false },
        reports: { create: true, read: true, update: false, delete: false },
        disposals: { create: true, read: true, update: true, delete: false },
        settings: { create: false, read: true, update: false, delete: false },
      },
    },
    {
      id: 3,
      name: "User",
      description: "Basic access to view and request assets",
      permissions: {
        assets: { create: false, read: true, update: false, delete: false },
        users: { create: false, read: true, update: false, delete: false },
        departments: { create: false, read: true, update: false, delete: false },
        maintenance: { create: false, read: true, update: false, delete: false },
        reports: { create: false, read: true, update: false, delete: false },
        disposals: { create: false, read: true, update: false, delete: false },
        settings: { create: false, read: false, update: false, delete: false },
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles & Permissions</CardTitle>
        <CardDescription>Manage user access to system features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.id}>
              <CardHeader>
                <CardTitle>{role.name}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead className="text-center">Create</TableHead>
                      <TableHead className="text-center">Read</TableHead>
                      <TableHead className="text-center">Update</TableHead>
                      <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(role.permissions).map(([module, perms]) => (
                      <TableRow key={module}>
                        <TableCell className="font-medium capitalize">{module}</TableCell>
                        <TableCell className="text-center">
                          <Switch checked={perms.create} />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch checked={perms.read} />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch checked={perms.update} />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch checked={perms.delete} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Role
        </Button>
      </CardFooter>
    </Card>
  )
}

