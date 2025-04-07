
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Brain, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Prediction', path: '/prediction' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-primary">NeuroDetect</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full",
                  location.pathname === item.path
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {!loading && (
              user ? (
                <Link
                  to="/profile"
                  className={cn(
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full",
                    location.pathname === "/profile"
                      ? "border-primary text-primary font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>{getInitials(user.user_metadata?.full_name || user.email || 'U')}</AvatarFallback>
                  </Avatar>
                  Profile
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" className="ml-4">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="flex justify-around pt-2 pb-3 space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex-1 text-center py-2 px-3 text-sm font-medium rounded-md",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {!loading && (
            <Link
              to={user ? "/profile" : "/auth"}
              className={cn(
                "flex-1 text-center py-2 px-3 text-sm font-medium rounded-md",
                location.pathname === (user ? "/profile" : "/auth")
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {user ? "Profile" : "Sign In"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
