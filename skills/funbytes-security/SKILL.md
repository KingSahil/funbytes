---
name: funbytes-security
description: Security practices, content sanitization, authentication, and moderation enforcement for FunBytes.
---

# FunBytes Security Skill

## Purpose
Ensures client data privacy, input sanitization, token security, rate limiting, and spam protection across the entire FunBytes stack.

## When to Use It
- Implementing auth flows, comment endpoints, report mechanisms, or admin operations.
- Reviewing third-party dependency vulnerabilities and data egress.

## Security Mandates
1. **No Client Secrets**: Reddit API secrets, OpenAI/Gemini keys, and admin tokens must never exist in the Expo client bundle or environment variables exposed to the web.
2. **HTML Sanitization**: All user-generated comments and external RSS excerpts must be sanitized with strict HTML escaping before rendering in the React Native UI.
3. **Rate Limiting**:
   - Like toggling: Max 60 requests per minute per IP/user.
   - Comment posting: Max 10 comments per minute per user.
4. **Content Reporting & Moderation**:
   - Every comment and post has a `/report` route.
   - 3 verified user reports trigger automatic content soft-hiding pending admin review.
5. **Secure Storage**: On mobile, use Expo SecureStore or encrypted AsyncStorage for auth tokens and user session IDs.
