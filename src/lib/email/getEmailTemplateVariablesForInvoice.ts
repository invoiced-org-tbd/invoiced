import type { EmailTemplateVariables } from './emailTemplateVariables';
import { formatEmailTemplateIssueDate } from './emailTemplateVariables';

export type InvoiceForEmailTemplateVariables = {
	issueDate: Date;
	contract: {
		client: {
			responsibleName: string;
		};
	};
};

export const getEmailTemplateVariablesForInvoice = (
	invoice: InvoiceForEmailTemplateVariables,
): EmailTemplateVariables => ({
	client_name: invoice.contract.client.responsibleName,
	issued_date: formatEmailTemplateIssueDate(invoice.issueDate),
});
