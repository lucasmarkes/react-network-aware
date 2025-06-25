# React Network Aware



**React Network Aware** is a lightweight React utility library that provides hooks to detect and respond to network status and connection quality.\
It’s ideal for building **PWAs**, **global applications**, and any app that needs to adapt to changing network conditions, such as slow connections or offline mode.

---

## 🚀 Features

✅ Detect online / offline status\
✅ Get connection quality details (downlink, RTT, data saver)\
✅ Identify slow connections with customizable thresholds\
✅ Run effects conditionally based on network status\
✅ Zero dependencies, tiny bundle size

---

## 📦 Installation

Install via npm:

```bash
npm install react-network-aware
```

Or with yarn:

```bash
yarn add react-network-aware
```

---

## 🧠 Hooks API

---

### `useNetworkStatus`

Get detailed network information.

#### Usage

```tsx
const { online, effectiveType, downlink, saveData, rtt } = useNetworkStatus();
```

#### Returned values

| Name            | Type                   | Description                                            |
| --------------- | ---------------------- | ------------------------------------------------------ |
| `online`        | `boolean`              | `true` if online, `false` if offline                   |
| `effectiveType` | `string \| undefined`  | Connection type: `'2g'`, `'3g'`, `'4g'`, `'wifi'`, etc |
| `downlink`      | `number \| undefined`  | Estimated downlink in Mbps                             |
| `saveData`      | `boolean \| undefined` | If user enabled data saver mode                        |
| `rtt`           | `number \| undefined`  | Estimated round-trip time in ms                        |

---

### `useSlowConnection`

Detect if the connection should be considered slow based on thresholds.

#### Usage

```tsx
const isSlow = useSlowConnection({ downlinkThreshold: 1, rttThreshold: 300 });
```

#### Options

| Name                | Type     | Default | Description                             |
| ------------------- | -------- | ------- | --------------------------------------- |
| `downlinkThreshold` | `number` | `1`     | Below this Mbps, connection is slow     |
| `rttThreshold`      | `number` | `300`   | Above this RTT (ms), connection is slow |

#### Returns

`true` if connection is slow, `false` otherwise.

---

### `useNetworkAwareEffect`

Run an effect only when network matches a certain status (online or offline).

#### Usage

```tsx
useNetworkAwareEffect(
  () => {
    // your effect logic
  },
  [/* dependencies */],
  true // run only when online (default)
);
```

#### Params

| Param            | Type                       | Default | Description                                          |
| ---------------- | -------------------------- | ------- | ---------------------------------------------------- |
| `effect`         | `() => void \| () => void` | -       | Effect callback                                      |
| `deps`           | `any[]`                    | `[]`    | Dependency array                                     |
| `onlyWhenOnline` | `boolean`                  | `true`  | Run effect when online (`true`) or offline (`false`) |

---

## ⚡ Example Usage

```tsx
import React from 'react';
import { useNetworkStatus, useSlowConnection, useNetworkAwareEffect } from 'react-network-aware';

export function MyComponent() {
  const { online, effectiveType, downlink } = useNetworkStatus();
  const isSlow = useSlowConnection();

  useNetworkAwareEffect(() => {
    console.log("Fetching data only when online...");
    fetch('/api/data')
      .then(res => res.json())
      .then(data => console.log(data));
  }, [], true);

  if (!online) {
    return <p>⚠️ You are offline</p>;
  }

  if (isSlow) {
    return (
      <p>
        🐢 Slow connection detected (type: {effectiveType}, downlink: {downlink} Mbps).
        Showing lightweight version.
      </p>
    );
  }

  return <p>✅ Connection is good</p>;
}
```

---

## 📄 License

MIT — feel free to use it in personal or commercial projects.

gere para mim o arquivo para eu baixar
