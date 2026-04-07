import { escapeHtmlForEmailBody } from './escapeHtml';

/** Detect stored body that is legacy plain text (no HTML tags). */
const isLikelyPlainTextEmailBody = (body: string): boolean => {
	const trimmed = body.trim();
	if (!trimmed) {
		return true;
	}
	return !trimmed.includes('<');
};

/**
 * Convert stored template body to HTML for Tiptap.
 * Legacy plain text is wrapped in a single paragraph with escaped content.
 */
export const bodyToEditorHtml = (body: string): string => {
	const trimmed = body.trim();
	if (!trimmed) {
		return '';
	}
	if (isLikelyPlainTextEmailBody(body)) {
		return `<p>${escapeHtmlForEmailBody(trimmed)}</p>`;
	}
	return body;
};
