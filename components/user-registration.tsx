"use client"
import { RetroForm } from "./retro-form"

interface UserRegistrationProps {
  onRegistrationComplete: (userData: any) => void
}

export function UserRegistration({ onRegistrationComplete }: UserRegistrationProps) {
  const userTypes = [
    "Citizen/Volunteer",
    "Coastal Resident",
    "Fisherman",
    "Tourist",
    "Government Official",
    "Emergency Responder",
    "Researcher/Scientist",
  ]

  const states = [
    "Andhra Pradesh",
    "Goa",
    "Gujarat",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Odisha",
    "Tamil Nadu",
    "West Bengal",
    "Puducherry",
    "Andaman and Nicobar Islands",
    "Lakshadweep",
  ]

  const formFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text" as const,
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "text" as const,
      required: true,
    },
    {
      name: "phoneNumber",
      label: "Mobile Number",
      type: "text" as const,
      required: true,
    },
    {
      name: "userType",
      label: "User Category",
      type: "select" as const,
      options: userTypes,
      required: true,
    },
    {
      name: "state",
      label: "State/UT",
      type: "select" as const,
      options: states,
      required: true,
    },
    {
      name: "district",
      label: "District",
      type: "text" as const,
      required: true,
    },
    {
      name: "address",
      label: "Complete Address",
      type: "textarea" as const,
      required: true,
    },
  ]

  const handleSubmit = (data: Record<string, any>) => {
    // Generate user ID
    const userId = `USER${Date.now()}`
    const userData = { ...data, userId, registrationDate: new Date().toISOString() }
    onRegistrationComplete(userData)
  }

  return (
    <div>
      <div className="retro-form mb-6">
        <h2 className="text-xl font-bold font-mono mb-4">User Registration Benefits</h2>
        <table className="retro-table">
          <tbody>
            <tr>
              <td className="font-bold w-1/3">Report Tracking</td>
              <td>Track status of your submitted reports</td>
            </tr>
            <tr>
              <td className="font-bold">Priority Alerts</td>
              <td>Receive hazard warnings for your area</td>
            </tr>
            <tr>
              <td className="font-bold">Contribution History</td>
              <td>View your reporting history and impact</td>
            </tr>
            <tr>
              <td className="font-bold">Recognition</td>
              <td>Get acknowledged for valuable contributions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <RetroForm
        title="New User Registration"
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel="Register Account"
      />
    </div>
  )
}
