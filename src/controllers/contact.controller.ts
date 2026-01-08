import { Request, Response } from 'express';
import { contactSchema } from '@/utils/validation';
import { sendContactEmail } from '@/services/mailer.service';
import { z } from 'zod';

export const handleContact = async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    await sendContactEmail(validatedData);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.issues,
      });
    }

    console.error('Message sending error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
    });
  }
};
