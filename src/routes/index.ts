import { Router } from 'express';
import { handleContact } from '@/controllers/contact.controller';

const router = Router();

router.post('/contact', handleContact);

export default router;
