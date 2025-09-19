"use client";

import { RetroLayout } from "@/components/retro-layout";
import { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/lib/actions/auth";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <RetroLayout title="Ocean Hazard User Reporting - Login">
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-incois-blue mb-2">Ocean Hazard User Reporting</h1>
            <p className="text-incois-gray">Login to access the reporting system</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Login Form */}
          <div className="retro-form">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-incois-blue mb-2">User Login</h2>
              <div className="flex justify-center space-x-4 mb-4">
                <button className="retro-button">Login</button>
                <Link href="/signup" className="retro-button secondary">Signup</Link>
                <Link href="/report" className="retro-button secondary">Report</Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-incois-blue mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="retro-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-incois-blue mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="retro-input"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-incois-blue focus:ring-incois-blue border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-incois-gray">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-incois-blue hover:text-incois-light-blue">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="retro-button w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-incois-gray">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-incois-blue hover:text-incois-light-blue">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center text-xs text-incois-gray">
            <p>This system is for authorized users only.</p>
            <p className="mt-1">
              For technical support, contact{" "}
              <Link href="/contact" className="text-incois-blue hover:text-incois-light-blue">
                INCOIS Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}