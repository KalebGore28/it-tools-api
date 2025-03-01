// src/routes/docker.ts 
import { Elysia, t } from 'elysia'
const composerize = require('composerize');
const decomposerize = require('decomposerize');

export const dockerRoute = new Elysia({
    prefix: '/docker',
    detail: {
        tags: ['Development']
    }
})
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
                command: t.String({ default: '' }),
                rm: t.Boolean({ default: false }),
                detach: t.Boolean({ default: false }),
                multiline: t.Boolean({ default: false }),
                'long-args': t.Boolean({ default: false }),
                'arg-value-separator': t.String({ default: ' ' }),
            })
        }),
    });
