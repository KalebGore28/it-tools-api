import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { binaryConverterRoute } from '../../src/routes/binaryConverter'

const api = treaty(binaryConverterRoute)

describe('Binary Converter', () => {
	it('should encode text to binary', async () => {
		// Encoding "hello" to binary which is "01101000 01100101 01101100 01101100 01101111"
		const { data, error } = await api.binary.encode.post({
			text: "hello"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			binary: "01101000 01100101 01101100 01101100 01101111"
		})
	})

	it('should decode binary to text', async () => {
		// Decoding the binary "01101000 01100101 01101100 01101100 01101111" which is "hello"
		const { data, error } = await api.binary.decode.post({
			binary: "01101000 01100101 01101100 01101100 01101111"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			text: "hello"
		})
	})
})