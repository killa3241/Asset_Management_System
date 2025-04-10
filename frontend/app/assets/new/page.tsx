"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function RegisterAssetPage() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    purchaseDate: "",
    status: "",
    value: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", form);

    try {
      const res = await fetch("http://localhost:8080/api/assets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //credentials: "include",
        body: JSON.stringify(form), // ✅ Corrected here
      });

      if (!res.ok) throw new Error("Failed to register asset");

      toast.success("Asset registered successfully!");
      router.push("/assets");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-xl font-bold mb-4">Register Asset</h1>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input name="type" value={form.type} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input name="status" value={form.status} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="value">Value</Label>
              <Input type="number" step="0.01" name="value" value={form.value} onChange={handleChange} required />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
