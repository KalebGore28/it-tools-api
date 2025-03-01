import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static'
import { indexHtml, notFoundHtml, serverErrorHtml } from '../data/staticHtmls';

export const staticRoutes = new Elysia({
    detail: {
        tags: ['App']
    }
})
    .use(staticPlugin())
    .get('/', () => {
        return new Response(indexHtml, { headers: { 'Content-Type': 'text/html' } });
    })
    .get('*', () => {
        return new Response(notFoundHtml, { headers: { 'Content-Type': 'text/html' } });
    })
    .onError(() => {
        return new Response(serverErrorHtml, { headers: { 'Content-Type': 'text/html' } });
    });
