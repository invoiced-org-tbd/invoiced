import type { AddressLike } from '@/utils/addressUtils';
import z from 'zod';

export const invoicePDFModelSchema = z.enum(['base-v0']);

export type InvoicePDFModel = z.infer<typeof invoicePDFModelSchema>;

type InvoicePDFItem = {
	description: string;
	rate: number;
};

type InvoicePDFParty = {
	name: string;
	email: string;
	address: AddressLike;
};

export type InvoicePDFData = {
	from: InvoicePDFParty;
	to: InvoicePDFParty;
	items: InvoicePDFItem[];
	issueDate: Date;
	invoiceNumber: number;
};

export type InvoicePDFProps = {
	model: InvoicePDFModel;
	data: InvoicePDFData;
	className?: string;
};
