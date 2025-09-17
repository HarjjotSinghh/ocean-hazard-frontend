import { RetroLayout } from "@/components/retro-layout"
import { QuickStats } from "@/components/quick-stats"

export default function HomePage() {
  return (
    <RetroLayout>
      <div className="retro-form">
        <h2 className="text-xl font-bold font-mono mb-4">Welcome to Ocean Hazard Reporting Platform</h2>

        <table className="retro-table mb-6">
          <thead>
            <tr>
              <th colSpan={2}>System Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold">Organization</td>
              <td>Indian National Centre for Ocean Information Services (INCOIS)</td>
            </tr>
            <tr>
              <td className="font-bold">Ministry</td>
              <td>Ministry of Earth Sciences, Government of India</td>
            </tr>
            <tr>
              <td className="font-bold">Purpose</td>
              <td>Crowdsourced Ocean Hazard Reporting and Social Media Analytics</td>
            </tr>
            <tr>
              <td className="font-bold">Last Updated</td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-2">Quick Navigation</h3>
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold w-1/3">Citizens & Volunteers</td>
                <td>
                  <a href="/report" className="retro-button inline-block">
                    Submit Hazard Report
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold">Government Officials</td>
                <td>
                  <a href="/dashboard" className="retro-button inline-block">
                    Access Officials Dashboard
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold">Data Analysts</td>
                <td>
                  <a href="/analytics" className="retro-button inline-block">
                    View Global Analytics
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-2">Ocean Hazard Categories</h3>
          <table className="retro-table">
            <thead>
              <tr>
                <th>Hazard Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tsunami</td>
                <td>Large ocean waves caused by underwater earthquakes or landslides</td>
              </tr>
              <tr>
                <td>Storm Surge</td>
                <td>Abnormal rise in sea level during storms</td>
              </tr>
              <tr>
                <td>High Waves</td>
                <td>Unusually large waves that can damage coastal areas</td>
              </tr>
              <tr>
                <td>Swell Surge</td>
                <td>Long-period waves that travel across ocean basins</td>
              </tr>
              <tr>
                <td>Coastal Currents</td>
                <td>Strong water currents along the coastline</td>
              </tr>
              <tr>
                <td>Abnormal Sea Behavior</td>
                <td>Unusual tidal patterns or sea level changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <QuickStats />
    </RetroLayout>
  )
}
