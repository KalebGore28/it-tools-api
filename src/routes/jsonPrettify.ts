// src/routes/jsonPrettify.ts
import { Elysia, t } from 'elysia'

export const jsonPrettifyRoute = new Elysia()
	.post("/json-prettify", ({ body }) => {
		const { json, indent = 2 } = body;
		let parsedJson;

		// If the provided json is a string, parse it first.
		if (typeof json === "string") {
			try {
				parsedJson = JSON.parse(json);
			} catch (error) {
				return new Response(JSON.stringify({
					status: 400,
					type: "validation",
					on: "json",
					message: "Invalid JSON input"
				}), { status: 400, headers: { "Content-Type": "application/json" } });
			}
		} else {
			parsedJson = json;
		}

		// Ensure response is wrapped in an object with "pretty" key
		return {
			pretty: JSON.stringify(parsedJson, null, indent)
		};
	}, {
		body: t.Object({
			json: t.Any(),
			indent: t.Optional(
				t.Number({ default: 2, minimum: 0, maximum: 10 })
			),
		}),
		detail: {
			tags: ['Development']
		}
	});