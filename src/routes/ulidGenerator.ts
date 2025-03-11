// src/routes/ulidGenerator.ts
import { Elysia, t } from 'elysia'
import { ulid } from "ulid";

export const ulidGeneratorRoute = new Elysia()
	.post('/ulid-generator', ({ body }) => {
		const { quantity = 1 } = body

		// Generate the requested number of ULIDs
		const ulids = Array.from({ length: quantity }, () => ulid())

		return { quantity, ulids }
	}, {
		body: t.Object({
			quantity: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 1 })),
		}),
		detail: {
			summary: 'Generate ULID',
			description: 'Generate one or more ULIDs.',
			operationId: 'generateULID',
			tags: ['Crypto'],
			responses: {
				200: {
					description: 'Generated ULIDs',
					content: {
						'application/json': {
							example: {
								quantity: 3,
								ulids: [
									'01F9J4Z8QKJ3Z7Z3JZQ7ZQZQZQ',
									'01F9J4Z8QKJ3Z7Z3JZQ7ZQZQZR',
									'01F9J4Z8QKJ3Z7Z3JZQ7ZQZQZS',
								],
							},
						},
					},
				},
			},
		}
	})
