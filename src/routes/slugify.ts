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

export const slugifyRoute = new Elysia()
	.post('/slugify', ({ body }) => {
		const { text } = body
		const slug = slugify(text)
		return { slug }
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Slugify text',
			description: 'Converts text to a URL-friendly slug.',
			operationId: 'slugifyText',
			tags: ['Text'],
			responses: {
				200: {
					description: 'Slugified text',
					content: {
						'application/json': {
							example: {
								slug: 'hello-world'
							}
						},
					},
				},
			}
		}
	})
