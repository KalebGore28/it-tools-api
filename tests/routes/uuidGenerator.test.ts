import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { uuidGeneratorRoute } from '../../src/routes/uuidGenerator'

const api = treaty(uuidGeneratorRoute)

describe('UUID Generator', () => {
	it('should generate a v4 UUID', async () => {
		const { data, error } = await api['uuid-generator'].post({
			version: 'v4'
		})
		expect(error).toBeNull()
		expect(data).toHaveProperty('version', 'v4')
		expect(data).toHaveProperty('quantity', 1)
		expect(data?.uuids).toHaveLength(1)
		expect(data?.uuids?.[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
	})

	it('should generate multiple v4 UUIDs', async () => {
		const { data, error } = await api['uuid-generator'].post({
			version: 'v4',
			quantity: 5
		})
		expect(error).toBeNull()
		expect(data).toHaveProperty('version', 'v4')
		expect(data).toHaveProperty('quantity', 5)
		expect(data?.uuids).toHaveLength(5)
		data?.uuids?.forEach(uuid => {
			expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
		})
	})

	it('should generate a v1 UUID', async () => {
		const { data, error } = await api['uuid-generator'].post({
			version: 'v1'
		})
		expect(error).toBeNull()
		expect(data).toHaveProperty('version', 'v1')
		expect(data).toHaveProperty('quantity', 1)
		expect(data?.uuids).toHaveLength(1)
		expect(data?.uuids?.[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
	})

	it('should generate a v3 UUID', async () => {
		const { data, error } = await api['uuid-generator'].post({
			version: 'v3',
			namespace: 'DNS',
			name: 'example.com'
		})
		expect(error
		).toBeNull()
		expect(data).toHaveProperty('version', 'v3')
		expect(data).toHaveProperty('quantity', 1)
		expect(data?.uuids).toHaveLength(1)
		expect(data?.uuids?.[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
	})

	it('should generate a v5 UUID', async () => {
		const { data, error } = await api['uuid-generator'].post({
			version: 'v5',
			namespace: 'DNS',
			name: 'example.com'
		})
		expect(error).toBeNull()
		expect(data).toHaveProperty('version', 'v5')
		expect(data).toHaveProperty('quantity', 1)
		expect(data?.uuids).toHaveLength(1)
		expect(data?.uuids?.[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
	})

	it('should return an error if namespace and name are not provided for v3 UUID', async () => {
		const { data, error, response } = await api['uuid-generator'].post({
			version: 'v3'
		});
		expect(response.status).toBe(400);
		expect(error?.value).toEqual({
			// @ts-ignore
			error: 'Namespace and name are required for v3/v5 UUIDs'
		});
	});

	it('should generate a nil UUID', async () => {
		const { data, error } = await api['uuid-generator'].post({
			version: 'nil'
		})
		expect(error).toBeNull()
		expect(data).toHaveProperty('version', 'nil')
		expect(data).toHaveProperty('quantity', 1)
		expect(data?.uuids).toHaveLength(1)
		expect(data?.uuids?.[0]).toEqual('00000000-0000-0000-0000-000000000000')
	})
})