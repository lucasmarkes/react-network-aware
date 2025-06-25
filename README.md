# React Network Aware

React hooks to detect network status and quality in your app.
Ideal for PWAs, global apps, and any app needing to adapt to changing network conditions.

---

## Installation

Install via npm:

```bash
npm install react-network-aware
```

---

## Hooks

### `useNetworkStatus`

Returns the current network status:

```tsx
const { online, effectiveType, downlink, saveData, rtt } = useNetworkStatus();
```

- **online**: `boolean` — online/offline status
- **effectiveType**: `string | undefined` — e.g. `'2g'`, `'3g'`, `'4g'`, `'wifi'`
- **downlink**: `number | undefined` — estimated Mbps
- **saveData**: `boolean | undefined` — if user enabled data saver mode
- **rtt**: `number | undefined` — round-trip time in milliseconds

---

### `useSlowConnection`

Detects if the connection is considered slow:

```tsx
const isSlow = useSlowConnection({ downlinkThreshold: 1, rttThreshold: 300 });
```

- **downlinkThreshold** (default `1`) — Mbps threshold below which connection is slow
- **rttThreshold** (default `300`) — RTT in ms above which connection is slow

Returns `true` if connection is slow, `false` otherwise.

---

### `useNetworkAwareEffect`

Runs an effect only when the network status matches the specified condition (online or offline):

```tsx
useNetworkAwareEffect(
  () => {
    // effect code here
  },
  [/* dependencies */],
  true // run effect only when online (default)
);
```

## Example Usage

```tsx
import React from 'react';
import { useNetworkStatus, useSlowConnection, useNetworkAwareEffect } from 'react-network-aware';

export function MyComponent() {
  const { online } = useNetworkStatus();
  const isSlow = useSlowConnection();

  useNetworkAwareEffect(() => {
    // Fetch data only when online
    fetch('/api/data')
      .then(res => res.json())
      .then(data => console.log(data));
  }, [], true);

  if (!online) {
    return <p>You are offline</p>;
  }

  if (isSlow) {
    return <p>Slow connection detected. Showing lightweight version.</p>;
  }

  return <p>Connection is good</p>;
}
```
---

## Contributing

Feel free to open issues or submit pull requests!

---

## License

MIT
