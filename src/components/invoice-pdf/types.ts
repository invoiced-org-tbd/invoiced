import type { GetCompanyResponse } from '@/api/company/getCompany';
import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import z from 'zod';

export const invoicePDFModelSchema = z.enum(['base-v0']);

export type InvoicePDFModel = z.infer<typeof invoicePDFModelSchema>;

export type InvoicePDFModelProps = {
	contractData: NonNullable<ContractsUpsertFormSchema>;
	company: NonNullable<GetCompanyResponse>;
};

export type InvoicePDFProps = InvoicePDFModelProps & {
	model: InvoicePDFModel;
};
