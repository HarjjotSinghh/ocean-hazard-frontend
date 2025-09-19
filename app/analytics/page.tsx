"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { authClient } from "@/lib/auth-client"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { RetroLayout } from "@/components/retro-layout"
import { RetroTable } from "@/components/retro-table"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { GlobalStatistics } from "@/components/global-statistics"
import { SocialMediaInsights } from "@/components/social-media-insights"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Mock data for global analytics
const mockGlobalReports = [
  {
    id: "HR1703123456",
    timestamp: "2024-12-16 14:30:00",
    state: "Tamil Nadu",
    district: "Chennai",
    hazardType: "High Waves",
    urgency: "Medium",
    verified: true,
    socialMentions: 23,
  },
  {
    id: "HR1703123457",
    timestamp: "2024-12-16 13:15:00",
    state: "Kerala",
    district: "Thiruvananthapuram",
    hazardType: "Storm Surge",
    urgency: "High",
    verified: true,
    socialMentions: 45,
  },
  {
    id: "HR1703123458",
    timestamp: "2024-12-16 12:45:00",
    state: "Odisha",
    district: "Puri",
    hazardType: "Abnormal Sea Behavior",
    urgency: "Low",
    verified: false,
    socialMentions: 8,
  },
  {
    id: "HR1703123459",
    timestamp: "2024-12-16 11:20:00",
    state: "Gujarat",
    district: "Kutch",
    hazardType: "Coastal Currents",
    urgency: "Medium",
    verified: true,
    socialMentions: 12,
  },
  {
    id: "HR1703123460",
    timestamp: "2024-12-16 10:15:00",
    state: "West Bengal",
    district: "South 24 Parganas",
    hazardType: "High Waves",
    urgency: "High",
    verified: true,
    socialMentions: 34,
  },
]

const stateStatistics = [
  { state: "Tamil Nadu", totalReports: 156, verifiedReports: 134, highRiskEvents: 23 },
  { state: "Kerala", totalReports: 142, verifiedReports: 128, highRiskEvents: 19 },
  { state: "Odisha", totalReports: 98, verifiedReports: 87, highRiskEvents: 12 },
  { state: "Gujarat", totalReports: 89, verifiedReports: 76, highRiskEvents: 8 },
  { state: "West Bengal", totalReports: 67, verifiedReports: 59, highRiskEvents: 15 },
  { state: "Maharashtra", totalReports: 54, verifiedReports: 48, highRiskEvents: 6 },
  { state: "Karnataka", totalReports: 43, verifiedReports: 39, highRiskEvents: 4 },
  { state: "Andhra Pradesh", totalReports: 38, verifiedReports: 32, highRiskEvents: 7 },
]

const hazardTypeData = [
  { name: "High Waves", value: 45, color: "#007BBF" },
  { name: "Storm Surge", value: 32, color: "#0099CC" },
  { name: "Coastal Currents", value: 28, color: "#00B8D4" },
  { name: "Abnormal Behavior", value: 15, color: "#26C6DA" },
  { name: "Other", value: 12, color: "#80DEEA" },
]

const monthlyTrendData = [
  { month: "Jan", reports: 45, verified: 38, highRisk: 8 },
  { month: "Feb", reports: 52, verified: 44, highRisk: 12 },
  { month: "Mar", reports: 48, verified: 41, highRisk: 9 },
  { month: "Apr", reports: 61, verified: 52, highRisk: 15 },
  { month: "May", reports: 55, verified: 47, highRisk: 11 },
  { month: "Jun", reports: 67, verified: 58, highRisk: 18 },
  { month: "Jul", reports: 73, verified: 64, highRisk: 21 },
  { month: "Aug", reports: 69, verified: 59, highRisk: 19 },
  { month: "Sep", reports: 58, verified: 49, highRisk: 14 },
  { month: "Oct", reports: 64, verified: 54, highRisk: 16 },
  { month: "Nov", reports: 71, verified: 61, highRisk: 20 },
  { month: "Dec", reports: 78, verified: 67, highRisk: 23 },
]

const urgencyDistribution = [
  { name: "High", value: 35, color: "#007BBF" },
  { name: "Medium", value: 45, color: "#0099CC" },
  { name: "Low", value: 20, color: "#00B8D4" },
]

const verificationRateData = [
  { state: "TN", rate: 86, pending: 14 },
  { state: "KL", rate: 90, pending: 10 },
  { state: "OD", rate: 89, pending: 11 },
  { state: "GJ", rate: 85, pending: 15 },
  { state: "WB", rate: 88, pending: 12 },
  { state: "MH", rate: 89, pending: 11 },
]

export default function AnalyticsPage() {
  const router = useRouter()
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: sessionData } = await authClient.getSession()

        if (!sessionData) {
          router.push('/login')
          return
        }

        // Check if user has access to analytics
        if (!['ANALYST', 'GOVT_OFFICIAL'].includes(sessionData.user.role)) {
          router.push('/unauthorized')
          return
        }

        setSession(sessionData)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <RetroLayout title="Loading...">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </RetroLayout>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  const reportColumns = [
    { key: "id", label: "Report ID" },
    { key: "timestamp", label: "Date/Time" },
    { key: "state", label: "State" },
    { key: "district", label: "District" },
    { key: "hazardType", label: "Hazard Type" },
    {
      key: "urgency",
      label: "Urgency",
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
    {
      key: "verified",
      label: "Verified",
      render: (value: boolean) => (
        <span className={value ? "text-accent font-bold" : "text-muted-foreground"}>{value ? "YES" : "NO"}</span>
      ),
    },
    { key: "socialMentions", label: "Social Mentions" },
  ]

  const stateColumns = [
    { key: "state", label: "State/UT" },
    { key: "totalReports", label: "Total Reports" },
    { key: "verifiedReports", label: "Verified" },
    { key: "highRiskEvents", label: "High Risk Events" },
    {
      key: "verificationRate",
      label: "Verification Rate",
      render: (_: any, row: any) => {
        const rate = Math.round((row.verifiedReports / row.totalReports) * 100)
        return <span className="font-bold">{rate}%</span>
      },
    },
  ]

  const reportActions = (report: any) => (
    <button onClick={() => setSelectedReport(report)} className="retro-button text-xs px-2 py-1">
      Analyze
    </button>
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
    <RetroLayout title="Global Analytics Dashboard - Ocean Hazard Intelligence">
      <div className="space-y-6">
        {/* Time Range Selector */}
        <div className="retro-form">
          <h2 className="text-xl font-bold font-mono mb-4">Analysis Time Range</h2>
          <div className="flex gap-2">
            {["1h", "6h", "24h", "7d", "30d"].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`retro-button ${selectedTimeRange === range ? "bg-accent" : ""}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Global Statistics */}
        <GlobalStatistics timeRange={selectedTimeRange} />

        <div className="retro-form">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-mono">Visual Analytics</h2>
            <Button 
              onClick={() => exportToCSV([...mockGlobalReports, ...stateStatistics], "analytics-data")}
              className="retro-button bg-accent hover:bg-accent/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hazard Type Distribution - Pie Chart */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">Hazard Type Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hazardTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {hazardTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trends - Line Chart */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">Monthly Report Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="month" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="reports" stroke="#FF6B6B" strokeWidth={3} name="Total Reports" />
                    <Line type="monotone" dataKey="verified" stroke="#4ECDC4" strokeWidth={3} name="Verified" />
                    <Line type="monotone" dataKey="highRisk" stroke="#FFA502" strokeWidth={3} name="High Risk" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Urgency Distribution - Bar Chart */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">Urgency Level Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={urgencyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="name" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {urgencyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Verification Rates - Area Chart */}
            <div className="bg-background border-2 border-border p-4">
              <h3 className="text-lg font-bold font-mono mb-4 text-center">State Verification Rates</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={verificationRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="state" stroke="#333" />
                    <YAxis stroke="#333" />
                    <Tooltip />
                    <Area type="monotone" dataKey="rate" stroke="#2ED573" fill="#2ED573" fillOpacity={0.6} name="Verified %" />
                    <Area type="monotone" dataKey="pending" stroke="#FFA502" fill="#FFA502" fillOpacity={0.6} name="Pending %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts (Legacy) */}
        <AnalyticsCharts data={mockGlobalReports} timeRange={selectedTimeRange} />

        {/* State-wise Statistics */}
        <RetroTable title="State-wise Report Statistics" columns={stateColumns} data={stateStatistics} />

        {/* Recent Global Reports */}
        <RetroTable
          title="Recent Global Reports (All States)"
          columns={reportColumns}
          data={mockGlobalReports}
          actions={reportActions}
        />

        {/* Social Media Insights */}
        <SocialMediaInsights />

        {/* Report Analysis Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-background border-2 border-border p-6 max-w-4xl w-full max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold font-mono mb-4">Detailed Report Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <table className="retro-table mb-4">
                    <tbody>
                      <tr>
                        <td className="font-bold w-1/2">Report ID</td>
                        <td>{selectedReport.id}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Location</td>
                        <td>
                          {selectedReport.district}, {selectedReport.state}
                        </td>
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
                        <td className="font-bold">Verification Status</td>
                        <td>{selectedReport.verified ? "VERIFIED" : "PENDING"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-bold font-mono mb-2">Social Media Impact</h4>
                  <p className="mb-2">Mentions: {selectedReport.socialMentions}</p>
                  <h4 className="font-bold font-mono mb-2 mt-4">Risk Assessment</h4>
                  <p className="text-sm">Based on current data and historical patterns, this report indicates {selectedReport.verified ? "verified" : "potential"} ocean hazard activity.</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReport(null)} 
                className="retro-button mt-4"
              >
                Close Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </RetroLayout>
  )
}
