import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { colorConverterRoute } from '../../src/routes/colorConverter'

const api = treaty(colorConverterRoute)

describe('Color Converter', () => {
	it('should return a list of color names', async () => {
		const { data, error } = await api['color-converter']['color-names'].get()
		expect(error).toBeNull()
		// A lot of data, so just check the length
		expect(data).not.toBeNull()
		expect(Object.keys(data!).length).toBeGreaterThan(0)
	})

	it('should convert a color name to its HEX value', async () => {
		const { data, error } = await api['color-converter'].index.post({
			color: 'red'
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			hex: '#FF0000',
			rgb: 'rgb(255, 0, 0)',
			hsl: 'hsl(0, 100%, 50%)',
			hwb: 'hwb(0 0 0)',
			lch: 'lch(53.23288178584245 104.57551843993618 40.00015790646365)',
			cmyk: 'device-cmyk(0% 100% 100% 0)',
			name: 'red'
		})
	})

	it('should convert a HEX color to its color name', async () => {
		const { data, error } = await api['color-converter'].index.post({
			color: '#ff0000'
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			hex: '#FF0000',
			rgb: 'rgb(255, 0, 0)',
			hsl: 'hsl(0, 100%, 50%)',
			hwb: 'hwb(0 0 0)',
			lch: 'lch(53.23288178584245 104.57551843993618 40.00015790646365)',
			cmyk: 'device-cmyk(0% 100% 100% 0)',
			name: 'red'
		})
	})
})