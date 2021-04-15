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
  bookmakerNew: {
    item: Bookmaker;
    loading: boolean;
    error: any;
  };
  bookmakerCurrent: {
    item: Bookmaker;
    loading: boolean;
    error: any;
    update: {
      loading: boolean;
      item: Bookmaker;
      error: any;
    };
  };
  bookmakerDelete: {
    item: Bookmaker;
    loading: boolean;
    error: any;
  };

  uploadBookmakerPhotoFiles: {
    files: File[];
    items: any;
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
  bookmakerNew: {
    item: null,
    loading: false,
    error: null,
  },
  bookmakerCurrent: {
    item: null,
    loading: false,
    error: null,
    update: {
      loading: false,
      item: null,
      error: null,
    },
  },
  bookmakerDelete: {
    item: null,
    loading: false,
    error: null,
  },
  uploadBookmakerPhotoFiles: {
    files: null,
    items: null,
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

    // create new bookmaker
    case BookmakersActions.POST_BOOKMAKER_START:
      return {
        ...state,
        bookmakerNew: {
          ...state.bookmakerNew,
          item: null,
          loading: true,
          error: null,
        },
      };
    case BookmakersActions.POST_BOOKMAKER_SUCCESS:
      return {
        ...state,
        bookmakerNew: {
          ...state.bookmakerNew,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case BookmakersActions.POST_BOOKMAKER_FAIL:
      return {
        ...state,
        bookmakerNew: {
          ...state.bookmakerNew,
          item: null,
          loading: false,
          error: action.payload,
        },
      };
    case BookmakersActions.RESET_POST_BOOKMAKER_STATE:
      return {
        ...state,
        bookmakerNew: {
          ...initialState.bookmakerNew,
        },
      };

    // get bookmaker by id
    case BookmakersActions.GET_BOOKMAKER_BY_ID_START:
      return {
        ...state,
        bookmakerCurrent: {
          ...state.bookmakerCurrent,
          item: null,
          loading: true,
          error: null,
        },
      };
    case BookmakersActions.GET_BOOKMAKER_BY_ID_SUCCESS:
      return {
        ...state,
        bookmakerCurrent: {
          ...state.bookmakerCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case BookmakersActions.GET_BOOKMAKER_BY_ID_FAIL:
      return {
        ...state,
        bookmakerCurrent: {
          ...state.bookmakerCurrent,
          item: null as null,
          loading: false,
          error: action.payload,
        },
      };

    // update bookmaker by id
    case BookmakersActions.PUT_BOOKMAKER_BY_ID_START:
      return {
        ...state,
        bookmakerCurrent: {
          ...state.bookmakerCurrent,
          update: {
            ...state.bookmakerCurrent.update,
            item: null,
            loading: true,
            error: null,
          },
        },
      };
    case BookmakersActions.PUT_BOOKMAKER_BY_ID_SUCCESS:
      return {
        ...state,
        bookmakerCurrent: {
          ...state.bookmakerCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
          update: {
            ...state.bookmakerCurrent.update,
            item: action.payload,
            loading: false,
            error: null as null,
          },
        },
      };
    case BookmakersActions.PUT_BOOKMAKER_BY_ID_FAIL:
      return {
        ...state,
        bookmakerCurrent: {
          ...state.bookmakerCurrent,
          update: {
            ...state.bookmakerCurrent.update,
            item: null,
            loading: false,
            error: action.payload,
          },
        },
      };

    // reset Bookmaker Current state
    case BookmakersActions.RESET_BOOKMAKER_CURRENT_STATE:
      return {
        ...state,
        bookmakerCurrent: {
          ...initialState.bookmakerCurrent,
        },
      };

    // delete bookmaker by id
    case BookmakersActions.DELETE_BOOKMAKER_BY_ID_START:
      return {
        ...state,
        bookmakerDelete: {
          item: null,
          loading: true,
          error: null,
        },
      };
    case BookmakersActions.DELETE_BOOKMAKER_BY_ID_SUCCESS:
      return {
        ...state,
        bookmakerDelete: {
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case BookmakersActions.DELETE_BOOKMAKER_BY_ID_FAIL:
      return {
        ...state,
        bookmakerDelete: {
          item: null,
          loading: false,
          error: action.payload,
        },
      };

    // reset Bookmaker Delete state
    case BookmakersActions.RESET_DELETE_BOOKMAKER_STATE:
      return {
        ...state,
        bookmakerDelete: {
          ...initialState.bookmakerDelete,
        },
      };

    // upload photo files
    case BookmakersActions.UPLOAD_PHOTOS_START:
      return {
        ...state,
        uploadBookmakerPhotoFiles: {
          ...state.uploadBookmakerPhotoFiles,
          files: action.files,
          items: null as null,
          loading: true,
          error: null as null,
        },
      };

    case BookmakersActions.UPLOAD_PHOTOS_SUCCESS:
      return {
        ...state,
        uploadBookmakerPhotoFiles: {
          ...state.uploadBookmakerPhotoFiles,
          files: null as null,
          loading: false,
          items: action.payload.images,
          error: null as null,
        },
      };

    case BookmakersActions.UPLOAD_PHOTOS_FAIL:
      return {
        ...state,
        uploadBookmakerPhotoFiles: {
          ...state.uploadBookmakerPhotoFiles,
          jobId: null as null,
          files: null as null,
          loading: false,
          item: null as null,
          error: action.payload,
        },
      };
    case BookmakersActions.RESET_UPLOAD_PHOTOS_STATE:
      return {
        ...state,
        uploadBookmakerPhotoFiles: {
          ...initialState.uploadBookmakerPhotoFiles,
        },
      };

    default:
      return state;
  }
}
