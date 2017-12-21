import create from 'history/createBrowserHistory';

const history = create();

export const { listen } = history;
export const { push } = history;
export const { replace } = history;
export const { go } = history;
export const { goBack } = history;
export const { goForward } = history;
export const { canGo } = history;

export default history;
