import { Elysia, t } from 'elysia';
import { v1, v3, v4, v5, NIL } from 'uuid';

const wellKnownNamespaces: Record<string, string> = {
	DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
	URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
	OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
	X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
};

export const uuidGeneratorRoute = new Elysia()
	.post('/uuid-generator', ({ body }) => {
		const { version = 'v4', quantity = 1, namespace = '', name = '' } = body;

		// For v3 and v5, ensure both namespace and name are provided.
		if ((version === 'v3' || version === 'v5') && (!namespace || !name)) {
			return new Response(JSON.stringify({
				error: 'Namespace and name are required for v3/v5 UUIDs'
			}), { status: 400, headers: { "Content-Type": "application/json" } });
		}

		let uuids: string[] = [];
		switch (version) {
			case 'nil':
				uuids = [NIL];
				break;
			case 'v1':
				uuids = [v1()];
				break;
			case 'v3': {
				const ns = wellKnownNamespaces[namespace] || namespace;
				uuids = [v3(name, ns)];
				break;
			}
			case 'v4':
				// Generate as many v4 UUIDs as specified in quantity.
				uuids = Array.from({ length: quantity }, () => v4());
				break;
			case 'v5': {
				const ns = wellKnownNamespaces[namespace] || namespace;
				uuids = [v5(name, ns)];
				break;
			}
			default:
				return { error: 'Invalid UUID version' };
		}

		return { version, quantity: uuids.length, uuids };
	}, {
		body: t.Object({
			version: t.Optional(
				t.String({
					pattern: '^(nil|v1|v3|v4|v5)$',
					default: 'v4',
				})
			),
			quantity: t.Optional(
				t.Number({
					minimum: 1,
					maximum: 100,
					default: 1,
				})
			),
			// Accept a well-known namespace identifier or a valid UUID string.
			namespace: t.Optional(
				t.String({
					pattern: '^(DNS|URL|OID|X500|[0-9a-fA-F-]{36})$',
					default: '', // optional for versions that don't require it
				})
			),
			name: t.Optional(
				t.String({
					default: '', // optional for versions that don't require it
				})
			),
		}),
		detail: {
			summary: 'Generate UUID',
			description: 'Generate one or more UUIDs of the specified version.',
			operationId: 'generateUUID',
			tags: ['Crypto'],
			responses: {
				200: {
					description: 'Generated UUIDs',
					content: {
						'application/json': {
							example: {
								version: 'v4',
								quantity: 3,
								uuids: [
									'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4c3f',
									'2c9e592c-0b9c-4f3c-9e0d-6b1a5c7f8d0f',
									'3d4e5e6d-7d8c-4b3a-9c0d-1b2a3c4d5e6f',
								],
							},
						},
					},
				},
				400: {
					description: 'Invalid UUID version or missing namespace/name',
					content: {
						'application/json': {
							example: {
								error: 'Namespace and name are required for v3/v5 UUIDs'
							}
						},
					},
				},
			},
		}
	});