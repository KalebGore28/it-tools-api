import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { loremGeneratorRoute } from '../../src/routes/loremGenerator'

const api = treaty(loremGeneratorRoute)

describe('Lorem Generator', () => {
	it('should generate a single paragraph of Lorem Ipsum text', async () => {
		const { data, error } = await api.lorem.post({
			paragraphs: 1,
			sentencesPerParagraph: 4,
			wordsPerSentence: 4,
			startWithLoremIpsum: true,
			asHtml: false
		})
		expect(error).toBeNull()
		expect(data?.text).toBeDefined()
	})

	it('should generate multiple paragraphs of Lorem Ipsum text', async () => {
		const { data, error } = await api.lorem.post({
			paragraphs: 3,
			sentencesPerParagraph: 3,
			wordsPerSentence: 3,
			startWithLoremIpsum: true,
			asHtml: false
		})
		expect(error).toBeNull()
		expect(data?.text).toBeDefined()
		expect(data?.text).toContain("\n\n")
	})

	it('should generate HTML paragraphs of Lorem Ipsum text', async () => {
		const { data, error } = await api.lorem.post({
			paragraphs: 2,
			sentencesPerParagraph: 2,
			wordsPerSentence: 2,
			startWithLoremIpsum: true,
			asHtml: true
		})
		expect(error).toBeNull()
		expect(data?.text).toBeDefined()
		expect(data?.text).toContain("<p>")
		expect(data?.text).toContain("</p>")
	})
})