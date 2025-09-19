import { createAuthClient } from "better-auth/react"
import { adminClient, organizationClient, twoFactorClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    organizationClient(),
    twoFactorClient(),
    adminClient()
  ]
})