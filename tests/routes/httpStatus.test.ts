import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { httpStatusRoute } from '../../src/routes/httpStatus'

import htmlCodes from '../../src/data/htmlcodes.json'

const api = treaty(httpStatusRoute)

describe('HTTP Status', () => {
	it('should return all HTTP status codes', async () => {
		const { data, error } = await api['http-status'].index.get()
		expect(error).toBeNull()
		expect(data).toEqual(htmlCodes)
	})

	it('should return a range of HTTP status codes', async () => {
		const { data, error } = await api['http-status']['2xx'].index.get()
		expect(error).toBeNull()
		expect(data).toEqual({
			range: "2xx",
			codes: htmlCodes['2xx'].codes
		})
	})

	it('should return a specific HTTP status code', async () => {
		const { data, error } = await api['http-status'][200].index.get()
		expect(error).toBeNull()
		expect(data).toEqual({
			code: 200,
			name: "OK",
			description: "Standard response for successful HTTP requests."
		})
	})
})