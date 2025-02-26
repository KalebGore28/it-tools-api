import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { htmlEntitiesEscaperRoute } from '../../src/routes/htmlEntitiesEscaper'

const api = treaty(htmlEntitiesEscaperRoute)

describe('HTML Entities Escaper', () => {
	it('should escape special HTML characters to HTML entities', async () => {
		const { data, error } = await api['html-entities-escaper'].escape.post({
			text: "<script>alert('XSS')</script>"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			escaped: "&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;"
		})
	})

	it('should unescape HTML entities back to normal text', async () => {
		const { data, error } = await api['html-entities-escaper'].unescape.post({
			escaped: "&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			text: "<script>alert('XSS')</script>"
		})
	})
})