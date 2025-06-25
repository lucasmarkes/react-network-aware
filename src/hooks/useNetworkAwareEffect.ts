import { useEffect } from 'react';
import { useNetworkStatus } from './useNetworkStatus';

type EffectCallback = () => void | (() => void);

export function useNetworkAwareEffect(
  effect: EffectCallback,
  deps: unknown[] = [],
  onlyWhenOnline: boolean = true
) {
  const { online } = useNetworkStatus();

  useEffect(() => {
    if ((onlyWhenOnline && online) || (!onlyWhenOnline && !online)) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online, onlyWhenOnline, ...deps]);
}
