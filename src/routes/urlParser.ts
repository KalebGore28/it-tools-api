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
			summary: 'Parse URL',
			description: 'Parse a URL and extract its components.',
			operationId: 'parseURL',
			tags: ['Web'],
			responses: {
				200: {
					description: 'Parsed URL components',
					content: {
						'application/json': {
							example: {
								protocol: "https:",
								username: "me",
								password: "pwd",
								hostname: "it-tools-api.noesc.io",
								port: "3000",
								path: "/url-parser",
								params: {
									key1: "value",
									key2: "value2"
								},
								hash: "#the-hash"
							}
						}
					}
				}
			}
		}
	});