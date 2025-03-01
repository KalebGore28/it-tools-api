// src/routes/binaryConverter.ts
import { Elysia, t } from 'elysia'

export const binaryConverterRoute = new Elysia({
	prefix: '/binary',
	detail: {
		tags: ['Converter']
	}
 })
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
				pattern: '^([01]{8} ?)+$', // Validate binary format
			}),
		}),
	})