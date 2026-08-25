# FunBytes Troubleshooting & Common Issues

## 1. Android Emulator Cannot Reach Backend (`Network Error`)
- On the standard Android Emulator, `localhost` points to the emulator itself.
- Use `http://10.0.2.2:4000` as the `EXPO_PUBLIC_API_URL`.
- If testing on a physical phone via Wi-Fi, use your computer's local LAN IP (e.g. `http://192.168.1.50:4000`).

## 2. Source Adapter Rate Limits
- If external providers (e.g. Reddit) return 429, the backend automatically serves cached data or realistic mock bytes to ensure a non-breaking user experience.

## 3. Expo Cache Reset
- Clear Expo bundler cache if changes don't appear:
  ```bash
  npx expo start -c
  ```
