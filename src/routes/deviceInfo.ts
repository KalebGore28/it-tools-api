// src/routes/deviceInfo.ts
import { Elysia } from 'elysia'

export const deviceInfoRoute = new Elysia({
	detail: {
		tags: ['Web']
	}
})
	.get('/device-info', (c) => {
		return {
			userAgent: c.request.headers.get('User-Agent') || 'Unknown',
			languages: c.request.headers.get('Accept-Language') || 'Unknown',
		};
	});