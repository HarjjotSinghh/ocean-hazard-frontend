import { RetroLayout } from "@/components/retro-layout"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <RetroLayout title="Unauthorized Access">
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="retro-form text-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
            <div className="space-y-4">
              <Link href="/" className="retro-button w-full inline-block text-center">
                Return to Home
              </Link>
              <Link href="/login" className="retro-button secondary w-full inline-block text-center">
                Login with Different Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RetroLayout>
  )
}