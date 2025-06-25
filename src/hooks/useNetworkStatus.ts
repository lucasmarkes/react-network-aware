import { useEffect, useState } from 'react';

type NetworkStatus = {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
  rtt?: number;
};

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    online: navigator.onLine,
    effectiveType: (navigator as any).connection?.effectiveType,
    downlink: (navigator as any).connection?.downlink,
    saveData: (navigator as any).connection?.saveData,
    rtt: (navigator as any).connection?.rtt,
  });

  useEffect(() => {
    const update = () => {
      setStatus({
        online: navigator.onLine,
        effectiveType: (navigator as any).connection?.effectiveType,
        downlink: (navigator as any).connection?.downlink,
        saveData: (navigator as any).connection?.saveData,
        rtt: (navigator as any).connection?.rtt,
      });
    };

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    (navigator as any).connection?.addEventListener('change', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      (navigator as any).connection?.removeEventListener('change', update);
    };
  }, []);

  return status;
}
