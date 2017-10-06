import HTMLtoJSX from 'htmltojsx';

export default function parseHtml(rawHtml, key) {
    const parser = new HTMLtoJSX({
        createClass: true,
        outputClassName: key,
    });

    return parser.convert(rawHtml);
}