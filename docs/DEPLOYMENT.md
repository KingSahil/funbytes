# FunBytes Deployment & Release Guide

## 1. Backend Container Deployment
```bash
cd backend
docker build -t funbytes-api:v1.0.0 .
docker run -d -p 4000:4000 --env-file .env funbytes-api:v1.0.0
```

## 2. Android Expo Release Build
Using Expo Application Services (EAS):
```bash
cd apps/mobile
npx eas-cli build --platform android --profile production
```
This generates a production `.aab` (Android App Bundle) ready for upload to the Google Play Console.
