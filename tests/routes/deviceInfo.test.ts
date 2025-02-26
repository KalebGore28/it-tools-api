import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { deviceInfoRoute } from '../../src/routes/deviceInfo'

const api = treaty(deviceInfoRoute)

describe('Device Info', () => {
	it('should return user agent and accepted languages', async () => {
		const { data, error } = await api['device-info'].get()
		expect(error).toBeNull()
		expect(data).toEqual({
			userAgent: 'Unknown',
			languages: 'Unknown'
		})
	})
})