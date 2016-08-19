import { combineReducers } from 'redux';
import ArcanaReducer from './reducer_arcana';

const rootReducer = combineReducers({
  arcana: ArcanaReducer
});

export default rootReducer;
