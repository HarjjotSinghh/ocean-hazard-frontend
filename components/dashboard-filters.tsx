"use client"

import { useState } from "react"

interface FilterProps {
  onFilterChange: (filters: any) => void
}

export function DashboardFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState({
    hazardType: "",
    urgency: "",
    status: "",
    location: "",
    dateFrom: "",
    dateTo: "",
  })

  const hazardTypes = [
    "Tsunami",
    "Storm Surge",
    "High Waves",
    "Swell Surge",
    "Coastal Currents",
    "Abnormal Sea Behavior",
  ]

  const urgencyLevels = [
    "Low - Observation Only",
    "Medium - Potential Threat",
    "High - Immediate Danger",
    "Critical - Emergency Response Required",
  ]

  const statusOptions = ["Under Review", "Verified", "Investigating", "Resolved", "False Report"]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      hazardType: "",
      urgency: "",
      status: "",
      location: "",
      dateFrom: "",
      dateTo: "",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="retro-form">
      <h3 className="text-lg font-bold font-mono mb-4">Filter Reports</h3>
      <table className="retro-table">
        <tbody>
          <tr>
            <td className="font-bold w-1/6">Hazard Type</td>
            <td>
              <select
                className="retro-select"
                value={filters.hazardType}
                onChange={(e) => handleFilterChange("hazardType", e.target.value)}
              >
                <option value="">All Types</option>
                {hazardTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </td>
            <td className="font-bold w-1/6">Urgency Level</td>
            <td>
              <select
                className="retro-select"
                value={filters.urgency}
                onChange={(e) => handleFilterChange("urgency", e.target.value)}
              >
                <option value="">All Levels</option>
                {urgencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="font-bold">Status</td>
            <td>
              <select
                className="retro-select"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="font-bold">Location</td>
            <td>
              <input
                type="text"
                className="retro-input"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="font-bold">Date From</td>
            <td>
              <input
                type="date"
                className="retro-input"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              />
            </td>
            <td className="font-bold">Date To</td>
            <td>
              <input
                type="date"
                className="retro-input"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button onClick={clearFilters} className="retro-button">
          Clear All Filters
        </button>
      </div>
    </div>
  )
}
