import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  authSecret: process.env.AUTH_SECRET || 'funbytes_default_secret_key_12345',
  adminApiKey: process.env.ADMIN_API_KEY || 'funbytes_admin_secret_key',
  redditClientId: process.env.REDDIT_CLIENT_ID || '',
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET || '',
  redditUserAgent: process.env.REDDIT_USER_AGENT || 'FunBytesBot/1.0',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  aiSummarizerEnabled: process.env.AI_SUMMARIZER_ENABLED === 'true',
  cacheTtlSeconds: parseInt(process.env.CACHE_TTL_SECONDS || '300', 10),
};
