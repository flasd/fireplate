// @flow

import create from 'history/createBrowserHistory';

const history = create();

export const listen = history.listen;
export const push = history.push;
export const replace = history.replace;
export const go = history.go;
export const goBack = history.goBack;
export const goForward = history.goForward;
export const canGo = history.canGo;

export default history;
