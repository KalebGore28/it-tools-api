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

export const dateConverterRoute = new Elysia({ prefix: '/date-converter' })
	.get('/', () => {
		const currentDate = new Date();
		const formats = convertDateFormats(currentDate);
		return formats;
	}, {
		detail: {
			summary: 'Convert current date to various formats',
			description: 'Converts the current date to various date and time formats.',
			operationId: 'convertCurrentDate',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Date formats',
					content: {
						'application/json': {
							example: {
								jsLocaleString: 'Wed Sep 01 2021 12:00:00 GMT-0700 (Pacific Daylight Time)',
								iso8601: '2021-09-01T19:00:00.000Z',
								iso9075: '2021-09-01 19:00:00',
								rfc3339: '2021-09-01T19:00:00.000Z',
								rfc7231: 'Wed, 01 Sep 2021 19:00:00 GMT',
								unixTimestamp: 1630520400,
								timestamp: 1630520400000,
								utcFormat: 'Wed, 01 Sep 2021 19:00:00 GMT',
								mongoObjectId: '612f6f100000000000000000',
								excelDateTime: '44405.7916666667',
							},
						},
					},
				},
			}
		}
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
		detail: {
			summary: 'Convert date to various formats',
			description: 'Converts the input date to various date and time formats.',
			operationId: 'convertDate',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Date formats',
					content: {
						'application/json': {
							example: {
								jsLocaleString: 'Wed Sep 01 2021 12:00:00 GMT-0700 (Pacific Daylight Time)',
								iso8601: '2021-09-01T19:00:00.000Z',
								iso9075: '2021-09-01 19:00:00',
								rfc3339: '2021-09-01T19:00:00.000Z',
								rfc7231: 'Wed, 01 Sep 2021 19:00:00 GMT',
								unixTimestamp: 1630520400,
								timestamp: 1630520400000,
								utcFormat: 'Wed, 01 Sep 2021 19:00:00 GMT',
								mongoObjectId: '612f6f100000000000000000',
								excelDateTime: '44405.7916666667',
							},
						},
					},
				},
			}
		}
	})