// src/routes/htmlEntitiesConverter.ts
import { Elysia, t } from 'elysia'

// Function: Escape special HTML characters to HTML entities
const escapeHTML = (text: string): string => {
	return text
		.replace(/&/g, '&amp;') // Replace &
		.replace(/</g, '&lt;') // Replace <
		.replace(/>/g, '&gt;') // Replace >
		.replace(/"/g, '&quot;') // Replace "
		.replace(/'/g, '&#39;'); // Replace '
};

// Function: Unescape HTML entities back to normal text
const unescapeHTML = (escaped: string): string => {
	return escaped
		.replace(/&amp;/g, '&') // Replace &amp;
		.replace(/&lt;/g, '<') // Replace &lt;
		.replace(/&gt;/g, '>') // Replace &gt;
		.replace(/&quot;/g, '"') // Replace &quot;
		.replace(/&#39;/g, "'"); // Replace &#39;
};

export const htmlEntitiesEscaperRoute = new Elysia({ prefix: '/html-entities-escaper' })
	.post('/escape', ({ body }) => {
		const { text } = body
		const escaped = escapeHTML(text)
		return { escaped }
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Escape HTML entities',
			description: 'Convert special HTML characters to HTML entities.',
			operationId: 'escapeHTML',
			tags: ['Web'],
			responses: {
				200: {
					description: 'Escaped HTML entities',
					content: {
						'application/json': {
							example: {
								escaped: '&lt;h1&gt;Hello, world!&lt;/h1&gt;',
							}
						},
					},
				},
			}
		}
	})
	.post('/unescape', ({ body }) => {
		const { escaped } = body
		const text = unescapeHTML(escaped)
		return { text }
	}, {
		body: t.Object({
			escaped: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Unescape HTML entities',
			description: 'Convert HTML entities back to special HTML characters.',
			operationId: 'unescapeHTML',
			tags: ['Web'],
			responses: {
				200: {
					description: 'Unescaped HTML entities',
					content: {
						'application/json': {
							example: {
								text: '<h1>Hello, world!</h1>',
							}
						},
					},
				},
			}
		}
	});