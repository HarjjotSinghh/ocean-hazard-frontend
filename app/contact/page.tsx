import { RetroLayout } from "@/components/retro-layout"

export default function ContactPage() {
  return (
    <RetroLayout title="Contact Information">
      <div className="space-y-6">
        <div className="retro-form">
          <h2 className="text-xl font-bold font-mono mb-4">
            Indian National Centre for Ocean Information Services (INCOIS)
          </h2>
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold w-1/3">Address</td>
                <td>
                  Pragathi Nagar (BO), Nizampet (SO)
                  <br />
                  Hyderabad - 500090
                  <br />
                  Telangana, India
                </td>
              </tr>
              <tr>
                <td className="font-bold">Phone</td>
                <td>+91-40-23886000</td>
              </tr>
              <tr>
                <td className="font-bold">Emergency Helpline</td>
                <td className="text-destructive font-bold">040-23886001</td>
              </tr>
              <tr>
                <td className="font-bold">Fax</td>
                <td>+91-40-23895001</td>
              </tr>
              <tr>
                <td className="font-bold">Email</td>
                <td>director@incois.gov.in</td>
              </tr>
              <tr>
                <td className="font-bold">Website</td>
                <td>https://www.incois.gov.in</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="retro-form">
          <h3 className="text-lg font-bold font-mono mb-4">Ministry of Earth Sciences</h3>
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold w-1/3">Address</td>
                <td>
                  Prithvi Bhavan, Lodhi Road
                  <br />
                  New Delhi - 110003
                  <br />
                  India
                </td>
              </tr>
              <tr>
                <td className="font-bold">Phone</td>
                <td>+91-11-24362468</td>
              </tr>
              <tr>
                <td className="font-bold">Email</td>
                <td>secy-moes@nic.in</td>
              </tr>
              <tr>
                <td className="font-bold">Website</td>
                <td>https://www.moes.gov.in</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="retro-form">
          <h3 className="text-lg font-bold font-mono mb-4">Regional Offices</h3>
          <table className="retro-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Location</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">Southern Region</td>
                <td>Chennai, Tamil Nadu</td>
                <td>044-25536136</td>
              </tr>
              <tr>
                <td className="font-bold">Western Region</td>
                <td>Mumbai, Maharashtra</td>
                <td>022-22027321</td>
              </tr>
              <tr>
                <td className="font-bold">Eastern Region</td>
                <td>Kolkata, West Bengal</td>
                <td>033-24799003</td>
              </tr>
              <tr>
                <td className="font-bold">Northern Region</td>
                <td>New Delhi</td>
                <td>011-24362468</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="retro-form">
          <h3 className="text-lg font-bold font-mono mb-4">Technical Support</h3>
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold w-1/3">Platform Issues</td>
                <td>support@incois.gov.in</td>
              </tr>
              <tr>
                <td className="font-bold">Data Queries</td>
                <td>data@incois.gov.in</td>
              </tr>
              <tr>
                <td className="font-bold">Research Collaboration</td>
                <td>research@incois.gov.in</td>
              </tr>
              <tr>
                <td className="font-bold">Media Inquiries</td>
                <td>media@incois.gov.in</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </RetroLayout>
  )
}
