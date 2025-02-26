import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { dockerRoute } from '../../src/routes/docker'

const api = treaty(dockerRoute)

describe('Docker', () => {
	it('should convert Docker run command to Compose file', async () => {
		const { data, error } = await api.docker.composerize.post({
			dockerRunCommand: "docker run -d -p 80:80 nginx",
			existingComposeConfig: ""
		})
		expect(error).toBeNull()
		expect(data).toEqual("name: <your project name>\nservices:\n    nginx:\n        ports:\n            - 80:80\n        image: nginx")
	})

	it('should convert Compose file to Docker run command', async () => {
		const { data, error } = await api.docker.decomposerize.post({
			dockerCompose: "version: '3'\n\nservices:\n  nginx:\n    image: nginx\n    ports:\n      - '80:80'",
			configuration: {
				command: 'docker run',
				rm: false,
				detach: false,
				multiline: false,
				'long-args': false,
				'arg-value-separator': ' '
			}
		})
		expect(error).toBeNull()
		expect(data).toEqual('docker run -p 80:80 nginx')
	})
})