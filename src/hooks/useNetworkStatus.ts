import { useEffect, useState } from 'react';

type NetworkInformation = {
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
  rtt?: number;
  addEventListener?: (type: 'change', listener: () => void) => void;
  removeEventListener?: (type: 'change', listener: () => void) => void;
};

type NetworkStatus = {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
  rtt?: number;
};

export function useNetworkStatus(): NetworkStatus {
  const connection = (navigator as any).connection as NetworkInformation | undefined;

  const [status, setStatus] = useState<NetworkStatus>({
    online: navigator.onLine,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    saveData: connection?.saveData,
    rtt: connection?.rtt,
  });

  useEffect(() => {
    const update = () => {
      setStatus({
        online: navigator.onLine,
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        saveData: connection?.saveData,
        rtt: connection?.rtt,
      });
    };

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    connection?.addEventListener?.('change', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      connection?.removeEventListener?.('change', update);
    };
  }, [connection]);

  return status;
}
