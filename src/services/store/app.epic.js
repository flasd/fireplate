import { combineEpics } from 'redux-observable';

const exampleEpic = action$ => action$.ofType('HELLO');

export default combineEpics(
    exampleEpic,
);
