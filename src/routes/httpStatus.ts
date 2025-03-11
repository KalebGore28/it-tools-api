// src/routes/httpStatus.ts
import { Elysia, t } from 'elysia'
import htmlCodes from '../data/htmlcodes.json';

export const httpStatusRoute = new Elysia({ prefix: '/http-status' })
	.get('/', () => {
		return htmlCodes;
	}, {
		detail: {
			summary: 'Get all HTTP status codes',
			description: 'Retrieve all information about HTTP status codes.',
			operationId: 'getHttpStatusCodes',
			tags: ['Web'],
		}
	})
	.get('/:code', ({ params }) => {
		const { code } = params;

		// Handle range (e.g., 2xx, 3xx)
		if (code.endsWith('xx')) {
			const rangePrefix = code[0]; // Extract first digit (e.g., '2' from '2xx')
			const range = Object.values(htmlCodes)
				.flatMap((group) => group.codes)
				.filter((item) => Math.floor(item.code / 100) === parseInt(rangePrefix, 10));

			return { range: `${rangePrefix}xx`, codes: range };
		}

		// Handle specific code
		const statusCode = parseInt(code, 10);
		const match = Object.values(htmlCodes)
			.flatMap((group) => group.codes)
			.find((item) => item.code === statusCode);

		if (!match) {
			throw new Error(`Status code "${code}" not found`);
		}

		return match;
	}, {
		params: t.Object({
			code: t.String({
				minLength: 3,
				maxLength: 3,
				pattern: "^(1xx|2xx|3xx|4xx|5xx|\\d{3})$", // 1xx, 2xx, 3xx, 4xx, 5xx, or any 3-digit number
			}),
		}),
		detail: {
			summary: 'Get HTTP status code(s)',
			description: 'Retrieve information about HTTP status codes.',
			operationId: 'getHttpStatusCode',
			tags: ['Web'],
			responses: {
				200: {
					description: 'HTTP status code information',
					content: {
						'application/json': {
							example: {
								code: 200,
								phrase: 'OK',
								description: 'Standard response for successful HTTP requests.',
							},
						},
					},
				},
				404: {
					description: 'Status code not found',
					content: {
						'text/plain': {
							example: 'Status code "999" not found',
						},
					},
				},
			}
		}
	});