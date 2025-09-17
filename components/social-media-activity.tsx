export function SocialMediaActivity() {
  const mockSocialData = [
    {
      platform: "Twitter",
      mentions: 45,
      sentiment: "Concerned",
      topKeywords: "tsunami, waves, Chennai",
      lastUpdate: "2 minutes ago",
    },
    {
      platform: "Facebook",
      mentions: 23,
      sentiment: "Alert",
      topKeywords: "storm surge, Kerala coast",
      lastUpdate: "5 minutes ago",
    },
    {
      platform: "YouTube",
      mentions: 12,
      sentiment: "Informative",
      topKeywords: "ocean safety, warning",
      lastUpdate: "15 minutes ago",
    },
  ]

  const trendingKeywords = [
    { keyword: "tsunami warning", frequency: 89, trend: "↑" },
    { keyword: "high waves", frequency: 67, trend: "↑" },
    { keyword: "coastal flooding", frequency: 45, trend: "→" },
    { keyword: "storm surge", frequency: 34, trend: "↓" },
    { keyword: "sea level rise", frequency: 23, trend: "↑" },
  ]

  return (
    <div className="space-y-4">
      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">Social Media Activity Analysis</h3>
        <table className="retro-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Mentions</th>
              <th>Sentiment</th>
              <th>Top Keywords</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {mockSocialData.map((item, index) => (
              <tr key={index}>
                <td className="font-bold">{item.platform}</td>
                <td className="text-accent font-bold">{item.mentions}</td>
                <td>
                  <span
                    className={`font-bold ${
                      item.sentiment === "Concerned"
                        ? "text-destructive"
                        : item.sentiment === "Alert"
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  >
                    {item.sentiment}
                  </span>
                </td>
                <td className="text-sm">{item.topKeywords}</td>
                <td className="text-xs text-muted-foreground">{item.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">Trending Keywords</h3>
        <table className="retro-table">
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Frequency</th>
              <th>Trend</th>
              <th>Risk Assessment</th>
            </tr>
          </thead>
          <tbody>
            {trendingKeywords.map((item, index) => (
              <tr key={index}>
                <td className="font-mono">{item.keyword}</td>
                <td className="text-accent font-bold">{item.frequency}</td>
                <td className="text-lg">{item.trend}</td>
                <td>
                  <span
                    className={`font-bold ${
                      item.frequency > 60
                        ? "text-destructive"
                        : item.frequency > 30
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  >
                    {item.frequency > 60 ? "HIGH" : item.frequency > 30 ? "MEDIUM" : "LOW"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
