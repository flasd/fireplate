import fs from 'mz/fs';
import path from 'path';
import serialize from 'serialize-javascript';

const resolve = partial => path.resolve(process.cwd(), partial);

export default async function serveAppShell(request, response) {
    try {
        const htmlCanvas = await fs.readFile(resolve('./template.html'));
        const markup = htmlCanvas.toString().replace('<title></title>', 'Fireplate App Shell')
            .replace('<!-- ::META:: -->', '')
            .replace('<!-- ::APP:: -->', '')
            .replace('/* ::ASYNC_STATE:: */', serialize({ resolved: {} }))
            .replace('/* ::REDUX_STATE:: */', serialize({}));

        response.send(markup);
    } catch (error) {
        console.error('Error while trying to get HTML template.\n', error);
        response.status(500).end();
    }
}
