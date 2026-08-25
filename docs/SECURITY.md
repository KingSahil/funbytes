# FunBytes Security & Data Privacy Specification

## 1. Zero Secret Exposure
- No client secret keys, RSS parser credentials, or AI tokens are bundled into the Expo JavaScript client.
- All external API proxies and token exchanges occur inside the backend service.

## 2. API Input Validation & Sanitization
- Every REST endpoint validates incoming payloads with strict schema validators.
- Comments and search strings are stripped of script tags and SQL injection vectors.
- Rate limiting is applied per IP and per authenticated user token.

## 3. Client Storage Security
- User identity tokens and private preferences are stored in AsyncStorage / SecureStore with encryption in transit (HTTPS TLS 1.3).
