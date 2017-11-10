import { combineReducers } from 'redux';
import makeUndoable from 'redux-undo';

export default combineReducers({
    home: makeUndoable(s => s, { limit: 5 }),
});
