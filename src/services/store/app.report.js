import reporter from 'redux-reporter';
import { report } from '../reporter';

export default reporter((action, getState) => {
    if (action.error) {
        report(action.payload, getState());
    }
});
