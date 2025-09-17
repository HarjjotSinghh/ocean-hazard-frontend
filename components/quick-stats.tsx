export function QuickStats() {
  return (
    <div className="retro-form">
      <h3 className="text-lg font-bold font-mono mb-4">System Status</h3>
      <table className="retro-table">
        <tbody>
          <tr>
            <td className="font-bold w-1/3">System Status</td>
            <td className="text-accent font-bold">OPERATIONAL</td>
          </tr>
          <tr>
            <td className="font-bold">Last Data Update</td>
            <td>{new Date().toLocaleString()}</td>
          </tr>
          <tr>
            <td className="font-bold">Active Monitoring Stations</td>
            <td className="text-accent font-bold">247</td>
          </tr>
          <tr>
            <td className="font-bold">Registered Users</td>
            <td className="text-accent font-bold">12,456</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
