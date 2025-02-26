import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { jsonPrettifyRoute } from '../../src/routes/jsonPrettify'

const api = treaty(jsonPrettifyRoute)

describe('JSON Prettify', () => {
	it('should pretty-print JSON with default indent', async () => {
		const { data, error } = await api['json-prettify'].post({
			json: { key: "value" }
		})
		expect(error).toBeNull()
		expect(data).toEqual({ pretty: '{\n  "key": "value"\n}' })
	})

	it('should pretty-print JSON with custom indent', async () => {
		const { data, error } = await api['json-prettify'].post({
			json: { key: "value" },
			indent: 4
		})
		expect(error).toBeNull()
		expect(data).toEqual({ pretty: '{\n    "key": "value"\n}' })
	})

	it('should return an error for invalid JSON input', async () => {
		const { data, error } = await api['json-prettify'].post({
			json: "invalid json"
		});
	
		expect(data).toBeNull();
		expect(error?.value).toEqual({  // Extract 'value' where the actual error is stored
			// @ts-ignore
			status: 400,
			type: "validation",
			on: "json",
			message: "Invalid JSON input"
		});
	});
})