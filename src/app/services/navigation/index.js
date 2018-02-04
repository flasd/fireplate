const history = require('history');

const myHistory = process.env.BUILD_TARGET !== 'node' ?
    history.createBrowserHistory() : history.createMemoryHistory();

export const { listen } = myHistory;
export const { push } = myHistory;
export const { replace } = myHistory;
export const { go } = myHistory;
export const { goBack } = myHistory;
export const { goForward } = myHistory;
export const { canGo } = myHistory;

export default myHistory;
