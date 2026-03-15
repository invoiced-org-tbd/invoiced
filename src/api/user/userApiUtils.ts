import { userTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import type z from 'zod';

const baseKey = 'users';
export const userQueryKeys = {
	base: () => [baseKey],
};

export const selectUser = createSelectSchema(userTable);
export type SelectUser = z.infer<typeof selectUser>;

export const insertUser = createInsertSchema(userTable);
export type InsertUser = z.infer<typeof insertUser>;
