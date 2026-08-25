# FunBytes Environment Variables Reference

| Variable | Description | Default | Required |
|---|---|---|---|
| `PORT` | Backend HTTP Port | `4000` | Yes |
| `NODE_ENV` | Environment (`development` / `production`) | `development` | Yes |
| `EXPO_PUBLIC_API_URL` | Client endpoint for backend API | `http://10.0.2.2:4000` | Yes |
| `AUTH_SECRET` | Secret for signing JWT sessions | `funbytes_secret` | Yes |
| `ADMIN_API_KEY` | Key for admin management endpoints | `funbytes_admin` | Yes |
| `REDDIT_CLIENT_ID` | Optional Reddit OAuth ID | `""` | No |
| `REDDIT_CLIENT_SECRET` | Optional Reddit OAuth Secret | `""` | No |
| `GEMINI_API_KEY` | Optional Gemini API key for AI summaries | `""` | No |
