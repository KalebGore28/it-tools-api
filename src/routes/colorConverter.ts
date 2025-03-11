// src/routes/colorConverter.ts
import { Elysia, t } from 'elysia'
import Color from 'color';
import nearestColor from 'nearest-color';
import { colornames } from 'color-name-list';

// Create a map of color names to their HEX values
const colors: { [key: string]: string } = colornames.reduce((o, { name, hex }) => Object.assign(o, { [name.toLowerCase()]: hex }), {});
const nearest = nearestColor.from(colors);

export const colorConverterRoute = new Elysia({ prefix: '/color-converter' })
	.get('/color-names', () => {
		return colors;
	}, {
		detail: {
			summary: 'Get color names',
			description: 'Returns a list of color names and their HEX values. This list is massive.',
			operationId: 'getColorNames',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Color names',
					content: {
						'application/json': {
							example: {
								black: '#000000',
								white: '#FFFFFF',
								red: '#FF0000',
								green: '#008000',
								blue: '#0000FF',
								"...": "#...",
							}
						},
					},
				},
			}
		}
	})
	.post('/', ({ body }) => {
		const { color: colorInput } = body;

		// Check if the input is a named color
		const isNamedColor = colorInput.toLowerCase() in colors;

		// Get the color's hex value
		const hex = isNamedColor ? colors[colorInput.toLowerCase()] : colorInput;

		// Create a Color object for further processing
		const color = Color(hex);

		const colorFormats = {
			hex: color.hex(),
			rgb: color.rgb().string(),
			hsl: color.hsl().string(),
			hwb: `hwb(${color.hwb().array().join(' ')})`,
			lch: `lch(${color.lch().array().join(' ')})`,
			cmyk: `device-cmyk(${color.cmyk().array().join('% ')})`,
			name: isNamedColor ? colorInput : nearest(color.hex())?.name,
		};

		return colorFormats;
	}, {
		body: t.Object({
			color: t.String({ minLength: 1 }),
		}),
		detail: {
			summary: 'Convert color',
			description: 'Converts a color to various formats.',
			operationId: 'convertColor',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Color formats',
					content: {
						'application/json': {
							example: {
								hex: '#FF0000',
								rgb: 'rgb(255, 0, 0)',
								hsl: 'hsl(0, 100%, 50%)',
								hwb: 'hwb(0 100% 0%)',
								lch: 'lch(53.2408 104.55 40.0)',
								cmyk: 'device-cmyk(0% 100% 100% 0%)',
								name: 'red',
							}
						},
					},
				},
			}
		}
	})