import crypto from 'node:crypto';

/** Public HMAC key from AbacatePay webhook documentation. */
const ABACATEPAY_PUBLIC_KEY =
	't9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9';

export const verifyAbacateWebhookSignature = (
	rawBody: string,
	signatureFromHeader: string | null,
): boolean => {
	if (!signatureFromHeader) {
		return false;
	}

	const bodyBuffer = Buffer.from(rawBody, 'utf8');
	const expectedSig = crypto
		.createHmac('sha256', ABACATEPAY_PUBLIC_KEY)
		.update(bodyBuffer)
		.digest('base64');

	const expectedBuffer = Buffer.from(expectedSig);
	const receivedBuffer = Buffer.from(signatureFromHeader);

	if (expectedBuffer.length !== receivedBuffer.length) {
		return false;
	}

	return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};
