import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { hashTextRoute } from '../../src/routes/hashText'

const api = treaty(hashTextRoute)

describe('Hash Text', () => {
	it('should hash text with default values', async () => {
		// Hashing "hello" with the default algorithm and encoding (SHA-256 and Base16)
		const { data, error } = await api['hash-text'].post({
			text: "hello"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			algorithm: "sha256",
			encoding: "base16",
			hashedText: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
		})
	})

	it('should hash text with custom algorithm and encoding', async () => {
		// Hashing "hello" with the SHA-1 algorithm and Base64 encoding
		const { data, error } = await api['hash-text'].post({
			text: "hello",
			algorithm: "sha1",
			encoding: "base64"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			algorithm: "sha1",
			encoding: "base64",
			hashedText: "qvTGHdzF6KLavt4PO0gs2a6pQ00="
		})
	})

	it('should hash text with Base2 encoding', async () => {
		// Hashing "hello" with the SHA-256 algorithm and Base2 encoding
		const { data, error } = await api['hash-text'].post({
			text: "hello",
			algorithm: "sha256",
			encoding: "base2"
		})
		expect(error).toBeNull()
		expect(data).toEqual({
			algorithm: "sha256",
			encoding: "base2",
			hashedText: "0010110011110010010011011011101001011111101100001010001100001110001001101110100000111011001010101100010110111001111000101001111000011011000101100001111001011100000111111010011101000010010111100111001100000100001100110110001010010011100010111001100000100100"
		})
	})
})