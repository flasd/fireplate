import ssrializeError from 'serialize-error';
// import { database } from '../firebase';

// const errorReference = database().ref('private/errors');

export function report(err) {
    const seErr = ssrializeError(err);
    // errorReference.push(seErr);
    return err;
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
