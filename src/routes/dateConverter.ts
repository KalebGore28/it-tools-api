// src/routes/dateConverter.ts
import { Elysia, t } from 'elysia'

// Utility function to format a date
const convertDateFormats = (date: Date) => {
	const timestamp = date.getTime(); // Milliseconds since Unix Epoch
	const unixTimestamp = Math.floor(timestamp / 1000); // Seconds since Unix Epoch

	return {
		jsLocaleString: date.toString(),
		iso8601: date.toISOString(),
		iso9075: date.toISOString().replace('T', ' ').split('.')[0], // YYYY-MM-DD HH:mm:ss
		rfc3339: date.toISOString(),
		rfc7231: date.toUTCString(),
		unixTimestamp,
		timestamp,
		utcFormat: date.toUTCString(),
		mongoObjectId: Math.floor(date.getTime() / 1000).toString(16) + '0000000000000000',
		excelDateTime: (timestamp / 86400000 + 25569).toFixed(11), // Excel epoch (days since 1899-12-30)
	};
};

export const dateConverterRoute = new Elysia({
	prefix: '/date-converter',
	detail: {
		tags: ['Converter']
	}
})
	.get('/', () => {
		const currentDate = new Date();
		const formats = convertDateFormats(currentDate);
		return formats;
	})
	.post('/', ({ body }) => {
		const { date: inputDate } = body;
		const date = new Date(inputDate);
		const formats = convertDateFormats(date);
		return formats;
	}, {
		body: t.Object({
			date: t.String({
				minLength: 1,
			}),
		}),
	})