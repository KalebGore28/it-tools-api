// src/routes/rsaKeyGenerator.ts
import { Elysia, t } from 'elysia';

function formatPEM(base64String: string, type: "PUBLIC" | "PRIVATE") {
	const header = `-----BEGIN ${type} KEY-----\n`;
	const footer = `\n-----END ${type} KEY-----`;

	// Insert line breaks every 64 characters
	const formattedKey = base64String.match(/.{1,64}/g)?.join("\n") || base64String;

	return header + formattedKey + footer;
}

export const rsaKeyGeneratorRoute = new Elysia()
	.post('/rsa-key-generator', async ({ body }) => {
		// Ensure body is always an object and apply default manually
		const bits = body?.bits ?? 2048;

		const keyPair = await crypto.subtle.generateKey(
			{
				name: "RSA-OAEP",
				modulusLength: bits,
				publicExponent: new Uint8Array([1, 0, 1]), // 65537
				hash: "SHA-256",
			},
			true,
			["encrypt", "decrypt"]
		);

		// Export keys
		const publicKeyBase64 = Buffer.from(await crypto.subtle.exportKey("spki", keyPair.publicKey)).toString("base64");
		const privateKeyBase64 = Buffer.from(await crypto.subtle.exportKey("pkcs8", keyPair.privateKey)).toString("base64");

		// Convert to PEM format
		const publicKeyPEM = formatPEM(publicKeyBase64, "PUBLIC");
		const privateKeyPEM = formatPEM(privateKeyBase64, "PRIVATE");

		return {
			publicKey: publicKeyPEM,
			privateKey: privateKeyPEM,
		};
	}, {
		body: t.Object({
			bits: t.Optional(t.Number({ minimum: 512, maximum: 4096, default: 2048 })),
		}),
		detail: {
			summary: 'Generate RSA key pair',
			description: 'Generate a new RSA key pair with the specified number of bits.',
			operationId: 'generateRSAKeyPair',
			tags: ['Crypto'],
			responses: {
				200: {
					description: 'Generated RSA key pair',
					content: {
						'application/json': {
							example: {
								publicKey: '-----BEGIN PUBLIC KEY-----\...-----END PUBLIC KEY-----',
								privateKey: '-----BEGIN PRIVATE KEY-----\...-----END PRIVATE KEY-----',
							},
						},
					},
				},
			}
		}
	});