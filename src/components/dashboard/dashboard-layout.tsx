"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  Home, 
  Lightbulb, 
  BarChart3, 
  Settings, 
  Image, 
  Menu, 
  X, 
  User, 
  LogOut,
  ChevronRight
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/dashboard/insights',
    label: 'Insights Management',
    icon: Lightbulb,
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    href: '/dashboard/media',
    label: 'Media Library',
    icon: Image,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    breadcrumbs.push({ label: 'Dashboard', href: '/dashboard' });
    
    if (segments.length > 1) {
      const currentSegment = segments[segments.length - 1];
      const navItem = navigationItems.find(item => 
        item.href.includes(currentSegment)
      );
      
      if (navItem) {
        breadcrumbs.push({ label: navItem.label, href: pathname });
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-black border-r border-white/10
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand Area */}
          <div className="flex h-16 items-center px-6 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-sm font-bold text-black">L</span>
              </div>
              <span className="text-lg font-medium text-white">
                Live & Learn
              </span>
            </Link>
            
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1" role="navigation">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200 group
                    ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <User className="h-4 w-4 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            
            <button
              className="
                w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium
                text-white/70 hover:text-white hover:bg-white/5
                transition-all duration-200
              "
              onClick={() => {
                logout();
                router.push('/');
              }}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-black border-b border-white/10">
          <div className="flex h-16 items-center justify-between px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Open sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  {index > 0 && (
                    <ChevronRight className="h-3 w-3 text-white/30" />
                  )}
                  <Link
                    href={crumb.href}
                    className={`
                      transition-all duration-200
                      ${
                        index === breadcrumbs.length - 1
                          ? 'text-white font-medium'
                          : 'text-white/60 hover:text-white'
                      }
                    `}
                  >
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            {/* Header actions */}
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <User className="h-4 w-4 text-white/70" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6 bg-black">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-sm text-white/50">
                © 2024 Live & Learn Hub. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-white/50">
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Terms
                </Link>
                <Link href="/support" className="hover:text-white transition-colors duration-200">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;