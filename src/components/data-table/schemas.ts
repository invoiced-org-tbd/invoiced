import z from 'zod';

export const dataTablePaginationStateSchema = z.object({
	pageIndex: z.number(),
	pageSize: z.number(),
});
export type DataTablePaginationState = z.infer<typeof dataTablePaginationStateSchema>;

export const dataTableOrderByStateSchema = z.object({
	id: z.string(),
	desc: z.boolean(),
});
export type DataTableOrderByState = z.infer<typeof dataTableOrderByStateSchema>;
