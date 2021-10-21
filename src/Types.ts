
import {StackScreenProps} from "@react-navigation/stack";

export interface InitialState {
  pictures: Array<Picture>,
  isFetching: boolean,
  error: string
}

export interface Picture {
  id: string,
  src: {
    tiny: string,
    original: string
  },
  favourite: boolean
}

export type TaskAction = AddPicturesAction
                       | FetchPicturesAction
                       | Error
                       | ToggleFavorite
                       | DeletePicture

export enum ActionTypes {
  ADD_PICTURES = 'ADD_PICTURES',
  FETCH_PICTURES = 'FETCH_PICTURES',
  TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
  DELETE_PICTURE = 'DELETE_PICTURE',
  ERROR = 'ERROR'
}

export interface AddPicturesAction {
  type: ActionTypes.ADD_PICTURES,
  data: []
}

export interface FetchPicturesAction {
  type: ActionTypes.FETCH_PICTURES
}

export interface ToggleFavorite {
  type: ActionTypes.TOGGLE_FAVORITE,
  data: string
}

export interface DeletePicture {
  type: ActionTypes.DELETE_PICTURE,
  data: string
}

export interface Error {
  type: ActionTypes.ERROR,
  data: string
}

export type RootStackParamList = {
  List: undefined;
  PictureScreen: { item: Picture };
};

type ListProps = StackScreenProps<RootStackParamList, 'List'>;
type PictureProps = StackScreenProps<RootStackParamList, 'PictureScreen'>;

export type ListScreenNavigationProp = ListProps['navigation'];

export type PictureScreenRouteProp = PictureProps['route'];
export type PictureScreenNavigationProp = PictureProps['navigation'];

