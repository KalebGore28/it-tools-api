// src/routes/binaryConverter.ts
import { Elysia, t } from 'elysia'

export const binaryConverterRoute = new Elysia({ prefix: '/binary' })
	.post('/encode', ({ body }) => {
		const { text } = body

		// Convert text to binary
		const binary = text
			.split('')
			.map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
			.join(' ')

		return { binary }
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Encode text to binary',
			description: 'Converts text to binary encoding.',
			operationId: 'encodeBinary',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Binary encoded text',
					content: {
						'application/json': {
							example: {
								binary: '01001000 01100101 01101100 01101100 01101111 00101100 00100000 01110111 01101111 01110010 01101100 01100100 00100001'
							}
						},
					},
				},
			}
		}
	})
	.post('/decode', ({ body }) => {
		const { binary } = body

		// Convert binary to text
		const text = binary
			.split(' ')
			.map((bin) => String.fromCharCode(parseInt(bin, 2)))
			.join('')

		return { text }
	}, {
		body: t.Object({
			binary: t.String({
				minLength: 1,
				pattern: '^([01]{8} ?)+$',
			}),
		}),
		detail: {
			summary: 'Decode binary to text',
			description: 'Converts binary encoding to text.',
			operationId: 'decodeBinary',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Decoded text',
					content: {
						'application/json': {
							example: {
								text: 'Hello, world!'
							}
						},
					},
				},
			}
		}
	})