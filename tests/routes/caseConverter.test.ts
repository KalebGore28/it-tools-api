import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { caseConverterRoute } from '../../src/routes/caseConverter'

const api = treaty(caseConverterRoute)

describe('Case Converter', () => {
	it('should convert text to lowercase', async () => {
		const { data, error } = await api['case-converter'].post({
			text: "Hello World!"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			lowercase: "hello world!",
			uppercase: "HELLO WORLD!",
			camelcase: "helloWorld!",
			capitalcase: "Hello World!",
			constantcase: "HELLO_WORLD!",
			dotcase: "hello.world!",
			headercase: "Hello-World!",
			paramcase: "hello-world!",
			pascalcase: "HelloWorld!",
			pathcase: "hello/world!",
			sentencecase: "Hello world!",
			snakecase: "hello_world!",
			mockingcase: "hElLo wOrLd!"
		})
	})
})