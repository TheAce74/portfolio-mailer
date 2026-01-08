import express from 'express';
import cors from 'cors';
import { env } from '@/config/env';
import routes from '@/routes';

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((o) =>
        o.trim(),
      );

      if (
        !origin ||
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);
app.use(express.json());

app.use('/', routes);

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
