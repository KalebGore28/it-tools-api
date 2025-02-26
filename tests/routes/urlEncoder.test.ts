import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { urlEncoderRoute } from '../../src/routes/urlEncoder'

const api = treaty(urlEncoderRoute)

describe('URL Encoder', () => {
	it('should encode text to URL-encoded format', async () => {
		// Encoding "hello world" to URL-encoded format which is "hello%20world"
		const { data, error } = await api['url-encoder'].encode.post({
			text: "hello world"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			encoded: "hello%20world"
		})
	})

	it('should decode URL-encoded text', async () => {
		// Decoding the URL-encoded text "hello%20world" which is "hello world"
		const { data, error } = await api['url-encoder'].decode.post({
			encoded: "hello%20world"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			text: "hello world"
		})
	})
})