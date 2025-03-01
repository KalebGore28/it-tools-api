// src/routes/loreGenerator.ts
import { Elysia, t } from 'elysia'
import { LoremIpsum } from "lorem-ipsum";

export const loremGeneratorRoute = new Elysia({
	detail: {
		tags: ['Text']
	}
})
	.post("/lorem", ({ body }) => {
		const {
			paragraphs = 1,
			sentencesPerParagraph = 4,
			wordsPerSentence = 4,
			startWithLoremIpsum = true,
			asHtml = false,
		} = body;

		// Create a custom Lorem Ipsum generator based on the request parameters
		const customLorem = new LoremIpsum({
			sentencesPerParagraph: {
				max: sentencesPerParagraph,
				min: sentencesPerParagraph,
			},
			wordsPerSentence: {
				max: wordsPerSentence,
				min: wordsPerSentence,
			},
		});

		// Generate paragraphs
		const paragraphsArray = Array.from({ length: paragraphs }, () =>
			customLorem.generateParagraphs(1)
		);

		// Handle "Lorem ipsum" prefix by appending to the first paragraph
		if (startWithLoremIpsum && paragraphsArray.length > 0) {
			paragraphsArray[0] = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${paragraphsArray[0]}`;
		}

		// Format the response as plain text or HTML
		const responseText = asHtml
			? paragraphsArray.map((p) => `<p>${p}</p>`).join("") // Wrap each paragraph in <p> tags
			: paragraphsArray.join("\n\n"); // Join paragraphs with double newlines for plain text

		return {
			text: responseText,
		};
	}, {
		body: t.Object({
			paragraphs: t.Optional(
				t.Number({ int: true, min: 1, max: 100, default: 1 })
			),
			sentencesPerParagraph: t.Optional(
				t.Number({ int: true, min: 1, max: 10, default: 4 })
			),
			wordsPerSentence: t.Optional(
				t.Number({ int: true, min: 2, max: 20, default: 4 })
			),
			startWithLoremIpsum: t.Optional(
				t.Boolean({ default: true })
			),
			asHtml: t.Optional(
				t.Boolean({ default: false })
			),
		}),
	})