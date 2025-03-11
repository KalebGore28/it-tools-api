// src/routes/docker.ts 
import { Elysia, t } from 'elysia'
const composerize = require('composerize');
const decomposerize = require('decomposerize');

export const dockerRoute = new Elysia({ prefix: '/docker' })
    .post('/composerize', ({ body }) => {
        const { dockerRunCommand, existingComposeConfig } = body;

        // Convert the Docker run command to a Compose file
        const composeFile = composerize(dockerRunCommand, existingComposeConfig);

        return composeFile;
    }, {
        body: t.Object({
            dockerRunCommand: t.String(),
            existingComposeConfig: t.String({ default: '' }),
        }),
        detail: {
            summary: 'Convert Docker run command to Compose file',
            description: 'Converts a Docker run command to a Compose file, optionally using an existing Compose file as a base.',
            operationId: 'composerizeDocker',
            tags: ['Development'],
            responses: {
                200: {
                    description: 'Docker Compose file',
                    content: {
                        'text/plain': {
                            example: 'name: <your project name>\nservices:\n    myimage:\n        ports:\n            - 8080:80\n        image: myimage:latest',
                        },
                    },
                },
                // In case of invalid input
                //returns: must have at least a valid docker run/create/service create/container run command
                400: {
                    description: 'Invalid input',
                    content: {
                        'text/plain': {
                            example: 'must have at least a valid docker run/create/service create/container run command'
                        }
                    }
                }
            }
        }
    })
    .post('/decomposerize', ({ body }) => {
        const { dockerCompose, configuration } = body;

        // Convert the Compose file to a Docker run command
        const dockerRunCommand = decomposerize(dockerCompose, configuration);

        return dockerRunCommand;
    }, {
        body: t.Object({
            dockerCompose: t.String(),
            configuration: t.Object({
                command: t.String({ default: 'docker run' }),
                rm: t.Boolean({ default: false }),
                detach: t.Boolean({ default: false }),
                multiline: t.Boolean({ default: false }),
                'long-args': t.Boolean({ default: false }),
                'arg-value-separator': t.String({ default: ' ' }),
            })
        }),
        detail: {
            summary: 'Convert Compose file to Docker run command',
            description: 'Converts a Compose file to a Docker run command, optionally using a configuration object to customize the output.',
            operationId: 'decomposerizeDocker',
            tags: ['Development'],
            responses: {
                200: {
                    description: 'Docker run command',
                    content: {
                        'application/json': {
                            example: 'docker run --rm -d -p 8080:80 myimage:latest',
                        },
                    },
                },
            }
        }
    });
