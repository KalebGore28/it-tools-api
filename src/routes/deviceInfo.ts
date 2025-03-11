// src/routes/deviceInfo.ts
import { Elysia } from 'elysia'

export const deviceInfoRoute = new Elysia()
	.get('/device-info', (c) => {
		return {
			userAgent: c.request.headers.get('User-Agent') || 'Unknown',
			languages: c.request.headers.get('Accept-Language') || 'Unknown',
		};
	}, {
		detail: {
			summary: 'Get device information',
			description: 'Returns the User-Agent and Accept-Language headers from the request.',
			operationId: 'getDeviceInfo',
			tags: ['Web'],
			responses: {
				200: {
					description: 'Device information',
					content: {
						'application/json': {
							example: {
								userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
								languages: 'en-US,en;q=0.8',
							}
						},
					},
				},
			}
		}
	});