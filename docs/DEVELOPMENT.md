# FunBytes Local Development Guide

## 1. Prerequisites
- Bun >= 1.0.0
- Android Studio / Android Emulator or Expo Go app on mobile

## 2. Setting Up the Monorepo
```bash
# Clone the repository
git clone https://github.com/funbytes/funbytes.git
cd funbytes

# Install backend dependencies
cd backend
bun install

# Install mobile dependencies
cd ../apps/mobile
bun install
```

## 3. Running Services Locally
1. Start the backend:
   ```bash
   cd backend
   bun run dev
   ```
2. Start the Expo mobile client:
   ```bash
   cd apps/mobile
   bun start
   ```
   Press `a` in the terminal to launch on your connected Android emulator or scan the QR code using Expo Go on your physical Android phone.
