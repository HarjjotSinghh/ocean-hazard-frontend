import { RetroLayout } from "@/components/retro-layout"

export default function GuidelinesPage() {
  return (
    <RetroLayout title="Ocean Hazard Reporting Guidelines">
      <div className="space-y-6">
        <div className="retro-form">
          <h2 className="text-xl font-bold font-mono mb-4">Reporting Guidelines</h2>
          <table className="retro-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Action</th>
                <th>Important Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">1</td>
                <td>Ensure Personal Safety</td>
                <td>Move to safe location before reporting. Call emergency services (100/108) if immediate danger.</td>
              </tr>
              <tr>
                <td className="font-bold">2</td>
                <td>Observe and Document</td>
                <td>Take photos/videos if safe. Note exact time, location, and weather conditions.</td>
              </tr>
              <tr>
                <td className="font-bold">3</td>
                <td>Submit Report</td>
                <td>Use the online form with accurate location details. Include GPS coordinates if available.</td>
              </tr>
              <tr>
                <td className="font-bold">4</td>
                <td>Follow Up</td>
                <td>Keep your Report ID for reference. Officials may contact you for additional information.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="retro-form">
          <h3 className="text-lg font-bold font-mono mb-4">Hazard Identification Guide</h3>
          <table className="retro-table">
            <thead>
              <tr>
                <th>Hazard Type</th>
                <th>Key Indicators</th>
                <th>Urgency Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">Tsunami</td>
                <td>Sudden sea recession, unusual waves, ground shaking</td>
                <td className="text-destructive font-bold">CRITICAL</td>
              </tr>
              <tr>
                <td className="font-bold">Storm Surge</td>
                <td>Rapid sea level rise during storms, flooding</td>
                <td className="text-destructive font-bold">HIGH</td>
              </tr>
              <tr>
                <td className="font-bold">High Waves</td>
                <td>Waves significantly larger than normal, dangerous surf</td>
                <td className="text-accent font-bold">MEDIUM-HIGH</td>
              </tr>
              <tr>
                <td className="font-bold">Swell Surge</td>
                <td>Long-period waves, sudden water level changes</td>
                <td className="text-accent font-bold">MEDIUM</td>
              </tr>
              <tr>
                <td className="font-bold">Coastal Currents</td>
                <td>Strong water movement, dangerous swimming conditions</td>
                <td className="text-accent font-bold">MEDIUM</td>
              </tr>
              <tr>
                <td className="font-bold">Abnormal Sea Behavior</td>
                <td>Unusual tides, strange water color/temperature</td>
                <td className="text-muted-foreground font-bold">LOW-MEDIUM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="retro-form">
          <h3 className="text-lg font-bold font-mono mb-4">Emergency Contact Information</h3>
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold w-1/3">National Emergency</td>
                <td className="text-destructive font-bold">100 (Police) | 108 (Ambulance)</td>
              </tr>
              <tr>
                <td className="font-bold">INCOIS Emergency Helpline</td>
                <td className="text-accent font-bold">040-23886001</td>
              </tr>
              <tr>
                <td className="font-bold">Disaster Management</td>
                <td className="text-accent font-bold">1078 (NDMA)</td>
              </tr>
              <tr>
                <td className="font-bold">Coast Guard</td>
                <td className="text-accent font-bold">1554</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </RetroLayout>
  )
}
