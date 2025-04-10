// app/auth/login-register/page.tsx
"use client"

import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function LoginRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Tabs defaultValue="login" className="w-full max-w-md space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
