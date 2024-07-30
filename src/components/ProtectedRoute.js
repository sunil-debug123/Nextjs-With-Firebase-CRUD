
import { useEffect } from 'react';
import Loader from './Loader';
import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  {console.log({authUser})}
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, isLoading]);

  if (isLoading || !authUser) {
    return <div><Loader /></div>;
  }

  return children;
};

export default ProtectedRoute;
