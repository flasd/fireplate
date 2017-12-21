import serializeError from 'serialize-error';
import serializeJs from 'serialize-javascript';

import {
    ERRORS_REFERENCE,
    LOGS_REFERENCE,
} from '../firebase';

export function reportError(error, message) {
    ERRORS_REFERENCE.push({
        error: serializeError(error),
        message: serializeJs(message),
        timestamp: Date.now() || +new Date(),
    });
}

export function reportInfo(message) {
    LOGS_REFERENCE.push({
        message: serializeJs(message),
        timestamp: Date.now() || +new Date(),
    });
}
