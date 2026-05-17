import '@tanstack/react-start/server-only';

import { getResend } from './client';

export type TransactionalAttachment = {
	filename: string;
	content: Buffer;
	contentType?: string;
};

export type SendTransactionalEmailParams = {
	from: string;
	to: string[];
	subject: string;
	text: string;
	html?: string;
	attachments?: TransactionalAttachment[];
	/** Fresh key per user-triggered send so retries/re-sends are not blocked by 409 conflicts. */
	idempotencyKey: string;
};

export type SendTransactionalEmailResult =
	| { ok: true; emailId: string }
	| { ok: false; message: string; statusCode: number | null };

export const sendTransactionalEmail = async (
	params: SendTransactionalEmailParams,
): Promise<SendTransactionalEmailResult> => {
	const resend = getResend();
	if (!resend) {
		return {
			ok: false,
			message: 'missing_api_key',
			statusCode: null,
		};
	}

	const { data, error } = await resend.emails.send(
		{
			from: params.from,
			to: params.to,
			subject: params.subject,
			text: params.text,
			html: params.html,
			attachments: params.attachments?.map((a) => ({
				filename: a.filename,
				content: a.content,
				content_type: a.contentType,
			})),
		},
		{
			idempotencyKey: params.idempotencyKey,
		},
	);

	if (error) {
		return {
			ok: false,
			message: error.message,
			statusCode: error.statusCode,
		};
	}

	if (!data?.id) {
		return {
			ok: false,
			message: 'empty_response',
			statusCode: null,
		};
	}

	return { ok: true, emailId: data.id };
};
