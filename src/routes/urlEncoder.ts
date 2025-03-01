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

export const urlEncoderRoute = new Elysia({
	prefix: '/url-encoder',
	detail: {
		tags: ['Web']
	}
})
	.post('/encode', ({ body }) => {
		const { text } = body;
		const encoded = encodeToURL(text);
		return { encoded };
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
	})
	.post('/decode', ({ body }) => {
		const { encoded } = body;
		const text = decodeFromURL(encoded);
		return { text };
	}, {
		body: t.Object({
			encoded: t.String({ minLength: 1 }),
		}),
	});