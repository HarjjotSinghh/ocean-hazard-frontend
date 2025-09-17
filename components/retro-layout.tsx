import Link from "next/link";
import type React from "react";

interface RetroLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function RetroLayout({
  children,
  title = "Ocean Hazard Reporting Platform",
}: RetroLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Government Bar */}
      <div className="bg-gray-800 text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>Wed Sep 17 2025 23:47:42 IST</span>
          <span>Wed, 17 Sep 2025 18:17:42 UTC</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hover:text-blue-300">About Us</Link>
          <Link href="/admin" className="hover:text-blue-300">Admin Login</Link>
          <Link href="/login" className="hover:text-blue-300">User Login</Link>
          <select className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
            <option>English</option>
            <option>हिंदी</option>
          </select>
        </div>
      </div>

      {/* Main Header */}
      <div className="retro-header">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* INCOIS Logo placeholder */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">Indian Tsunami Early Warning System</h1>
                <p className="text-sm text-blue-100 mt-1">Ministry of Earth Sciences - Government of India</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* INCOIS Logo */}
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">INCOIS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="retro-nav">
        <div className="max-w-7xl mx-auto flex">
          <Link href="/" className="retro-nav-item">Home</Link>
          <Link href="/dashboard" className="retro-nav-item">Real-Time Data Monitoring</Link>
          <Link href="/report" className="retro-nav-item">Tsunami Events</Link>
          <Link href="/analytics" className="retro-nav-item">Storm Surge</Link>
          <Link href="/guidelines" className="retro-nav-item">About Tsunami</Link>
          <Link href="/contact" className="retro-nav-item">Tsunami Knowledge Bank</Link>
          <div className="ml-auto flex">
            <Link href="/login" className="retro-nav-item">IOTWMS Service</Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="incois-breadcrumb">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono">
            Home / Real-Time Data Monitoring / Search Catalogue
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">{children}</div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow us</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-xs">y</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quicklinks</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-blue-300">SAC/ISRO Feeds</Link></li>
                <li><Link href="#" className="hover:text-blue-300">About Us</Link></li>
                <li><Link href="#" className="hover:text-blue-300">Photo Gallery</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="text-sm space-y-1">
                <p>Indian National Center for Ocean Information Services(INCOIS)</p>
                <p>"Ocean Valley", Pragathi nagar(BO),</p>
                <p>Nizampet(SO) Hyderabad-500090,</p>
                <p>Telangana.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            <p>Copyright Reserved INCOIS©2018</p>
            <div className="mt-2 flex justify-center items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-xs">🔒</span>
              </div>
              <span>secure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
