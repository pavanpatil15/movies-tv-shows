// src/validators/entry.validator.ts
import { z } from 'zod';

export const createEntrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  type: z.enum(['Movie', 'TV_Show'], {
    errorMap: () => ({ message: 'Type must be either Movie or TV_Show' })
  }),
  director: z.string().min(1, 'Director is required').max(255),
  budget: z.string().max(100).optional(),
  location: z.string().max(255).optional(),
  duration: z.string().max(100).optional(),
  yearTime: z.string().max(100).optional(),
});

export const updateEntrySchema = createEntrySchema.partial();

export const paginationSchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('20'),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
export type UpdateEntryInput = z.infer<typeof updateEntrySchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;