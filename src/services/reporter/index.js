import serializeError from 'serialize-error';
import serializeJs from 'serialize-javascript';

// import { database } from '../firebase';

// const errorReference = database().ref('private/errors');

export function wrapError(err, inf) {
    return {
        error: serializeError(err),
        info: serializeJs(inf),
    };
}

export function report(error, info) {
    const wrappedErr = wrapError(error, info || undefined);

    // errorReference.push(wrappedErr)
    // .catch(ex => null /* Shit can happen. */);

    return error;
}

export function pipe(fn, ...args) {
    try {
        return fn(...args);
    } catch (err) {
        throw report(err);
    }
}

export function pipeAsync(fn, ...args) {
    return fn(...args).catch(err => Promise.reject(report(err)));
}
