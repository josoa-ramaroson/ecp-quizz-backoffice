"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
const authHoc = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const { accessToken, verifyAccessToken } = useAccessToken();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        if (!verifyAccessToken()) {
          router.replace("/login");
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };

      checkAuth();
    }, [accessToken, router, verifyAccessToken]); // ✅ Include verifyAccessToken

    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    return isAuthenticated ? <Component {...props} /> : null;
  };

  WrappedComponent.displayName = `AuthHOC(${Component.displayName || Component.name || "Component"})`; // ✅ Fix display name

  return WrappedComponent;
};

export default authHoc;
