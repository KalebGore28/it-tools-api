// src/routes/caseConverter.ts
import { Elysia, t } from 'elysia'

// Utility functions for transformations
const toCamelCase = (str: string): string =>
	str
		.replace(/([-_\s]+[a-z])/g, (group) => group.toUpperCase())
		.replace(/[-_\s]/g, '')
		.replace(/^./, (match) => match.toLowerCase());

const toCapitalCase = (str: string): string =>
	str
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase());

const toConstantCase = (str: string): string => str.toUpperCase().replace(/\s+/g, '_');

const toDotCase = (str: string): string => str.toLowerCase().replace(/\s+/g, '.');

const toHeaderCase = (str: string): string =>
	str
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase())
		.replace(/\s+/g, '-');

const toParamCase = (str: string): string => str.toLowerCase().replace(/\s+/g, '-');

const toPascalCase = (str: string): string =>
	str
		.replace(/(\w)(\w*)/g, (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase())
		.replace(/[-_\s]/g, '');

const toPathCase = (str: string): string => str.toLowerCase().replace(/\s+/g, '/');

const toSentenceCase = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const toSnakeCase = (str: string): string => str.toLowerCase().replace(/\s+/g, '_');

const toMockingCase = (str: string): string =>
	str
		.split('')
		.map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
		.join('');

export const caseConverterRoute = new Elysia()
	.post('/case-converter', ({ body }) => {
		const { text } = body;

		const transformations = {
			lowercase: text.toLowerCase(),
			uppercase: text.toUpperCase(),
			camelcase: toCamelCase(text),
			capitalcase: toCapitalCase(text),
			constantcase: toConstantCase(text),
			dotcase: toDotCase(text),
			headercase: toHeaderCase(text),
			paramcase: toParamCase(text),
			pascalcase: toPascalCase(text),
			pathcase: toPathCase(text),
			sentencecase: toSentenceCase(text),
			snakecase: toSnakeCase(text),
			mockingcase: toMockingCase(text),
		};

		return transformations;
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 })
		}),
		detail: {
			summary: 'Convert text to different case formats',
			description: 'Converts text to various case formats such as camelCase, snake_case, PascalCase, etc.',
			operationId: 'convertCase',
			tags: ['Converter'],
			responses: {
				200: {
					description: 'Text converted to different case formats',
					content: {
						'application/json': {
							example: {
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
							  }
						},
					},
				},
			}
		}
	});