import express from 'express';
import cors from 'cors';
import { config } from './config';
import { apiRouter } from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'FunBytes API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[FunBytes API Error]:', err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`⚡ FunBytes API Server listening on port ${config.port}`);
    console.log(`📡 Endpoints available at http://localhost:${config.port}/api`);
  });
}

export default app;
