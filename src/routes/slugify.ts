// src/routes/slugify.ts
import { Elysia, t } from 'elysia'

// Utility function to slugify a string
const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove all non-word characters except spaces and hyphens
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/--+/g, '-'); // Replace multiple hyphens with a single hyphen
};

export const slugifyRoute = new Elysia({
	detail: {
		tags: ['Text']
	}
})
	.post('/slugify', ({ body }) => {
		const { text } = body
		const slug = slugify(text)
		return { slug }
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
	})
