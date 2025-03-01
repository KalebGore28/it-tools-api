// src/routes/tokenGenerator.ts
import { Elysia, t } from 'elysia'

// Helper function to generate tokens
function generateToken(length: number, options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }): string {
	const charSets = {
		uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		lowercase: "abcdefghijklmnopqrstuvwxyz",
		numbers: "0123456789",
		symbols: "!@#$%^&*()-_=+[]{}|;:',.<>?/`~",
	};

	let availableChars = "";
	if (options.uppercase) availableChars += charSets.uppercase;
	if (options.lowercase) availableChars += charSets.lowercase;
	if (options.numbers) availableChars += charSets.numbers;
	if (options.symbols) availableChars += charSets.symbols;

	if (!availableChars) {
		throw new Error("At least one character option must be enabled.");
	}

	let token = "";
	for (let i = 0; i < length; i++) {
		token += availableChars[Math.floor(Math.random() * availableChars.length)];
	}
	return token;
}

export const tokenGeneratorRoute = new Elysia({
	detail: {
		tags: ['Crypto']
	}
})
	.post('/token-generator', ({ body }) => {
		const { length = 32, uppercase = true, lowercase = true, numbers = true, symbols = false } = body
		const token = generateToken(length, { uppercase, lowercase, numbers, symbols })
		return { length, token }
	}, {
		body: t.Object({
			length: t.Optional(t.Number({ minimum: 1, maximum: 512, default: 32 })),
			uppercase: t.Optional(t.Boolean({ default: true })),
			lowercase: t.Optional(t.Boolean({ default: true })),
			numbers: t.Optional(t.Boolean({ default: true })),
			symbols: t.Optional(t.Boolean({ default: false })),
		}),
	})