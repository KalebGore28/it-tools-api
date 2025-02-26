import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { tokenGeneratorRoute } from '../../src/routes/tokenGenerator'

const api = treaty(tokenGeneratorRoute)

describe('Token Generator', () => {
	it('should generate a token with default options', async () => {
		const { data, error } = await api['token-generator'].post({})
		expect(error).toBeNull()
		expect(data?.length).toBe(32)
		expect(data?.token).toHaveLength(32)
	})

	it('should generate a token with custom length', async () => {
		const { data, error } = await api['token-generator'].post({
			length: 64
		})
		expect(error).toBeNull()
		expect(data?.length).toBe(64)
		expect(data?.token).toHaveLength(64)
	})

	it('should generate a token with only uppercase letters', async () => {
		const { data, error } = await api['token-generator'].post({
			uppercase: true,
			lowercase: false,
			numbers: false,
			symbols: false
		})
		expect(error).toBeNull()
		expect(data?.token).toMatch(/^[A-Z]+$/)
	})

	it('should generate a token with only lowercase letters', async () => {
		const { data, error } = await api['token-generator'].post({
			uppercase: false,
			lowercase: true,
			numbers: false,
			symbols: false
		})
		expect(error).toBeNull()
		expect(data?.token).toMatch(/^[a-z]+$/)
	})

	it('should generate a token with only numbers', async () => {
		const { data, error } = await api['token-generator'].post({
			uppercase: false,
			lowercase: false,
			numbers: true,
			symbols: false
		})
		expect(error).toBeNull()
		expect(data?.token).toMatch(/^[0-9]+$/)
	})

	it('should generate a token with only symbols', async () => {
		const { data, error } = await api['token-generator'].post({
			uppercase: false,
			lowercase: false,
			numbers: false,
			symbols: true
		})
		expect(error).toBeNull()
		expect(data?.token).toMatch(/^[!@#$%^&*()-_=+\[\]{}|;:',.<>?/`~]+$/)
	})

	it('should throw an error when no character options are enabled', async () => {
		const { data, error } = await api['token-generator'].post({
			uppercase: false,
			lowercase: false,
			numbers: false,
			symbols: false
		})
		expect(data).toBeNull()
		// @ts-ignore
		expect(error?.value).toEqual("At least one character option must be enabled.")
	})
})