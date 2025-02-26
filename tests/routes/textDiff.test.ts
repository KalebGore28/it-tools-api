import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { textDiffRoute } from '../../src/routes/textDiff'

const api = treaty(textDiffRoute)

describe('Text Diff', () => {
	it('should compute differences between two texts', async () => {
		const { data, error } = await api['text-diff'].post({
			text1: "hello world",
			text2: "hello universe"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			differences: [
				{ value: 'hello ', added: false, removed: false, count: 1 },
				{ value: 'world', added: false, removed: true, count: 1 },
				{ value: 'universe', added: true, removed: false, count: 1 }
			]
		})
	})
})