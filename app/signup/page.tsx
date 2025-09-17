"use client";

import { RetroLayout } from "@/components/retro-layout";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <RetroLayout title="Ocean Hazard User Reporting - Registration">
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-incois-blue mb-2">Ocean Hazard User Reporting</h1>
            <p className="text-incois-gray">Register for access to the reporting system</p>
          </div>

          {/* Registration Form */}
          <div className="retro-form">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-incois-blue mb-2">User Registration</h2>
              <div className="flex justify-center space-x-4 mb-4">
                <Link href="/login" className="retro-button secondary">Login</Link>
                <button className="retro-button">Signup</button>
                <Link href="/report" className="retro-button secondary">Report</Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-incois-blue mb-2">
                    First Name: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="retro-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-incois-blue mb-2">
                    Last Name: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="retro-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-incois-blue mb-2">
                  Email Address: <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="retro-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-incois-blue mb-2">
                  Phone Number: <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="retro-input"
                  required
                />
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-incois-blue mb-2">
                    Organization: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Enter your organization"
                    className="retro-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-incois-blue mb-2">
                    Designation: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Enter your designation"
                    className="retro-input"
                    required
                  />
                </div>
              </div>

              {/* Password Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-incois-blue mb-2">
                    Password: <span className="text-red-500">*</span>
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-incois-blue mb-2">
                    Confirm Password: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="retro-input"
                    required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-incois-blue focus:ring-incois-blue border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-incois-gray">
                  I agree to the{" "}
                  <Link href="/terms" className="font-medium text-incois-blue hover:text-incois-light-blue">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-medium text-incois-blue hover:text-incois-light-blue">
                    Privacy Policy
                  </Link>
                  <span className="text-red-500"> *</span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="retro-button w-full"
                  disabled={!formData.agreeToTerms}
                >
                  Register Account
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-incois-gray">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-incois-blue hover:text-incois-light-blue">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center text-xs text-incois-gray">
            <p>Registration is required for authorized access to the Ocean Hazard Reporting System.</p>
            <p className="mt-1">
              For assistance with registration, contact{" "}
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