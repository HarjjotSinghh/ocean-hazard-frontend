"use client";

import { RetroLayout } from "@/components/retro-layout";
import { QuickStats } from "@/components/quick-stats";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: sessionData } = await authClient.getSession();
        setSession(sessionData);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state
  if (isLoading) {
    return (
      <RetroLayout>
        <div className="retro-form">
          <h2 className="text-xl font-bold font-mono mb-4">Loading...</h2>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-600">
              Please wait while we load your session...
            </p>
          </div>
        </div>
      </RetroLayout>
    );
  }

  // Show public landing page for non-authenticated users
  if (!session) {
    return (
      <RetroLayout>
        {/* Hero Carousel Section */}
        <div className="mb-8">
          <Carousel className="w-full max-w-7xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                      Indian Tsunami Early Warning System
                    </h1>
                    <p className="text-xl mb-6">
                      Real-time Ocean Hazard Monitoring & Alert System
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="/login"
                        className="retro-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                      >
                        Login to Access System
                      </a>
                      <a
                        href="/signup"
                        className="retro-button bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                      >
                        Register New Account
                      </a>
                    </div>
                    <div className="mt-4">
                      <a
                        href="/guidelines"
                        className="text-blue-200 hover:text-white underline text-sm"
                      >
                        Learn about Ocean Hazards →
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-96 bg-gradient-to-r from-green-800 to-blue-800 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                      Storm Surge Monitoring
                    </h1>
                    <p className="text-xl mb-6">
                      Advanced Coastal Protection & Early Warning
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="/login"
                        className="retro-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                      >
                        Access Dashboard
                      </a>
                      <a
                        href="/signup"
                        className="retro-button bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                      >
                        Join Our Network
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-96 bg-gradient-to-r from-indigo-900 to-purple-800 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                      Ocean Information Services
                    </h1>
                    <p className="text-xl mb-6">
                      Comprehensive Marine Data & Analytics
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="/login"
                        className="retro-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                      >
                        Login for Analytics
                      </a>
                      <a
                        href="/signup"
                        className="retro-button bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                      >
                        Get Access Today
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - System Information */}
          <div className="lg:col-span-2">
            <div className="retro-form mb-6">
              <h2 className="text-xl font-bold mb-4 text-incois-blue border-b-2 border-government-orange pb-2">
                Ocean Hazard Reporting Platform
              </h2>

              <table className="retro-table mb-6">
                <thead>
                  <tr>
                    <th colSpan={2}>System Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">Organization</td>
                    <td>
                      Indian National Centre for Ocean Information Services
                      (INCOIS)
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold">Ministry</td>
                    <td>Ministry of Earth Sciences, Government of India</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Purpose</td>
                    <td>
                      Crowdsourced Ocean Hazard Reporting and Social Media
                      Analytics
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold">Last Updated</td>
                    <td>{new Date().toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-incois-blue border-b border-gray-300 pb-2">
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-gray-200 bg-gray-50">
                    <h4 className="font-bold text-incois-blue mb-2">
                      Citizens & Volunteers
                    </h4>
                    <a
                      href="/report"
                      className="retro-button inline-block w-full"
                    >
                      Submit Hazard Report
                    </a>
                  </div>
                  <div className="text-center p-4 border border-gray-200 bg-gray-50">
                    <h4 className="font-bold text-incois-blue mb-2">
                      Government Officials
                    </h4>
                    <a
                      href="/dashboard"
                      className="retro-button inline-block w-full"
                    >
                      Officials Dashboard
                    </a>
                  </div>
                  <div className="text-center p-4 border border-gray-200 bg-gray-50">
                    <h4 className="font-bold text-incois-blue mb-2">
                      Data Analysts
                    </h4>
                    <a
                      href="/analytics"
                      className="retro-button inline-block w-full"
                    >
                      Global Analytics
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="lg:col-span-1">
            <QuickStats />
          </div>
        </div>

        {/* Ocean Hazard Categories Section */}
        <div className="retro-form mb-6">
          <h3 className="text-lg font-bold mb-4 text-incois-blue border-b-2 border-government-orange pb-2">
            Ocean Hazard Categories
          </h3>
          <table className="retro-table">
            <thead>
              <tr>
                <th>Hazard Type</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold text-incois-blue">Tsunami</td>
                <td>
                  Large ocean waves caused by underwater earthquakes or
                  landslides
                </td>
                <td>
                  <a
                    href="/report?type=tsunami"
                    className="text-government-orange hover:underline"
                  >
                    Report
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold text-incois-blue">Storm Surge</td>
                <td>Abnormal rise in sea level during storms</td>
                <td>
                  <a
                    href="/report?type=storm-surge"
                    className="text-government-orange hover:underline"
                  >
                    Report
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold text-incois-blue">High Waves</td>
                <td>Unusually large waves that can damage coastal areas</td>
                <td>
                  <a
                    href="/report?type=high-waves"
                    className="text-government-orange hover:underline"
                  >
                    Report
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold text-incois-blue">Swell Surge</td>
                <td>Long-period waves that travel across ocean basins</td>
                <td>
                  <a
                    href="/report?type=swell-surge"
                    className="text-government-orange hover:underline"
                  >
                    Report
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold text-incois-blue">Coastal Currents</td>
                <td>Strong water currents along the coastline</td>
                <td>
                  <a
                    href="/report?type=coastal-currents"
                    className="text-government-orange hover:underline"
                  >
                    Report
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold text-incois-blue">
                  Abnormal Sea Behavior
                </td>
                <td>Unusual tidal patterns or sea level changes</td>
                <td>
                  <a
                    href="/report?type=abnormal-sea"
                    className="text-government-orange hover:underline"
                  >
                    Report
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </RetroLayout>
    );
  }

  // Show user-specific home page for authenticated users
  return (
    <RetroLayout>
      <div className="retro-form">
        <h2 className="text-xl font-bold font-mono mb-4">
          Welcome, {session.user.name}!
        </h2>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800">
            You are logged in as a <strong>{session.user.role}</strong>.
            {session.user.role === "USER" &&
              " You can submit hazard reports and view public information."}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-2">Your Dashboard</h3>
          <table className="retro-table">
            <tbody>
              <tr>
                <td className="font-bold w-1/3">Submit New Report</td>
                <td>
                  <a href="/report" className="retro-button inline-block">
                    Report Ocean Hazard
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold">Your Profile</td>
                <td>
                  <a
                    href="/profile"
                    className="retro-button secondary inline-block"
                  >
                    View Profile
                  </a>
                </td>
              </tr>
              <tr>
                <td className="font-bold">View Guidelines</td>
                <td>
                  <a
                    href="/guidelines"
                    className="retro-button secondary inline-block"
                  >
                    Read Guidelines
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-2">Recent Activity</h3>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-600">No recent activity to display.</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-2">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/report" className="retro-button text-center">
              📊 Submit Report
            </a>
            <a
              href="/guidelines"
              className="retro-button secondary text-center"
            >
              📋 View Guidelines
            </a>
          </div>
        </div>
      </div>

      <QuickStats />
    </RetroLayout>
  );
}
