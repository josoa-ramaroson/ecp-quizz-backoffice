"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import dynamic from "next/dynamic";

const AuthWrapper = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const { verifyAccessToken, accessToken } = useAccessToken();
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
    }, [router, accessToken]);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };

  WrappedComponent.displayName = `WithAuth(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};

// Dynamically wrap the auth HOC to ensure it's client-side only
const authHoc = <P extends object>(Component: React.ComponentType<P>) =>
  dynamic(() => Promise.resolve(AuthWrapper(Component)), { ssr: false });

export default authHoc;
