'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loader from './Loader';
import { useAuth } from '@/firebase/auth';

const ProtectedRoute = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const { authUser, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [redirecting, setRedirecting] = useState(true); // State to handle redirection

    useEffect(() => {
      // Handle redirection based on auth status
      if (!isLoading) {
        if (authUser && (pathname === '/login' || pathname === '/signup')) {
          router.push('/dashboard'); // Redirect to the dashboard
        } else if (!authUser && pathname !== '/login' && pathname !== '/signup') {
          router.push('/login'); // Redirect to login
        } else {
          setRedirecting(false); // Stop redirecting if conditions are met
        }
      }
    }, [authUser, isLoading, pathname, router]);

    if (redirecting) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  ProtectedComponent.displayName = `ProtectedRoute(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ProtectedComponent;
};

export default ProtectedRoute;
