// src/routes/textDiff.ts
import { Elysia, t } from 'elysia'
import { diffWords } from "diff";

export const textDiffRoute = new Elysia()
	.post('/text-diff', ({ body }) => {
		const { text1, text2 } = body

		// Compute the differences using the diff library
		const differences = diffWords(text1, text2)

		return { differences }
	}, {
		body: t.Object({
			text1: t.String({ minLength: 1 }),
			text2: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Compute text differences',
			description: 'Computes the differences between two texts and returns a list of changes.',
			operationId: 'computeTextDifferences',
			tags: ['Text'],
			responses: {
				200: {
					description: 'Text differences',
					content: {
						'application/json': {
							example: {
								differences: [
									{ count: 2, added: false, removed: false, value: 'Hello word' },
									{ count: 1, added: false, removed: true, value: '!' },
								]
							}
						},
					},
				},
			}
		}
	})