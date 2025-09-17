interface AnalyticsChartsProps {
  data: any[]
  timeRange: string
}

export function AnalyticsCharts({ data, timeRange }: AnalyticsChartsProps) {
  const hazardTypeDistribution = [
    { type: "High Waves", count: 234, percentage: 34 },
    { type: "Storm Surge", count: 156, percentage: 23 },
    { type: "Coastal Currents", count: 123, percentage: 18 },
    { type: "Abnormal Sea Behavior", count: 89, percentage: 13 },
    { type: "Tsunami", count: 45, percentage: 7 },
    { type: "Swell Surge", count: 34, percentage: 5 },
  ]

  const urgencyDistribution = [
    { level: "Low - Observation Only", count: 298, percentage: 43 },
    { level: "Medium - Potential Threat", count: 234, percentage: 34 },
    { level: "High - Immediate Danger", count: 123, percentage: 18 },
    { level: "Critical - Emergency Response", count: 32, percentage: 5 },
  ]

  return (
    <div className="space-y-6">
      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">Hazard Type Distribution ({timeRange})</h3>
        <table className="retro-table">
          <thead>
            <tr>
              <th>Hazard Type</th>
              <th>Count</th>
              <th>Percentage</th>
              <th>Visual Distribution</th>
            </tr>
          </thead>
          <tbody>
            {hazardTypeDistribution.map((item, index) => (
              <tr key={index}>
                <td className="font-bold">{item.type}</td>
                <td className="text-accent font-bold">{item.count}</td>
                <td>{item.percentage}%</td>
                <td>
                  <div className="flex items-center">
                    <div className="w-32 bg-secondary h-4 border border-border">
                      <div className="h-full bg-accent" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">Urgency Level Analysis ({timeRange})</h3>
        <table className="retro-table">
          <thead>
            <tr>
              <th>Urgency Level</th>
              <th>Count</th>
              <th>Percentage</th>
              <th>Risk Indicator</th>
            </tr>
          </thead>
          <tbody>
            {urgencyDistribution.map((item, index) => (
              <tr key={index}>
                <td className="font-bold">{item.level}</td>
                <td className="text-accent font-bold">{item.count}</td>
                <td>{item.percentage}%</td>
                <td>
                  <span
                    className={`font-bold ${
                      item.level.includes("Critical")
                        ? "text-destructive"
                        : item.level.includes("High")
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  >
                    {item.level.includes("Critical") || item.level.includes("High") ? "HIGH" : "NORMAL"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">Temporal Analysis</h3>
        <table className="retro-table">
          <tbody>
            <tr>
              <td className="font-bold w-1/3">Peak Reporting Hours</td>
              <td>14:00 - 16:00 IST (Afternoon)</td>
            </tr>
            <tr>
              <td className="font-bold">Most Active Day</td>
              <td>Monday (23% of weekly reports)</td>
            </tr>
            <tr>
              <td className="font-bold">Seasonal Trend</td>
              <td>Monsoon Season (June-September) - 67% increase</td>
            </tr>
            <tr>
              <td className="font-bold">Response Time (Avg)</td>
              <td>2.3 hours for verification</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
