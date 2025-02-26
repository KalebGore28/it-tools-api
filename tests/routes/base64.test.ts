import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { base64Route } from '../../src/routes/base64'

const api = treaty(base64Route)

describe('Base64', () => {
	it('should encode text to URL-safe Base64', async () => {
		// Encoding "hello" to URL-safe Base64 which is "aGVsbG8"
		const { data, error } = await api.base64.encode.post({
			text: "hello",
			urlSafe: true
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			encoded: "aGVsbG8", // no "=" padding since it's URL-safe
			urlSafe: true
		})
	})

	it('should encode text to standard Base64', async () => {
		// Encoding "hello" to standard Base64 which is "aGVsbG8="
		const { data, error } = await api.base64.encode.post({
			text: "hello",
			urlSafe: false
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			encoded: "aGVsbG8=", // "=" padding is present
			urlSafe: false
		})
	})

	it('should decode URL-safe Base64 encoded text', async () => {
		// Decoding the URL-safe encoding of "hello" which is "aGVsbG8"
		const { data, error } = await api.base64.decode.post({
			encoded: "aGVsbG8",
			urlSafe: true
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			decoded: "hello",
			urlSafe: true
		})
	})

	it('should decode standard Base64 encoded text', async () => {
		// Decoding the standard encoding of "hello" which is "aGVsbG8="
		const { data, error } = await api.base64.decode.post({
			encoded: "aGVsbG8=",
			urlSafe: false
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			decoded: "hello",
			urlSafe: false
		})
	})
})