interface MapVisualizationProps {
  reports: any[]
  hotspots: any[]
}

export function MapVisualization({ reports, hotspots }: MapVisualizationProps) {
  return (
    <div className="retro-form">
      <h3 className="text-lg font-bold font-mono mb-4">Interactive Map Visualization</h3>

      {/* Placeholder for map - in a real application, this would integrate with a mapping service */}
      <div className="border-2 border-border bg-card p-8 text-center min-h-96 flex flex-col justify-center">
        <div className="mb-4">
          <h4 className="font-bold font-mono text-lg mb-2">Indian Ocean Coastline Map</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Interactive map showing real-time hazard reports and hotspots
          </p>
        </div>

        {/* Map Legend */}
        <div className="retro-form max-w-md mx-auto">
          <table className="retro-table text-sm">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Meaning</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-destructive font-bold">●</td>
                <td>High Risk Hotspot</td>
                <td>{hotspots.filter((h) => h.riskLevel === "High").length}</td>
              </tr>
              <tr>
                <td className="text-accent font-bold">●</td>
                <td>Medium Risk Hotspot</td>
                <td>{hotspots.filter((h) => h.riskLevel === "Medium").length}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground font-bold">●</td>
                <td>Low Risk Hotspot</td>
                <td>{hotspots.filter((h) => h.riskLevel === "Low").length}</td>
              </tr>
              <tr>
                <td className="text-primary font-bold">▲</td>
                <td>Verified Reports</td>
                <td>{reports.filter((r) => r.verified).length}</td>
              </tr>
              <tr>
                <td className="text-secondary-foreground font-bold">△</td>
                <td>Unverified Reports</td>
                <td>{reports.filter((r) => !r.verified).length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>Map integration with Google Maps/OpenStreetMap would be implemented here</p>
          <p>Features: Real-time plotting, clustering, zoom controls, layer toggles</p>
        </div>
      </div>
    </div>
  )
}
