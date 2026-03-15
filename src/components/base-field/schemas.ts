import { z } from 'zod';

export const inputItemSchema = z.object({
	value: z.string(),
	label: z.string(),
});
