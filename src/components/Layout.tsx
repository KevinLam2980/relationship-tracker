import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PieChart, Calendar, Heart, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-blue-600">
                My Relationship Tracker
              </Link>
            </div>
            <nav className="ml-6 flex space-x-4">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <PieChart className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/cycle-tracking"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/cycle-tracking' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Cycle Tracking
              </Link>
              <Link
                to="/add-events"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/add-events' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add Events
              </Link>
              <Link
                to="/profile"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/profile' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="mr-2 h-5 w-5" />
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} My Relationship Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;