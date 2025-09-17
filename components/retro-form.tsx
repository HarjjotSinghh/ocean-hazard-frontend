"use client"

import type React from "react"

import { useState } from "react"

interface FormField {
  name: string
  label: string
  type: "text" | "textarea" | "select" | "file"
  options?: string[]
  required?: boolean
}

interface RetroFormProps {
  title: string
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  submitLabel?: string
}

export function RetroForm({ title, fields, onSubmit, submitLabel = "Submit" }: RetroFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="retro-form">
      <h2 className="text-xl font-bold font-mono mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        <table className="retro-table">
          <tbody>
            {fields.map((field) => (
              <tr key={field.name}>
                <td className="font-bold w-1/3">
                  {field.label}
                  {field.required && <span className="text-destructive">*</span>}
                </td>
                <td>
                  {field.type === "text" && (
                    <input
                      type="text"
                      className="retro-input"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      className="retro-input"
                      rows={4}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      className="retro-select"
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {field.type === "file" && (
                    <input
                      type="file"
                      className="retro-input"
                      onChange={(e) => handleChange(field.name, e.target.files?.[0])}
                      accept="image/*,video/*"
                      required={field.required}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button type="submit" className="retro-button">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}
