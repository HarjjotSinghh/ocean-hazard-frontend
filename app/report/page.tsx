"use client"

import { useState } from "react"
import { RetroLayout } from "@/components/retro-layout"
import { RetroForm } from "@/components/retro-form"

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [reportId, setReportId] = useState("")

  const hazardCategories = [
    "Tsunami",
    "Storm Surge",
    "High Waves",
    "Swell Surge",
    "Coastal Currents",
    "Abnormal Sea Behavior",
    "Coastal Flooding",
    "Other",
  ]

  const urgencyLevels = [
    "Low - Observation Only",
    "Medium - Potential Threat",
    "High - Immediate Danger",
    "Critical - Emergency Response Required",
  ]

  const formFields = [
    {
      name: "reporterName",
      label: "Reporter Name",
      type: "text" as const,
      required: true,
    },
    {
      name: "contactNumber",
      label: "Contact Number",
      type: "text" as const,
      required: true,
    },
    {
      name: "location",
      label: "Location Details",
      type: "textarea" as const,
      required: true,
    },
    {
      name: "hazardCategory",
      label: "Hazard Category",
      type: "select" as const,
      options: hazardCategories,
      required: true,
    },
    {
      name: "urgencyLevel",
      label: "Urgency Level",
      type: "select" as const,
      options: urgencyLevels,
      required: true,
    },
    {
      name: "description",
      label: "Detailed Description",
      type: "textarea" as const,
      required: true,
    },
    {
      name: "mediaFile",
      label: "Photo/Video Evidence",
      type: "file" as const,
      required: false,
    },
  ]

  const handleSubmit = (data: Record<string, any>) => {
    // Simulate form submission
    const newReportId = `HR${Date.now()}`
    setReportId(newReportId)
    setSubmitted(true)

    // In a real application, this would send data to the server
    console.log("Report submitted:", data)
  }

  if (submitted) {
    return (
      <RetroLayout title="Report Submitted Successfully">
        <div className="retro-form">
          <h2 className="text-xl font-bold font-mono mb-4">Report Submission Confirmation</h2>

          <table className="retro-table mb-6">
            <tbody>
              <tr>
                <td className="font-bold w-1/3">Report ID</td>
                <td className="font-mono">{reportId}</td>
              </tr>
              <tr>
                <td className="font-bold">Status</td>
                <td className="text-accent font-bold">SUBMITTED</td>
              </tr>
              <tr>
                <td className="font-bold">Submission Time</td>
                <td>{new Date().toLocaleString()}</td>
              </tr>
              <tr>
                <td className="font-bold">Next Steps</td>
                <td>Your report will be reviewed by INCOIS officials within 2-4 hours</td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4">
            <p className="mb-2">
              <strong>Important Notes:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Keep your Report ID ({reportId}) for future reference</li>
              <li>You may be contacted for additional information</li>
              <li>For immediate emergencies, contact local authorities: 100 (Police), 108 (Emergency)</li>
              <li>INCOIS Emergency Helpline: 040-23886001</li>
            </ul>
          </div>

          <button
            onClick={() => {
              setSubmitted(false)
              setReportId("")
            }}
            className="retro-button mr-4"
          >
            Submit Another Report
          </button>
          <a href="/" className="retro-button inline-block">
            Return to Home
          </a>
        </div>
      </RetroLayout>
    )
  }

  return (
    <RetroLayout title="Submit Ocean Hazard Report">
      <div className="mb-6">
        <div className="retro-form">
          <h2 className="text-xl font-bold font-mono mb-4">Important Instructions</h2>
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold w-1/4">Emergency</td>
                <td>For immediate life-threatening situations, call 100 (Police) or 108 (Emergency) first</td>
              </tr>
              <tr>
                <td className="font-bold">Location</td>
                <td>Provide exact location with landmarks, GPS coordinates if available</td>
              </tr>
              <tr>
                <td className="font-bold">Media Files</td>
                <td>Photos and videos will be automatically geotagged for location verification</td>
              </tr>
              <tr>
                <td className="font-bold">Contact</td>
                <td>Ensure your contact number is correct for follow-up communication</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <RetroForm
        title="Ocean Hazard Report Form"
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel="Submit Hazard Report"
      />
    </RetroLayout>
  )
}
