---
name: funbytes-release
description: Build, bundle, testing, and deployment verification checklist for FunBytes Android releases.
---

# FunBytes Release Skill

## Purpose
Governs the verification, building, and deployment process for the FunBytes backend services and Expo Android mobile builds.

## When to Use It
- Preparing a production Android APK / AAB or deploying backend API updates.

## Release Checklist
1. **Pre-flight Checks**:
   - `npm test` passes 100%.
   - TypeScript check (`npx tsc --noEmit`) passes with zero errors.
   - ESLint passes without errors.
2. **Environment Checks**:
   - Production API URL configured in `.env.production`.
   - Demo fallback data enabled as emergency recovery mode.
3. **Android Build Commands (Expo EAS)**:
   ```bash
   # Build Android APK for local testing
   cd apps/mobile
   npx eas-cli build --platform android --profile preview

   # Build Production Android App Bundle (.aab)
   npx eas-cli build --platform android --profile production
   ```
4. **Backend Container Deployment**:
   ```bash
   cd backend
   docker build -t funbytes-api:latest .
   docker run -p 4000:4000 funbytes-api:latest
   ```
