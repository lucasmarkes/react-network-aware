import { useEffect } from 'react';
import { useNetworkStatus } from './useNetworkStatus';

type EffectCallback = () => void | (() => void);

export function useNetworkAwareEffect(
  effect: EffectCallback,
  deps: any[] = [],
  onlyWhenOnline: boolean = true
) {
  const { online } = useNetworkStatus();

  useEffect(() => {
    if ((onlyWhenOnline && online) || (!onlyWhenOnline && !online)) {
      return effect();
    }

  }, [online, ...deps]);
}
