// components/assets/asset-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AssetForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    purchaseDate: "",
    status: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    if (!formData.name || !formData.type || !formData.purchaseDate || !formData.status || !formData.value) {
      toast.error("All fields are required.");
      return false;
    }
    if (isNaN(Number(formData.value)) || Number(formData.value) <= 0) {
      toast.error("Value must be a positive number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          value: parseFloat(formData.value),
        }),
      });

      if (res.ok) {
        toast.success("Asset registered successfully!");
        router.push("/assets");
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to register asset.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <input
        name="name"
        placeholder="Asset Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="type"
        placeholder="Asset Type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="purchaseDate"
        value={formData.purchaseDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Status</option>
        <option value="Available">Available</option>
        <option value="Assigned">Assigned</option>
        <option value="Under Maintenance">Under Maintenance</option>
        <option value="Retired">Retired</option>
      </select>
      <input
        name="value"
        placeholder="Asset Value"
        value={formData.value}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Register Asset"}
      </button>
    </form>
  );
}
