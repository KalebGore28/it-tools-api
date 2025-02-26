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
			tags: ['Converter']
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
			tags: ['Converter']
		}
	})