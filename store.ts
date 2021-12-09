import {createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga'
import pictureReducers from "./reducer";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
  picture: pictureReducers
})
export type ReducerType = ReturnType<typeof reducers>
/*export type AppDispatch = typeof store.dispatch*/
export type GetStateType = typeof store.getState
export type RootState = ReturnType<typeof store.getState>

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export default store