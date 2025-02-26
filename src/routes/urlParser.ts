// src/routes/urlParser.ts
import { Elysia, t } from 'elysia'

export const urlParserRoute = new Elysia()
	.post('/url-parser', ({ body }) => {
		const { url } = body

		// Parse the URL
		const parsedUrl = new URL(url)

		// Extract query parameters
		const params: Record<string, string> = {}
		parsedUrl.searchParams.forEach((value, key) => {
			params[key] = value
		})

		// Construct the response
		const parsedComponents = {
			protocol: parsedUrl.protocol,
			username: parsedUrl.username,
			password: parsedUrl.password,
			hostname: parsedUrl.hostname,
			port: parsedUrl.port,
			path: parsedUrl.pathname,
			params,
			hash: parsedUrl.hash,
		};

		return parsedComponents;
	}, {
		body: t.Object({
			url: t.String({ minLength: 1 }),
		}),
		detail: {
			tags: ['Web']
		}
	});