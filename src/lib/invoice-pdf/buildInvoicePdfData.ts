import type { GetCompanyResponse } from '@/api/company/getCompany';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import type { InvoicePDFData } from '@/components/invoice-pdf/types';

type CompanyForPdf = NonNullable<GetCompanyResponse>;

export const buildInvoicePdfData = (
	invoice: GetInvoicesResponse[number],
	company: CompanyForPdf,
): InvoicePDFData => ({
	from: {
		name: company.name,
		email: company.email,
		address: company.address,
	},
	to: {
		name: invoice.contract.client.companyName,
		email: invoice.contract.client.responsibleEmail,
		address: invoice.contract.client.address,
	},
	items: invoice.items.map((item) => ({
		description: item.description,
		rate: item.amount,
	})),
	issueDate: invoice.issueDate,
	invoiceNumber: invoice.invoiceConfiguration.lastInvoiceNumber,
});
