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

export const htmlEncoderRoute = new Elysia({
	prefix: '/html-encoder',
	detail: {
		tags: ['Web']
	}
})
	.post('/encode', ({ body }) => {
		const { text } = body
		const html = textToHTML(text)
		return { html }
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
	})
	.post('/decode', ({ body }) => {
		const { html } = body
		const text = htmlToText(html)
		return { text }
	}, {
		body: t.Object({
			html: t.String({ minLength: 1 }),
		}),
	});