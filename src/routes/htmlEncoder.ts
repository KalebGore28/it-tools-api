// src/routes/unicodeConverter.ts
import { Elysia, t } from 'elysia'

// Function: Text to (HTML) Unicode Code Points
const textToHTML = (text: string): string => {
	return text
		.split('')
		.map((char) => {
			return `&#${char.charCodeAt(0)};`;
		})
		.join('');
};

// Function: (HTML) Unicode Code Points to Text
const htmlToText = (html: string): string => {
	return html
		.replace(/&#(\d+);/g, (match, dec) => {
			return String.fromCharCode(parseInt(dec));
		});
};

export const htmlEncoderRoute = new Elysia({ prefix: '/html-encoder' })
	.post('/encode', ({ body }) => {
		const { text } = body
		const html = textToHTML(text)
		return { html }
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Encode text to HTML Unicode',
			description: 'Converts text to HTML Unicode code points.',
			operationId: 'encodeTextToHTML',
			tags: ['Web'],
			responses: {
				200: {
					description: 'HTML Unicode code points',
					content: {
						'text/plain': {
							example: {
								html: '&#72;&#101;&#108;&#108;&#111;&#32;&#87;&#111;&#114;&#108;&#100;'
							}
						},
					},
				},
			}
		}
	})
	.post('/decode', ({ body }) => {
		const { html } = body
		const text = htmlToText(html)
		return { text }
	}, {
		body: t.Object({
			html: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Decode HTML Unicode to text',
			description: 'Converts HTML Unicode code points to text.',
			operationId: 'decodeHTMLToText',
			tags: ['Web'],
			responses: {
				200: {
					description: 'Decoded text',
					content: {
						'text/plain': {
							example: {
								text: 'Hello World'
							}
						},
					},
				},
			}
		}
	});