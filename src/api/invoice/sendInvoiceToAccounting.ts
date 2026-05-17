import { db } from '@/db/client';
import { envServer } from '@/lib/envServer';
import { getResendFrom } from '@/lib/resend/getResendFrom';
import { buildInvoicePdfData } from '@/lib/invoice-pdf/buildInvoicePdfData';
import { renderInvoicePdfBuffer } from '@/lib/invoice-pdf/renderInvoicePdfBuffer';
import { sendTransactionalEmail } from '@/lib/resend/sendTransactionalEmail';
import { createMutationOptions } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { getT } from '@/utils/languageUtils';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { invoiceForEmailQueryWith } from './invoiceEmailQuery';
import { getEmailTemplateVariablesForInvoice } from '@/lib/email/getEmailTemplateVariablesForInvoice';
import {
	htmlToPlainText,
	renderEmailTemplateVariables,
} from '@/lib/email/emailTemplateVariables';
import { getInvoiceAutoSendEmailTemplate } from '@/lib/invoice/invoiceAutoSend';

const sendInvoiceToAccountingParams = z.object({
	invoiceId: z.string().min(1),
});

type SendInvoiceToAccountingParams = z.infer<
	typeof sendInvoiceToAccountingParams
>;

const recipientEmailSchema = z.string().trim().email();

const invoicePdfAttachmentName = (fileName: string) =>
	fileName.toLowerCase().endsWith('.pdf') ? fileName : `${fileName}.pdf`;

const sendInvoiceToAccountingServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(sendInvoiceToAccountingParams)
	.handler(async ({ data, context: { user } }) => {
		const t = getT();

		try {
			const { invoiceId } = data;

			if (!envServer.RESEND_API_KEY?.trim()) {
				throw new ServerError({
					message: t('invoices.server.resendNotConfigured'),
				});
			}

			const invoice = await db.query.invoiceTable.findFirst({
				where: {
					id: data.invoiceId,
					userId: user.id,
					isDeleted: false,
				},
				with: invoiceForEmailQueryWith,
			});

			if (!invoice) {
				throw new ServerError({
					message: t('invoices.server.notFound'),
				});
			}

			const company = await db.query.companyTable.findFirst({
				where: {
					userId: user.id,
				},
				with: {
					address: true,
				},
			});

			if (!company) {
				throw new ServerError({
					message: t('invoices.server.companyRequiredForEmail'),
				});
			}

			const toRaw = invoice.contract.client.responsibleEmail.trim();
			const recipientParsed = recipientEmailSchema.safeParse(toRaw);
			if (!recipientParsed.success) {
				throw new ServerError({
					message: t('invoices.server.invalidResponsibleEmail'),
				});
			}
			const toEmail = recipientParsed.data;

			const pdfData = buildInvoicePdfData(invoice, company);
			const pdfBuffer = await renderInvoicePdfBuffer(pdfData);

			const attachmentFileName = invoicePdfAttachmentName(invoice.fileName);

			const emailTemplate = getInvoiceAutoSendEmailTemplate(invoice);
			if (!emailTemplate) {
				throw new ServerError({
					message: t('invoices.server.autoSendNotConfigured'),
				});
			}

			const templateVariables = getEmailTemplateVariablesForInvoice(invoice);
			const subject = renderEmailTemplateVariables(
				emailTemplate.subject,
				templateVariables,
			);
			const bodyHtml = renderEmailTemplateVariables(
				emailTemplate.body,
				templateVariables,
			);
			const bodyText = htmlToPlainText(bodyHtml);

			const sendResult = await sendTransactionalEmail({
				from: getResendFrom(),
				to: [toEmail],
				subject,
				text: bodyText,
				html: bodyHtml,
				attachments: [
					{
						filename: attachmentFileName,
						content: pdfBuffer,
						contentType: 'application/pdf',
					},
				],
				idempotencyKey: `send-invoice-accounting/${invoiceId}/${crypto.randomUUID()}`,
			});

			if (!sendResult.ok) {
				if (sendResult.message === 'missing_api_key') {
					throw new ServerError({
						message: t('invoices.server.resendNotConfigured'),
					});
				}
				if (sendResult.statusCode === 403) {
					throw new ServerError({
						message: t('invoices.server.resendSandboxRecipient'),
					});
				}
				throw new ServerError({
					message: t('invoices.server.emailProviderError'),
				});
			}

			return createSuccessResponse({
				message: t('invoices.server.sendToAccountingSuccess', {
					email: toEmail,
				}),
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const sendInvoiceToAccountingMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: SendInvoiceToAccountingParams) =>
			sendInvoiceToAccountingServerFn({ data }),
	});
