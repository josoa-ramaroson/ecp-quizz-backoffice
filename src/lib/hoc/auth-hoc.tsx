// Modified authHoc.tsx
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
    const [isBrowser, setIsBrowser] = useState(false);

    // Check if we're in the browser
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    useEffect(() => {
      if (isBrowser) {
        const checkAuth = async () => {
          if (!verifyAccessToken()) {
            router.replace("/login");
          } else {
            setIsAuthenticated(true);
          }
          setIsLoading(false);
        };
  
        checkAuth();
      }
    }, [accessToken, router, verifyAccessToken, isBrowser]);

    // During SSR, just render nothing or a loading state
    if (!isBrowser) {
      return null; // or return a simple loading indicator
    }

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
  
  WrappedComponent.displayName = `WithAuth(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

export default authHoc;