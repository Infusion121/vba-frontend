import { Bookmaker } from '@app/model/bookmaker.model';
import * as BookmakersActions from '../actions/bookmakers.actions';

export interface State {
  bookmakersList: {
    itemsObject: { [key: string]: Bookmaker };
    itemsArray: Bookmaker[];
    itemsCount: number;
    loading: boolean;
    error: any;
  };
}

const initialState: State = {
  bookmakersList: {
    itemsObject: null,
    itemsArray: null,
    itemsCount: null,
    loading: false,
    error: null,
  },
};

export function bookmakersReducer(state: State = initialState, action: BookmakersActions.BookmakersActions) {
  switch (action.type) {
    // load bookmakers list
    case BookmakersActions.GET_BOOKMAKERS_START:
      return {
        ...state,
        bookmakersList: {
          ...state.bookmakersList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: true,
          error: null,
        },
      };
    case BookmakersActions.GET_BOOKMAKERS_SUCCESS:
      return {
        ...state,
        bookmakersList: {
          ...state.bookmakersList,
          itemsObject: action.itemsObject,
          itemsArray: action.itemsArray,
          itemsCount: action.itemsArray.length,
          loading: false,
          error: null as null,
        },
      };
    case BookmakersActions.GET_BOOKMAKERS_FAIL:
      return {
        ...state,
        bookmakersList: {
          ...state.bookmakersList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
}
