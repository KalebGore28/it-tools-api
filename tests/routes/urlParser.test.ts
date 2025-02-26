import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { urlParserRoute } from '../../src/routes/urlParser'

const api = treaty(urlParserRoute)

describe('URL Parser', () => {
	it('should parse a URL', async () => {
		// Parsing the URL "https://username:password@hostname:8080/path?query=value#hash"
		const { data, error } = await api['url-parser'].post({
			url: "https://username:password@hostname:8080/path?query=value#hash"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			protocol: "https:",
			username: "username",
			password: "password",
			hostname: "hostname",
			port: "8080",
			path: "/path",
			params: {
				query: "value"
			},
			hash: "#hash"
		})
	})
})