"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface RetroLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function RetroLayout({
  children,
  title = "Ocean Hazard Reporting Platform",
}: RetroLayoutProps) {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

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
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setSession(null);
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Top Government Bar */}
      <div className="bg-gray-800 text-white text-xs py-1 px-2 sm:px-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Left side - Time info (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <span>Wed Sep 17 2025 23:47:42 IST</span>
            <span className="hidden lg:inline">Wed, 17 Sep 2025 18:17:42 UTC</span>
          </div>
          
          {/* Mobile: Show only essential info */}
          <div className="md:hidden">
            <span className="text-blue-300">INCOIS Portal</span>
          </div>
          
          {/* Right side - Navigation and auth */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/about" className="hidden sm:inline hover:text-blue-300">About Us</Link>
            {!isLoading && (
              <>
                {session ? (
                  // Authenticated user buttons
                  <>
                    <span className="hidden sm:inline text-blue-300 truncate max-w-32">
                      Welcome, {session.user?.name || session.user?.email}
                    </span>
                    <Link href="/dashboard" className="hover:text-blue-300 text-xs sm:text-xs">Dashboard</Link>
                    <button 
                      onClick={handleSignOut}
                      className="hover:text-blue-300 cursor-pointer text-xs sm:text-xs"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  // Public user buttons
                  <>
                    <Link href="/login" className="hover:text-blue-300 text-xs sm:text-xs">Login</Link>
                    <Link href="/signup" className="hover:text-blue-300 text-xs sm:text-xs">Register</Link>
                  </>
                )}
              </>
            )}
            <select className="bg-gray-700 text-white text-xs px-1 sm:px-2 py-1 rounded">
              <option>EN</option>
              <option>हिं</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="retro-header">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* INCOIS Logo placeholder */}
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 sm:w-12 sm:h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                  <span className="sm:hidden">ITEWS</span>
                  <span className="hidden sm:inline lg:hidden">Indian Tsunami Early Warning System</span>
                  <span className="hidden lg:inline">Indian Tsunami Early Warning System</span>
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 hidden sm:block">Ministry of Earth Sciences - Government of India</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 hidden md:flex">
            {/* INCOIS Logo */}
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-xs lg:text-sm">INCOIS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="retro-nav">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <Link href="/" className="retro-nav-item">Home</Link>
            {session && (
              <>
                <Link href="/dashboard" className="retro-nav-item">Real-Time Data Monitoring</Link>
                <Link href="/report" className="retro-nav-item">Tsunami Events</Link>
                {(session.user?.role === 'ANALYST' || session.user?.role === 'GOVT_OFFICIAL') && (
                  <Link href="/analytics" className="retro-nav-item">Storm Surge</Link>
                )}
              </>
            )}
            <Link href="/guidelines" className="retro-nav-item">About Tsunami</Link>
            <Link href="/contact" className="retro-nav-item">Tsunami Knowledge Bank</Link>
            <div className="ml-auto flex">
              {session ? (
                // Authenticated user actions
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-100">
                    {session.user?.role === 'GOVT_OFFICIAL' ? 'Government Official' : 
                     session.user?.role === 'ANALYST' ? 'Analyst' : 'User'}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="retro-nav-item bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                // Public user actions
                <div className="flex">
                  <Link href="/login" className="retro-nav-item bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2">Login</Link>
                  <Link href="/signup" className="retro-nav-item bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Register</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <div className="flex justify-between items-center py-2">
              <div className="flex space-x-2">
                <Link href="/" className="retro-nav-item text-sm">Home</Link>
                {session && (
                  <Link href="/dashboard" className="retro-nav-item text-sm">Dashboard</Link>
                )}
              </div>
              
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="border-t border-blue-700 py-2 space-y-1">
                {session && (
                  <>
                    <Link 
                      href="/dashboard" 
                      className="block retro-nav-item text-sm py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Real-Time Data Monitoring
                    </Link>
                    <Link 
                      href="/report" 
                      className="block retro-nav-item text-sm py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Tsunami Events
                    </Link>
                    {(session.user?.role === 'ANALYST' || session.user?.role === 'GOVT_OFFICIAL') && (
                      <Link 
                        href="/analytics" 
                        className="block retro-nav-item text-sm py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Storm Surge
                      </Link>
                    )}
                  </>
                )}
                <Link 
                  href="/guidelines" 
                  className="block retro-nav-item text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Tsunami
                </Link>
                <Link 
                  href="/contact" 
                  className="block retro-nav-item text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tsunami Knowledge Bank
                </Link>
                
                {/* Mobile Auth Actions */}
                <div className="border-t border-blue-700 pt-2 mt-2">
                  {session ? (
                    <div className="space-y-2">
                      <div className="text-sm text-blue-100 px-2">
                        {session.user?.role === 'GOVT_OFFICIAL' ? 'Government Official' : 
                         session.user?.role === 'ANALYST' ? 'Analyst' : 'User'}
                      </div>
                      <button 
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left retro-nav-item bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link 
                        href="/login" 
                        className="block retro-nav-item bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        href="/signup" 
                        className="block retro-nav-item bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="incois-breadcrumb">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <span className="font-mono text-xs sm:text-sm">
            <span className="hidden sm:inline">Home / Real-Time Data Monitoring / Search Catalogue</span>
            <span className="sm:hidden">Home / Dashboard</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-2 sm:p-4 lg:p-6">{children}</div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto py-6 sm:py-8 px-2 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Follow Us */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow us</h3>
              <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors">
                  <span className="text-xs font-bold">y</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quicklinks</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li><Link href="#" className="hover:text-blue-300 transition-colors">SAC/ISRO Feeds</Link></li>
                <li><Link href="#" className="hover:text-blue-300 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-blue-300 transition-colors">Photo Gallery</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
              <div className="text-xs sm:text-sm space-y-1 leading-relaxed">
                <p>Indian National Center for Ocean Information Services (INCOIS)</p>
                <p className="hidden sm:block">"Ocean Valley", Pragathi nagar(BO),</p>
                <p className="hidden sm:block">Nizampet(SO) Hyderabad-500090,</p>
                <p className="hidden sm:block">Telangana.</p>
                <p className="sm:hidden">Hyderabad, Telangana</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-xs sm:text-sm">
            <p>Copyright Reserved INCOIS©2018</p>
            <div className="mt-2 flex justify-center items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-xs">🔒</span>
              </div>
              <span className="text-xs sm:text-sm">secure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
