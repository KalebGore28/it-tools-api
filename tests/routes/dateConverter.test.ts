import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { dateConverterRoute } from '../../src/routes/dateConverter'

const api = treaty(dateConverterRoute)

describe('Date Converter', () => {
	it('should convert the current date to various formats', async () => {
		const { data, error } = await api['date-converter'].index.get()
		expect(error).toBeNull()
		expect(data).not.toBeNull()
		expect(data!.jsLocaleString).not.toBeNull()
		expect(data!.iso8601).not.toBeNull()
		expect(data!.iso9075).not.toBeNull()
		expect(data!.rfc3339).not.toBeNull()
		expect(data!.rfc7231).not.toBeNull()
		expect(data!.unixTimestamp).not.toBeNull()
		expect(data!.timestamp).not.toBeNull()
		expect(data!.utcFormat).not.toBeNull()
		expect(data!.mongoObjectId).not.toBeNull()
		expect(data!.excelDateTime).not.toBeNull()
	})

	it('should convert a date to various formats', async () => {
		const { data, error } = await api['date-converter'].index.post({
			date: '2021-01-01T00:00:00Z'
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			jsLocaleString: 'Fri Jan 01 2021 00:00:00 GMT+0000 (Coordinated Universal Time)',
			iso8601: '2021-01-01T00:00:00.000Z',
			iso9075: '2021-01-01 00:00:00',
			rfc3339: '2021-01-01T00:00:00.000Z',
			rfc7231: 'Fri, 01 Jan 2021 00:00:00 GMT',
			unixTimestamp: 1609459200,
			timestamp: 1609459200000,
			utcFormat: 'Fri, 01 Jan 2021 00:00:00 GMT',
			mongoObjectId: '5fee66000000000000000000',
			excelDateTime: '44197.00000000000'
		})
	})
})