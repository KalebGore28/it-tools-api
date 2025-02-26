import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { htmlEncoderRoute } from '../../src/routes/htmlEncoder'

const api = treaty(htmlEncoderRoute)

describe('HTML Encoder', () => {
	it('should encode text to HTML Unicode Code Points', async () => {
		// Encoding "hello" to HTML Unicode Code Points which is "&#104;&#101;&#108;&#108;&#111;"
		const { data, error } = await api['html-encoder'].encode.post({
			text: "hello"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			html: "&#104;&#101;&#108;&#108;&#111;"
		})
	})

	it('should decode HTML Unicode Code Points to text', async () => {
		// Decoding the HTML Unicode Code Points of "hello" which is "&#104;&#101;&#108;&#108;&#111;"
		const { data, error } = await api['html-encoder'].decode.post({
			html: "&#104;&#101;&#108;&#108;&#111;"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			text: "hello"
		})
	})
})