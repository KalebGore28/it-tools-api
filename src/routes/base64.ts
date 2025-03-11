// src/routes/base64.ts
import { Elysia, t } from 'elysia'

export const base64Route = new Elysia({ prefix: '/base64' })
	.post('/encode', ({ body }) => {
		const { text, urlSafe = false } = body

		// Perform Base64 encoding
		let encoded = Buffer.from(text).toString('base64')

		// Convert to URL-safe Base64 if needed
		if (urlSafe) {
			encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
		}

		return { encoded, urlSafe }
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
			urlSafe: t.Optional(t.Boolean({ default: false })),
		}),
		detail: {
			summary: 'Encode text to Base64',
			description: 'Converts text to Base64 encoding, optionally using URL-safe characters.',
			operationId: 'encodeBase64',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Base64 encoded text',
					content: {
						'application/json': {
							example: {
								encoded: 'SGVsbG8sIHdvcmxkIQ==',
								urlSafe: false,
							}
						},
					},
				},
			}
		}
	})
	.post('/decode', ({ body }) => {
		const { encoded, urlSafe = false } = body

		// Convert URL-safe Base64 to standard Base64
		let decoded = encoded
			.replace(/-/g, '+')
			.replace(/_/g, '/')
			.padEnd(Math.ceil(encoded.length / 4) * 4, '=')

		// Perform Base64 decoding
		const text = Buffer.from(decoded, 'base64').toString()

		return { text, urlSafe }
	}, {
		body: t.Object({
			encoded: t.String({ minLength: 1 }),
			urlSafe: t.Optional(t.Boolean({ default: false })),
		}),
		detail: {
			summary: 'Decode Base64 to text',
			description: 'Converts Base64 encoding to text, optionally decoding URL-safe characters.',
			operationId: 'decodeBase64',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Decoded text',
					content: {
						'application/json': {
							example: {
								text: 'Hello, world!',
								urlSafe: false,
							}
						},
					},
				},
			}
		}
	})
