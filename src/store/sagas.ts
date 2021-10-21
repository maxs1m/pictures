import {ActionTypes} from "../Types";
import { call, put, takeEvery } from 'redux-saga/effects'
import {picturesAPI} from "../api/api";

function* fetchPictures ():Generator {
  try {
    const pictures = yield call(picturesAPI.getPictures);
    yield put({type: ActionTypes.ADD_PICTURES, data: pictures});
  } catch (err) {
    yield put({type: ActionTypes.ERROR, data: err});
  }
}

function* mySaga () {
  yield takeEvery(ActionTypes.FETCH_PICTURES , fetchPictures) ;
}

export default mySaga;