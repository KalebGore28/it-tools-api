// src/routes/urlEncoder.ts
import { Elysia, t } from 'elysia'

// Function: Encode a string to URL-encoded format
const encodeToURL = (text: string): string => {
	return encodeURIComponent(text);
};

// Function: Decode a URL-encoded string to plain text
const decodeFromURL = (encoded: string): string => {
	return decodeURIComponent(encoded);
};

export const urlEncoderRoute = new Elysia({ prefix: '/url-encoder' })
	.post('/encode', ({ body }) => {
		const { text } = body;
		const encoded = encodeToURL(text);
		return { encoded };
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Encode text to URL-encoded format',
			description: 'Converts text to URL-encoded format.',
			operationId: 'encodeToURL',
			tags: ['Web'],
			responses: {
				200: {
					description: 'URL-encoded text',
					content: {
						'application/json': {
							example: {
								"encoded": "Hello%2C%20world!"
							},
						},
					},
				},
			},
		}
	})
	.post('/decode', ({ body }) => {
		const { encoded } = body;
		const text = decodeFromURL(encoded);
		return { text };
	}, {
		body: t.Object({
			encoded: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Decode URL-encoded text',
			description: 'Converts URL-encoded text to plain text.',
			operationId: 'decodeFromURL',
			tags: ['Web'],
			responses: {
				200: {
					description: 'Decoded text',
					content: {
						'application/json': {
							example: {
								text: 'Hello, world!',
							},
						},
					},
				},
			},
		}
	});