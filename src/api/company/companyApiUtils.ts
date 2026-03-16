import { companyTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import type z from 'zod';

const baseKey = 'companies';
export const companyQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey],
};

export const selectCompany = createSelectSchema(companyTable);
export type SelectCompany = z.infer<typeof selectCompany>;

export const insertCompany = createInsertSchema(companyTable);
export type InsertCompany = z.infer<typeof insertCompany>;
