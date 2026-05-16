import '@tanstack/react-start/server-only';

import {
	createCipheriv,
	createDecipheriv,
	hkdfSync,
	randomBytes,
} from 'node:crypto';

import { envServer } from '@/lib/envServer';

/** ASCII prefix marking AES-256-GCM ciphertext persisted in DB (v1) */
const STORAGE_PREFIX = 'inv1_aes256_gcm$:';

/** HKDF label — stable across deploys; changing it invalidates stored ciphertext */
const HKDF_INFO = Buffer.from('invoiced:smtp-password:v1', 'utf8');

function smtpPasswordDerivedKey(): Buffer {
	const rawKey = hkdfSync(
		'sha256',
		Buffer.from(envServer.BETTER_AUTH_SECRET, 'utf8'),
		Buffer.alloc(0),
		HKDF_INFO,
		32,
	);
	return Buffer.from(rawKey);
}

export function encryptStoredSmtpPassword(plainPassword: string): string {
	const key = smtpPasswordDerivedKey();
	const iv = randomBytes(12);
	const cipher = createCipheriv('aes-256-gcm', key, iv);
	const ciphertext = Buffer.concat([
		cipher.update(plainPassword, 'utf8'),
		cipher.final(),
	]);
	const authTag = cipher.getAuthTag();
	const payload = Buffer.concat([iv, authTag, ciphertext]);
	return `${STORAGE_PREFIX}${payload.toString('base64url')}`;
}

/**
 * Produces plain password for SMTP transport. Rows written before encryption
 * (plaintext) are returned as-is. Call this only on the server.
 *
 * @public For SMTP transport when invoice email sending is implemented.
 */
export function decryptStoredSmtpPasswordForUse(
	storedPassword: string,
): string {
	if (!storedPassword.startsWith(STORAGE_PREFIX)) {
		return storedPassword;
	}

	const raw = Buffer.from(
		storedPassword.slice(STORAGE_PREFIX.length),
		'base64url',
	);
	if (raw.length < 12 + 16) {
		throw new Error('Invalid encrypted SMTP password payload');
	}

	const iv = raw.subarray(0, 12);
	const authTag = raw.subarray(12, 28);
	const ciphertext = raw.subarray(28);
	const key = smtpPasswordDerivedKey();
	const decipher = createDecipheriv('aes-256-gcm', key, iv);
	decipher.setAuthTag(authTag);
	return Buffer.concat([
		decipher.update(ciphertext),
		decipher.final(),
	]).toString('utf8');
}
