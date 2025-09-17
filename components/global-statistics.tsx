interface GlobalStatisticsProps {
  timeRange: string
}

export function GlobalStatistics({ timeRange }: GlobalStatisticsProps) {
  // Mock statistics based on time range
  const getStats = (range: string) => {
    const baseStats = {
      totalReports: 687,
      verifiedReports: 603,
      highRiskEvents: 94,
      activeHotspots: 12,
      socialMentions: 2847,
      affectedStates: 8,
    }

    const multiplier = range === "1h" ? 0.1 : range === "6h" ? 0.3 : range === "24h" ? 1 : range === "7d" ? 4 : 15

    return {
      totalReports: Math.round(baseStats.totalReports * multiplier),
      verifiedReports: Math.round(baseStats.verifiedReports * multiplier),
      highRiskEvents: Math.round(baseStats.highRiskEvents * multiplier),
      activeHotspots: Math.round(baseStats.activeHotspots * (multiplier > 1 ? 1.2 : multiplier)),
      socialMentions: Math.round(baseStats.socialMentions * multiplier),
      affectedStates: Math.min(baseStats.affectedStates, Math.round(baseStats.affectedStates * multiplier)),
    }
  }

  const stats = getStats(timeRange)
  const verificationRate = Math.round((stats.verifiedReports / stats.totalReports) * 100)

  return (
    <div className="retro-form">
      <h2 className="text-xl font-bold font-mono mb-4">Global Statistics ({timeRange})</h2>
      <table className="retro-table">
        <tbody>
          <tr>
            <td className="font-bold w-1/4">Total Reports</td>
            <td className="text-accent font-bold text-lg">{stats.totalReports}</td>
            <td className="font-bold w-1/4">Verified Reports</td>
            <td className="text-accent font-bold text-lg">{stats.verifiedReports}</td>
          </tr>
          <tr>
            <td className="font-bold">High Risk Events</td>
            <td className="text-destructive font-bold text-lg">{stats.highRiskEvents}</td>
            <td className="font-bold">Verification Rate</td>
            <td className="text-accent font-bold text-lg">{verificationRate}%</td>
          </tr>
          <tr>
            <td className="font-bold">Active Hotspots</td>
            <td className="text-destructive font-bold text-lg">{stats.activeHotspots}</td>
            <td className="font-bold">Affected States</td>
            <td className="text-accent font-bold text-lg">{stats.affectedStates}</td>
          </tr>
          <tr>
            <td className="font-bold">Social Media Mentions</td>
            <td className="text-accent font-bold text-lg">{stats.socialMentions}</td>
            <td className="font-bold">Data Freshness</td>
            <td className="text-accent font-bold">Real-time</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
