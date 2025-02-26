import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { ulidGeneratorRoute } from '../../src/routes/ulidGenerator'

const api = treaty(ulidGeneratorRoute)

describe('ULID Generator', () => {
	it('should generate a single ULID', async () => {
		const { data, error } = await api['ulid-generator'].post({})
		expect(error).toBeNull()
		expect(data).toEqual({
			quantity: 1,
			ulids: [expect.stringMatching(/[0-9A-Z]{26}/)]
		})
	})

	it('should generate multiple ULIDs', async () => {
		const { data, error } = await api['ulid-generator'].post({ quantity: 5 })
		expect(error).toBeNull()
		expect(data).toEqual({
			quantity: 5,
			ulids: [
				expect.stringMatching(/[0-9A-Z]{26}/),
				expect.stringMatching(/[0-9A-Z]{26}/),
				expect.stringMatching(/[0-9A-Z]{26}/),
				expect.stringMatching(/[0-9A-Z]{26}/),
				expect.stringMatching(/[0-9A-Z]{26}/)
			]
		})
	})
})