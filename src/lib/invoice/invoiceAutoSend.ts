import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';

export const invoiceHasAutoSendConfigured = (
	invoice: GetInvoicesResponse[number],
) => {
	return Boolean(invoice.contract.original?.autoSend?.emailTemplate);
};

export const getInvoiceAutoSendEmailTemplate = (
	invoice: GetInvoicesResponse[number],
) => {
	if (!invoiceHasAutoSendConfigured(invoice)) {
		return null;
	}

	return invoice.contract.original?.autoSend?.emailTemplate ?? null;
};
