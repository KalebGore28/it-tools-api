// src/app.ts
import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import logixlysia from 'logixlysia'

// Import Routes
import { staticRoutes } from './routes/staticRoutes'
import { base64Route } from './routes/base64'
import { binaryConverterRoute } from './routes/binaryConverter'
import { caseConverterRoute } from './routes/caseConverter'
import { colorConverterRoute } from './routes/colorConverter'
import { dateConverterRoute } from './routes/dateConverter'
import { deviceInfoRoute } from './routes/deviceInfo'
import { dockerRoute } from './routes/docker'
import { hashTextRoute } from './routes/hashText'
import { htmlEntitiesEscaperRoute } from './routes/htmlEntitiesEscaper'
import { httpStatusRoute } from './routes/httpStatus'
import { jsonPrettifyRoute } from './routes/jsonPrettify'
import { loremGeneratorRoute } from './routes/loremGenerator'
import { rsaKeyGeneratorRoute } from './routes/rsaKeyGenerator'
import { slugifyRoute } from './routes/slugify'
import { textDiffRoute } from './routes/textDiff'
import { tokenGeneratorRoute } from './routes/tokenGenerator'
import { ulidGeneratorRoute } from './routes/ulidGenerator'
import { htmlEncoderRoute } from './routes/htmlEncoder'
import { urlEncoderRoute } from './routes/urlEncoder'
import { urlParserRoute } from './routes/urlParser'
import { uuidGeneratorRoute } from './routes/uuidGenerator'

// Create Elysia App
export const app = new Elysia({ aot: false })
    .use(
        // @ts-ignore
        logixlysia({
            config: {
                showStartupMessage: true,
                startupMessageFormat: 'simple',
                timestamp: {
                    translateTime: 'yyyy-mm-dd HH:MM:ss'
                },
                ip: true,
                customLogFormat:
                    '{now} {level} {duration} {method} {pathname} {status} {message} {ip} {epoch}',
            }
        })
    )
    .use(swagger({
        path: '/docs',
        documentation: {
            info: {
                title: 'IT-Tools API',
                version: '1.0.0',
            },
            tags: [
                { name: 'App', description: 'General endpoints' },
                { name: 'Converter', description: 'Converter endpoints' },
                { name: 'Crypto', description: 'Crypto endpoints' },
                { name: 'Development', description: 'Development endpoints' },
                { name: 'Text', description: 'Text endpoints' },
                { name: 'Web', description: 'Web endpoints' },
            ]
        }
    }))
    .use(base64Route)
    .use(binaryConverterRoute)
    .use(caseConverterRoute)
    .use(colorConverterRoute)
    .use(dateConverterRoute)
    .use(deviceInfoRoute)
    .use(dockerRoute)
    .use(hashTextRoute)
    .use(htmlEntitiesEscaperRoute)
    .use(httpStatusRoute)
    .use(jsonPrettifyRoute)
    .use(loremGeneratorRoute)
    .use(rsaKeyGeneratorRoute)
    .use(slugifyRoute)
    .use(textDiffRoute)
    .use(tokenGeneratorRoute)
    .use(ulidGeneratorRoute)
    .use(htmlEncoderRoute)
    .use(urlEncoderRoute)
    .use(urlParserRoute)
    .use(uuidGeneratorRoute)
    .use(staticRoutes)