import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  ALLOWED_ORIGINS: z.string(),
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.email(),
  EMAIL_TO: z.email(),
});

export const env = envSchema.parse(process.env);
