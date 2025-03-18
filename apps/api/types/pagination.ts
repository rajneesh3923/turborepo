import z from 'zod';

export const paginationParamsSchema = z.object({
  page_size: z.number(),
  page: z.number(),
});

export type PaginationParams = z.infer<typeof paginationParamsSchema>;
