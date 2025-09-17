export function SocialMediaInsights() {
  const platformInsights = [
    {
      platform: "Twitter",
      totalMentions: 1247,
      sentiment: "Concerned",
      engagement: "High",
      topHashtags: "#TsunamiAlert #OceanSafety #INCOIS",
      influentialUsers: 23,
    },
    {
      platform: "Facebook",
      totalMentions: 856,
      sentiment: "Informative",
      engagement: "Medium",
      topHashtags: "Ocean Warning, Coastal Safety",
      influentialUsers: 15,
    },
    {
      platform: "YouTube",
      totalMentions: 234,
      sentiment: "Educational",
      engagement: "High",
      topHashtags: "Ocean Hazards, Safety Tips",
      influentialUsers: 8,
    },
    {
      platform: "Instagram",
      totalMentions: 189,
      sentiment: "Visual",
      engagement: "Medium",
      topHashtags: "#CoastalLife #OceanWatch",
      influentialUsers: 12,
    },
  ]

  const keywordTrends = [
    { keyword: "tsunami warning", mentions: 456, trend: "↑ 23%", riskLevel: "High" },
    { keyword: "high waves", mentions: 389, trend: "↑ 15%", riskLevel: "Medium" },
    { keyword: "storm surge", mentions: 267, trend: "→ 2%", riskLevel: "Medium" },
    { keyword: "coastal flooding", mentions: 234, trend: "↓ 8%", riskLevel: "Low" },
    { keyword: "ocean safety", mentions: 198, trend: "↑ 12%", riskLevel: "Low" },
  ]

  return (
    <div className="space-y-6">
      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">Social Media Platform Analysis</h3>
        <table className="retro-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Total Mentions</th>
              <th>Sentiment</th>
              <th>Engagement</th>
              <th>Top Content</th>
              <th>Influential Users</th>
            </tr>
          </thead>
          <tbody>
            {platformInsights.map((platform, index) => (
              <tr key={index}>
                <td className="font-bold">{platform.platform}</td>
                <td className="text-accent font-bold">{platform.totalMentions}</td>
                <td>
                  <span
                    className={`font-bold ${
                      platform.sentiment === "Concerned"
                        ? "text-destructive"
                        : platform.sentiment === "Informative"
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  >
                    {platform.sentiment}
                  </span>
                </td>
                <td>{platform.engagement}</td>
                <td className="text-sm">{platform.topHashtags}</td>
                <td className="text-accent font-bold">{platform.influentialUsers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">Keyword Trend Analysis</h3>
        <table className="retro-table">
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Mentions</th>
              <th>Trend (24h)</th>
              <th>Risk Level</th>
              <th>Action Required</th>
            </tr>
          </thead>
          <tbody>
            {keywordTrends.map((keyword, index) => (
              <tr key={index}>
                <td className="font-mono">{keyword.keyword}</td>
                <td className="text-accent font-bold">{keyword.mentions}</td>
                <td className="font-bold">{keyword.trend}</td>
                <td>
                  <span
                    className={`font-bold ${
                      keyword.riskLevel === "High"
                        ? "text-destructive"
                        : keyword.riskLevel === "Medium"
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  >
                    {keyword.riskLevel}
                  </span>
                </td>
                <td>
                  {keyword.riskLevel === "High" ? (
                    <span className="text-destructive font-bold">MONITOR CLOSELY</span>
                  ) : keyword.riskLevel === "Medium" ? (
                    <span className="text-accent font-bold">TRACK TRENDS</span>
                  ) : (
                    <span className="text-muted-foreground">ROUTINE</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="retro-form">
        <h3 className="text-lg font-bold font-mono mb-4">AI-Generated Insights Summary</h3>
        <table className="retro-table">
          <tbody>
            <tr>
              <td className="font-bold w-1/4">Overall Sentiment</td>
              <td>
                <span className="text-accent font-bold">HEIGHTENED AWARENESS</span> - Public showing increased concern
                about ocean hazards
              </td>
            </tr>
            <tr>
              <td className="font-bold">Key Findings</td>
              <td>Tsunami-related discussions up 23%, concentrated in Tamil Nadu and Kerala coastal regions</td>
            </tr>
            <tr>
              <td className="font-bold">Recommendation</td>
              <td>
                <span className="text-destructive font-bold">INCREASE MONITORING</span> - Deploy additional resources to
                high-mention areas
              </td>
            </tr>
            <tr>
              <td className="font-bold">Next Review</td>
              <td>2 hours (automated) | 6 hours (manual analysis)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
