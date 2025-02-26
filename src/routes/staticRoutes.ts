import { Elysia } from 'elysia';
import { indexHtml, notFoundHtml, serverErrorHtml } from '../data/staticHtmls';

export const staticRoutes = new Elysia()
    .get('/', () => {
        return new Response(indexHtml, { headers: { 'Content-Type': 'text/html' } });
    }, {
        detail: {
            tags: ['App']
        }
    })
    .get('*', () => {
        return new Response(notFoundHtml, { headers: { 'Content-Type': 'text/html' } });
    })
    .onError(() => {
        return new Response(serverErrorHtml, { headers: { 'Content-Type': 'text/html' } });
    });
