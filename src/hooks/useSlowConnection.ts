import { useNetworkStatus } from './useNetworkStatus';

type Options = {
  downlinkThreshold?: number;
  rttThreshold?: number;
};

export function useSlowConnection(options: Options = {}) {
  const { downlinkThreshold = 1, rttThreshold = 300 } = options;
  const { effectiveType, downlink, rtt } = useNetworkStatus();

  const slowEffectiveTypes = ['2g', '3g'];

  const isSlowEffectiveType = effectiveType ? slowEffectiveTypes.includes(effectiveType) : false;
  const isSlowDownlink = downlink !== undefined ? downlink < downlinkThreshold : false;
  const isSlowRtt = rtt !== undefined ? rtt > rttThreshold : false;

  return isSlowEffectiveType || isSlowDownlink || isSlowRtt;
}
