"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const authHoc = <P extends object>(Component: React.ComponentType<P> ) => {
  return (props: P) => {
    const router = useRouter();
    const { accessToken, verifyAccessToken } = useAccessToken(); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);  // Add loading state

    useEffect(() => {
      // Check authentication only on client-side
      const checkAuth = async () => {
        if (!verifyAccessToken()) {
          router.replace("/login");
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };
      
      checkAuth();
    }, [accessToken, router]);

    // Show consistent loading state during authentication check
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default authHoc;
