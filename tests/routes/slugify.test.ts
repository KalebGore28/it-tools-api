import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { slugifyRoute } from '../../src/routes/slugify'

const api = treaty(slugifyRoute)

describe('Slugify', () => {
	it('should slugify a text string', async () => {
		const { data, error } = await api.slugify.post({
			text: "Hello, World!"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			slug: "hello-world"
		})
	})

	it('should slugify a text string with special characters', async () => {
		const { data, error } = await api.slugify.post({
			text: "Hello, World! This is a test."
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			slug: "hello-world-this-is-a-test"
		})
	})

	it('should slugify a text string with multiple spaces', async () => {
		const { data, error } = await api.slugify.post({
			text: "Hello,    World!"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			slug: "hello-world"
		})
	})

	it('should slugify a text string with leading and trailing spaces', async () => {
		const { data, error } = await api.slugify.post({
			text: "   Hello, World!   "
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			slug: "hello-world"
		})
	})
})