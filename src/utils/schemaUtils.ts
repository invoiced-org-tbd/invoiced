import {
	dataTableOrderByStateSchema,
	dataTablePaginationStateSchema,
} from '@/components/data-table';
import z from 'zod';

export const getPaginatedQueryOptionsSchema = z.object({
	companyId: z.string(),
	pagination: dataTablePaginationStateSchema,
	orderBy: dataTableOrderByStateSchema,
});
export type GetPaginatedQueryOptions = z.infer<
	typeof getPaginatedQueryOptionsSchema
>;
