"use client"

import { useState } from "react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, AreaChart, Area } from "recharts"
import { RetroLayout } from "@/components/retro-layout"
import { RetroTable } from "@/components/retro-table"
import { DashboardFilters } from "@/components/dashboard-filters"
import { MapVisualization } from "@/components/map-visualization"
import { SocialMediaActivity } from "@/components/social-media-activity"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Mock data for demonstration
const mockReports = [
  {
    id: "HR1703123456",
    timestamp: "2024-12-16 14:30:00",
    location: "Marina Beach, Chennai, Tamil Nadu",
    hazardType: "High Waves",
    urgency: "Medium - Potential Threat",
    reporter: "Ravi Kumar",
    status: "Under Review",
    verified: false,
  },
  {
    id: "HR1703123457",
    timestamp: "2024-12-16 13:15:00",
    location: "Kovalam Beach, Kerala",
    hazardType: "Storm Surge",
    urgency: "High - Immediate Danger",
    reporter: "Priya Nair",
    status: "Verified",
    verified: true,
  },
  {
    id: "HR1703123458",
    timestamp: "2024-12-16 12:45:00",
    location: "Puri Beach, Odisha",
    hazardType: "Abnormal Sea Behavior",
    urgency: "Low - Observation Only",
    reporter: "Suresh Panda",
    status: "Investigating",
    verified: false,
  },
]

const mockHotspots = [
  {
    location: "Chennai Coast",
    reportCount: 12,
    riskLevel: "High",
    lastUpdated: "2024-12-16 14:30:00",
  },
  {
    location: "Kerala Backwaters",
    reportCount: 8,
    riskLevel: "Medium",
    lastUpdated: "2024-12-16 13:45:00",
  },
  {
    location: "Gujarat Coast",
    reportCount: 5,
    riskLevel: "Low",
    lastUpdated: "2024-12-16 12:15:00",
  },
]

const dailyActivityData = [
  { time: "00:00", reports: 2, verifications: 1, alerts: 0 },
  { time: "03:00", reports: 1, verifications: 0, alerts: 0 },
  { time: "06:00", reports: 3, verifications: 2, alerts: 1 },
  { time: "09:00", reports: 8, verifications: 6, alerts: 2 },
  { time: "12:00", reports: 12, verifications: 9, alerts: 3 },
  { time: "15:00", reports: 15, verifications: 12, alerts: 4 },
  { time: "18:00", reports: 10, verifications: 8, alerts: 2 },
  { time: "21:00", reports: 6, verifications: 5, alerts: 1 },
]

const hazardTypeDistribution = [
  { name: "High Waves", value: 35, color: "#007BBF" },
  { name: "Storm Surge", value: 25, color: "#0099CC" },
  { name: "Rip Currents", value: 20, color: "#00B8D4" },
  { name: "Tidal Anomaly", value: 15, color: "#26C6DA" },
  { name: "Other", value: 5, color: "#80DEEA" },
]

const weeklyTrendData = [
  { day: "Mon", total: 18, verified: 15, pending: 3 },
  { day: "Tue", total: 22, verified: 18, pending: 4 },
  { day: "Wed", total: 25, verified: 20, pending: 5 },
  { day: "Thu", total: 19, verified: 16, pending: 3 },
  { day: "Fri", total: 28, verified: 24, pending: 4 },
  { day: "Sat", total: 31, verified: 27, pending: 4 },
  { day: "Sun", total: 26, verified: 22, pending: 4 },
]

const statePerformanceData = [
  { state: "TN", response: 95, accuracy: 92, coverage: 88 },
  { state: "KL", response: 93, accuracy: 89, coverage: 85 },
  { state: "OD", response: 91, accuracy: 87, coverage: 82 },
  { state: "GJ", response: 89, accuracy: 85, coverage: 79 },
  { state: "WB", response: 88, accuracy: 84, coverage: 81 },
  { state: "MH", response: 87, accuracy: 83, coverage: 78 },
]

const verificationTimeline = [
  { hour: "1h", verified: 5, pending: 12 },
  { hour: "2h", verified: 8, pending: 15 },
  { hour: "3h", verified: 12, pending: 13 },
  { hour: "4h", verified: 15, pending: 11 },
  { hour: "5h", verified: 18, pending: 9 },
  { hour: "6h", verified: 22, pending: 6 },
  { hour: "7h", verified: 25, pending: 4 },
  { hour: "8h", verified: 28, pending: 2 },
]

export default function DashboardPage() {
  const [filteredReports, setFilteredReports] = useState(mockReports)
  const [selectedReport, setSelectedReport] = useState<any>(null)

  const reportColumns = [
    { key: "id", label: "Report ID" },
    { key: "timestamp", label: "Date/Time" },
    { key: "location", label: "Location" },
    { key: "hazardType", label: "Hazard Type" },
    { key: "urgency", label: "Urgency Level" },
    { key: "status", label: "Status" },
    {
      key: "verified",
      label: "Verified",
      render: (value: boolean) => (
        <span className={value ? "text-accent font-bold" : "text-muted-foreground"}>{value ? "YES" : "NO"}</span>
      ),
    },
  ]

  const hotspotColumns = [
    { key: "location", label: "Location" },
    { key: "reportCount", label: "Reports" },
    {
      key: "riskLevel",
      label: "Risk Level",
      render: (value: string) => (
        <span
          className={`font-bold ${
            value === "High" ? "text-destructive" : value === "Medium" ? "text-accent" : "text-muted-foreground"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "lastUpdated", label: "Last Updated" },
  ]

  const handleFilterChange = (filters: any) => {
    let filtered = mockReports

    if (filters.hazardType) {
      filtered = filtered.filter((report) => report.hazardType === filters.hazardType)
    }

    if (filters.urgency) {
      filtered = filtered.filter((report) => report.urgency === filters.urgency)
    }

    if (filters.status) {
      filtered = filtered.filter((report) => report.status === filters.status)
    }

    if (filters.dateFrom) {
      filtered = filtered.filter((report) => report.timestamp >= filters.dateFrom)
    }

    setFilteredReports(filtered)
  }

  const reportActions = (report: any) => (
    <div className="space-x-2">
      <button onClick={() => setSelectedReport(report)} className="retro-button text-xs px-2 py-1">
        View Details
      </button>
      {!report.verified && <button className="retro-button text-xs px-2 py-1 bg-accent">Verify</button>}
    </div>
  )

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(",")
    const rows = data.map(row => Object.values(row).join(",")).join("\n")
    const csv = `${headers}\n${rows}`
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <RetroLayout title="Officials Dashboard - Real-time Ocean Hazard Monitoring">
      <div className="space-y-6">
        {/* Dashboard Statistics */}
        <div className="retro-form">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-mono mb-4">Dashboard Overview</h2>
            <Button 
              onClick={() => exportToCSV([...filteredReports, ...mockHotspots], "dashboard-data")}
              className="retro-button bg-accent hover:bg-accent/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <table className="retro-table">
              <tbody>
                <tr>
                  <td className="font-bold w-1/2">Total Reports Today</td>
                  <td className="text-accent font-bold">25</td>
                </tr>
                <tr>
                  <td className="font-bold">Verified Reports</td>
                  <td className="text-accent font-bold">18</td>
                </tr>
                <tr>
                  <td className="font-bold">Active Hotspots</td>
                  <td className="text-destructive font-bold">3</td>
                </tr>
              </tbody>
            </table>
            
            <table className="retro-table">
              <tbody>
                <tr>
                  <td className="font-bold w-1/2">Pending Reviews</td>
                  <td className="text-accent font-bold">7</td>
                </tr>
                <tr>
                  <td className="font-bold">Social Media Mentions</td>
                  <td className="text-accent font-bold">142</td>
                </tr>
                <tr>
                  <td className="font-bold">Last Update</td>
                  <td>{new Date().toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="retro-form">
          <h2 className="text-xl font-bold font-mono mb-4">Real-time Monitoring Charts</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Activity Timeline */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">24-Hour Activity Timeline</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dailyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="time" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reports" fill="#007BBF" name="Reports" />
                    <Bar dataKey="verifications" fill="#0099CC" name="Verifications" />
                    <Line type="monotone" dataKey="alerts" stroke="#00B8D4" strokeWidth={3} name="Alerts" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hazard Type Distribution */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">Hazard Type Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hazardTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {hazardTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Trends */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">Weekly Report Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="day" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#007BBF" name="Total Reports" />
                    <Bar dataKey="verified" fill="#0099CC" name="Verified" />
                    <Bar dataKey="pending" fill="#00B8D4" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* State Performance Metrics */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">State Performance Metrics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="state" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="response" stroke="#007BBF" strokeWidth={3} name="Response %" />
                    <Line type="monotone" dataKey="accuracy" stroke="#0099CC" strokeWidth={3} name="Accuracy %" />
                    <Line type="monotone" dataKey="coverage" stroke="#00B8D4" strokeWidth={3} name="Coverage %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Verification Timeline */}
            <div className="bg-background border-2 border-border p-4 lg:col-span-2">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">Real-time Verification Timeline</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={verificationTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="hour" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="verified" stackId="1" stroke="#0099CC" fill="#0099CC" fillOpacity={0.7} name="Verified" />
                    <Area type="monotone" dataKey="pending" stackId="1" stroke="#00B8D4" fill="#00B8D4" fillOpacity={0.7} name="Pending" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <DashboardFilters onFilterChange={handleFilterChange} />

        {/* Map Visualization */}
        <MapVisualization reports={filteredReports} hotspots={mockHotspots} />

        {/* Recent Reports */}
        <RetroTable
          title="Recent Hazard Reports"
          columns={reportColumns}
          data={filteredReports}
          actions={reportActions}
        />

        {/* Hotspots */}
        <RetroTable title="Dynamic Hotspots" columns={hotspotColumns} data={mockHotspots} />

        {/* Social Media Activity */}
        <SocialMediaActivity />

        {/* Report Details Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-background border-2 border-border p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold font-mono mb-4">Report Details</h3>
              <table className="retro-table mb-4">
                <tbody>
                  <tr>
                    <td className="font-bold w-1/3">Report ID</td>
                    <td>{selectedReport.id}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Timestamp</td>
                    <td>{selectedReport.timestamp}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Location</td>
                    <td>{selectedReport.location}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Hazard Type</td>
                    <td>{selectedReport.hazardType}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Urgency Level</td>
                    <td>{selectedReport.urgency}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Reporter</td>
                    <td>{selectedReport.reporter}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Status</td>
                    <td>{selectedReport.status}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Verification</td>
                    <td>{selectedReport.verified ? "VERIFIED" : "PENDING"}</td>
                  </tr>
                </tbody>
              </table>
              <div className="space-x-2">
                <button onClick={() => setSelectedReport(null)} className="retro-button">
                  Close
                </button>
                {!selectedReport.verified && (
                  <button className="retro-button bg-accent">Verify Report</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </RetroLayout>
  )
}
