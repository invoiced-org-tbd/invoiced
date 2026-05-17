import { formatInvoiceIssueDate } from '@/utils/dateUtils';

export type EmailTemplateVariableKey = 'client_name' | 'issued_date';

export type EmailTemplateVariables = Record<EmailTemplateVariableKey, string>;

const variablePattern = /\{\{\s*(client_name|issued_date)\s*\}\}/g;

export const renderEmailTemplateVariables = (
	template: string,
	variables: EmailTemplateVariables,
): string => {
	return template.replace(
		variablePattern,
		(_match, key: EmailTemplateVariableKey) => {
			return variables[key] ?? '';
		},
	);
};

/** Matches invoice PDF issue date; does not follow UI locale. */
export const formatEmailTemplateIssueDate = (issueDate: Date) =>
	formatInvoiceIssueDate(issueDate);

export const htmlToPlainText = (html: string) => {
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n')
		.replace(/<[^>]+>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
};
