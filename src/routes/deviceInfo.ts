// src/routes/deviceInfo.ts
import { Elysia } from 'elysia'

export const deviceInfoRoute = new Elysia()
	.get('/device-info', (c) => {
		return {
			userAgent: c.request.headers.get('User-Agent') || 'Unknown',
			languages: c.request.headers.get('Accept-Language') || 'Unknown',
		};
	},{
		detail: {
			tags: ['Web']
		}
	});