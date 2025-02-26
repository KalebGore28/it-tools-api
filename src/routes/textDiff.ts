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
			tags: ['Text']
		}
	})