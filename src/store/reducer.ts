import {
  ActionTypes,
  DeletePicture,
  FetchPicturesAction,
  InitialState,
  Picture,
  TaskAction,
  ToggleFavorite
} from "../Types";

const initialState:InitialState = {
  pictures: [],
  isFetching: false,
  error: ''
}

const pictureReducers = (state = initialState, action:TaskAction):InitialState => {
  switch (action.type) {
    case ActionTypes.FETCH_PICTURES:
      return {...state, isFetching: true}
    case ActionTypes.TOGGLE_FAVORITE:
      return {...state, pictures: state.pictures.map((item) => {
          if (item.id === action.data) {
            item.favourite = !item.favourite
          }
          return item
        })}
    case ActionTypes.DELETE_PICTURE:
      const id = state.pictures.findIndex(item => item.id === action.data)
      return {...state, pictures: state.pictures.slice(0, id).concat(state.pictures.slice(id + 1))}
    case ActionTypes.ERROR:
      return {...state, error: action.data}
    case ActionTypes.ADD_PICTURES:
      return {...state, pictures: action.data.map((item:Picture) => ({...item, favourite: false})),  isFetching: false}
    default:
      return state
  }
}

export const fetchPictures = ():FetchPicturesAction => ({type:ActionTypes.FETCH_PICTURES})
export const toggleFavourite = (data:string):ToggleFavorite => ({type:ActionTypes.TOGGLE_FAVORITE, data})
export const deletePicture = (data:string):DeletePicture => ({type:ActionTypes.DELETE_PICTURE, data})

export default pictureReducers