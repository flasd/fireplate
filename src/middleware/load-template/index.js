import fs from 'mz/fs';
import path from 'path';

const resolve = partial => path.resolve(process.cwd(), partial);

export default async function loadTemplate(request, response, next) {
    try {
        const htmlCanvas = await fs.readFile(resolve('./template.html'));
        response.locals.htmlCanvas = htmlCanvas.toString();
        next();
    } catch (error) {
        console.error('Error while trying to get HTML template', error.message);
        response.status(500).end();
    }
}
