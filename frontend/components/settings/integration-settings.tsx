"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function IntegrationSettings() {
  const integrations = [
    {
      id: 1,
      name: "Email Service",
      description: "Configure SMTP settings for email notifications",
      connected: true,
      fields: [
        { name: "SMTP Server", value: "smtp.example.com" },
        { name: "SMTP Port", value: "587" },
        { name: "SMTP Username", value: "notifications@example.com" },
        { name: "SMTP Password", value: "••••••••••••" },
      ],
    },
    {
      id: 2,
      name: "Active Directory",
      description: "Sync users and departments with Active Directory",
      connected: true,
      fields: [
        { name: "LDAP Server", value: "ldap://ad.example.com" },
        { name: "LDAP Port", value: "389" },
        { name: "Bind DN", value: "cn=admin,dc=example,dc=com" },
        { name: "Bind Password", value: "••••••••••••" },
        { name: "Base DN", value: "dc=example,dc=com" },
      ],
    },
    {
      id: 3,
      name: "Accounting System",
      description: "Connect to your accounting system for financial tracking",
      connected: false,
      fields: [
        { name: "API URL", value: "" },
        { name: "API Key", value: "" },
        { name: "Organization ID", value: "" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {integrations.map((integration) => (
        <Card key={integration.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{integration.name}</CardTitle>
                <CardDescription>{integration.description}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor={`integration-${integration.id}`} className="text-sm">
                  {integration.connected ? "Connected" : "Disconnected"}
                </Label>
                <Switch id={`integration-${integration.id}`} checked={integration.connected} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integration.fields.map((field, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <Label htmlFor={`${integration.id}-${index}`} className="self-center">
                    {field.name}
                  </Label>
                  <Input
                    id={`${integration.id}-${index}`}
                    value={field.value}
                    type={field.name.toLowerCase().includes("password") ? "password" : "text"}
                    disabled={!integration.connected}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Test Connection</Button>
            <Button disabled={!integration.connected}>Save Changes</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

