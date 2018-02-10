import fs from 'mz/fs';
import path from 'path';

const resolve = partial => path.resolve(process.cwd(), partial);

const templateCache = {
    resolved: false,
};

/**
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {Function} next
 */
export default async function loadTemplate(request, response, next) {
    try {
        if (!templateCache.resolved) {
            const htmlCanvas = await fs.readFile(resolve('./template.html'));
            templateCache.contents = htmlCanvas.toString();
            templateCache.resolved = true;
        }

        response.locals.htmlCanvas = templateCache.contents;
        next();
    } catch (error) {
        console.error('Error while trying to get HTML template', error.message);
        response.status(500).end();
    }
}
