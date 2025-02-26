// src/routes/hashText.ts
import { Elysia, t } from 'elysia'
import crypto from 'crypto'

// Helper function to hash text
function hashText(text: string, algorithm: string, encoding: string): string {
	const hash = crypto.createHash(algorithm);
	hash.update(text);

	// Handle Base2 encoding (not directly supported by Node.js)
	if (encoding === "base2") {
		return [...hash.digest()].map((byte) => byte.toString(2).padStart(8, "0")).join("");
	}

	// Map encoding values for compatibility with Node.js
	const digestEncoding =
		encoding === "base64url"
			? "base64"
			: encoding === "base16"
				? "hex"
				: encoding;
	const digest = hash.digest(digestEncoding as crypto.BinaryToTextEncoding);

	// Post-process Base64 URL-safe encoding
	return encoding === "base64url"
		? digest.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
		: digest;
}

export const hashTextRoute = new Elysia()
	.post("/hash-text", ({ body }) => {
		const { text, algorithm = "sha256", encoding = "base16" } = body;
		const hashedText = hashText(text, algorithm, encoding);
		return { algorithm, encoding, hashedText };
	}, {
		body: t.Object({
			text: t.String({ minLength: 1 }),
			algorithm: t.Optional(t.String({
				default: "sha256",
				pattern: "^(md5|sha1|sha256|sha224|sha512|sha384|ripemd160)$",
			})),
			encoding: t.Optional(t.String({
				default: "base16",
				pattern: "^(base2|base16|base64|base64url)$",
			})),
		}),
		detail: {
			tags: ['Crypto']
		}
	})