import { RingLayout } from '@app/model/ringLayout.model';
import * as RingLayoutsActions from '../actions/ringLayouts.actions';

export interface State {
  ringLayoutsList: {
    itemsObject: { [key: string]: RingLayout };
    itemsArray: RingLayout[];
    itemsCount: number;
    loading: boolean;
    error: any;
  };
  ringLayoutNew: {
    item: RingLayout;
    loading: boolean;
    error: any;
  };
  ringLayoutCurrent: {
    item: RingLayout;
    loading: boolean;
    error: any;
    update: {
      loading: boolean;
      item: RingLayout;
      error: any;
    };
  };
  ringLayoutDelete: {
    item: RingLayout;
    loading: boolean;
    error: any;
  };
  uploadRingLayoutFile: {
    file: File;
    item: any;
    loading: boolean;
    error: any;
  };
}

const initialState: State = {
  ringLayoutsList: {
    itemsObject: null,
    itemsArray: null,
    itemsCount: null,
    loading: false,
    error: null,
  },
  ringLayoutNew: {
    item: null,
    loading: false,
    error: null,
  },
  ringLayoutCurrent: {
    item: null,
    loading: false,
    error: null,
    update: {
      loading: false,
      item: null,
      error: null,
    },
  },
  ringLayoutDelete: {
    item: null,
    loading: false,
    error: null,
  },
  uploadRingLayoutFile: {
    file: null,
    item: null,
    loading: false,
    error: null,
  },
};

export function ringLayoutsReducer(state: State = initialState, action: RingLayoutsActions.RingLayoutsActions) {
  switch (action.type) {
    // load ringlayouts list
    case RingLayoutsActions.GET_RINGLAYOUTS_START:
      return {
        ...state,
        ringLayoutsList: {
          ...state.ringLayoutsList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: true,
          error: null,
        },
      };
    case RingLayoutsActions.GET_RINGLAYOUTS_SUCCESS:
      return {
        ...state,
        ringLayoutsList: {
          ...state.ringLayoutsList,
          itemsObject: action.itemsObject,
          itemsArray: action.itemsArray,
          itemsCount: action.itemsArray.length,
          loading: false,
          error: null as null,
        },
      };
    case RingLayoutsActions.GET_RINGLAYOUTS_FAIL:
      return {
        ...state,
        ringLayoutsList: {
          ...state.ringLayoutsList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: false,
          error: action.payload,
        },
      };

    // create new ring layout
    case RingLayoutsActions.POST_RINGLAYOUT_START:
      return {
        ...state,
        ringLayoutNew: {
          ...state.ringLayoutNew,
          item: null,
          loading: true,
          error: null,
        },
      };
    case RingLayoutsActions.POST_RINGLAYOUT_SUCCESS:
      return {
        ...state,
        ringLayoutNew: {
          ...state.ringLayoutNew,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case RingLayoutsActions.POST_RINGLAYOUT_FAIL:
      return {
        ...state,
        ringLayoutNew: {
          ...state.ringLayoutNew,
          item: null,
          loading: false,
          error: action.payload,
        },
      };
    case RingLayoutsActions.RESET_POST_RINGLAYOUT_STATE:
      return {
        ...state,
        ringLayoutNew: {
          ...initialState.ringLayoutNew,
        },
      };

    // get ring layout by id
    case RingLayoutsActions.GET_RINGLAYOUT_BY_ID_START:
      return {
        ...state,
        ringLayoutCurrent: {
          ...state.ringLayoutCurrent,
          item: null,
          loading: true,
          error: null,
        },
      };
    case RingLayoutsActions.GET_RINGLAYOUT_BY_ID_SUCCESS:
      return {
        ...state,
        ringLayoutCurrent: {
          ...state.ringLayoutCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case RingLayoutsActions.GET_RINGLAYOUT_BY_ID_FAIL:
      return {
        ...state,
        ringLayoutCurrent: {
          ...state.ringLayoutCurrent,
          item: null as null,
          loading: false,
          error: action.payload,
        },
      };

    // update ring layout by id
    case RingLayoutsActions.PUT_RINGLAYOUT_BY_ID_START:
      return {
        ...state,
        ringLayoutCurrent: {
          ...state.ringLayoutCurrent,
          update: {
            ...state.ringLayoutCurrent.update,
            item: null,
            loading: true,
            error: null,
          },
        },
      };
    case RingLayoutsActions.PUT_RINGLAYOUT_BY_ID_SUCCESS:
      return {
        ...state,
        ringLayoutCurrent: {
          ...state.ringLayoutCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
          update: {
            ...state.ringLayoutCurrent.update,
            item: action.payload,
            loading: false,
            error: null as null,
          },
        },
      };
    case RingLayoutsActions.PUT_RINGLAYOUT_BY_ID_FAIL:
      return {
        ...state,
        ringLayoutCurrent: {
          ...state.ringLayoutCurrent,
          update: {
            ...state.ringLayoutCurrent.update,
            item: null,
            loading: false,
            error: action.payload,
          },
        },
      };

    // reset Ring Layout Current state
    case RingLayoutsActions.RESET_RINGLAYOUT_CURRENT_STATE:
      return {
        ...state,
        ringLayoutCurrent: {
          ...initialState.ringLayoutCurrent,
        },
      };

    // delete Ring Layout by id
    case RingLayoutsActions.DELETE_RINGLAYOUT_BY_ID_START:
      return {
        ...state,
        ringLayoutDelete: {
          item: null,
          loading: true,
          error: null,
        },
      };
    case RingLayoutsActions.DELETE_RINGLAYOUT_BY_ID_SUCCESS:
      return {
        ...state,
        ringLayoutDelete: {
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case RingLayoutsActions.DELETE_RINGLAYOUT_BY_ID_FAIL:
      return {
        ...state,
        ringLayoutDelete: {
          item: null,
          loading: false,
          error: action.payload,
        },
      };

    // reset Ring Layout Delete state
    case RingLayoutsActions.RESET_DELETE_RINGLAYOUT_STATE:
      return {
        ...state,
        ringLayoutDelete: {
          ...initialState.ringLayoutDelete,
        },
      };

    // upload ring layout file
    case RingLayoutsActions.UPLOAD_RINGLAYOUT_FILE_START:
      return {
        ...state,
        uploadRingLayoutFile: {
          ...state.uploadRingLayoutFile,
          file: action.file,
          item: null as null,
          loading: true,
          error: null as null,
        },
      };

    case RingLayoutsActions.UPLOAD_RINGLAYOUT_FILE_SUCCESS:
      return {
        ...state,
        uploadRingLayoutFile: {
          ...state.uploadRingLayoutFile,
          file: null as null,
          loading: false,
          item: action.payload.image,
          error: null as null,
        },
      };

    case RingLayoutsActions.UPLOAD_RINGLAYOUT_FILE_FAIL:
      return {
        ...state,
        uploadRingLayoutFile: {
          ...state.uploadRingLayoutFile,
          file: null as null,
          loading: false,
          item: null as null,
          error: action.payload,
        },
      };
    case RingLayoutsActions.RESET_UPLOAD_RINGLAYOUT_FILE_STATE:
      return {
        ...state,
        uploadRingLayoutFile: {
          ...initialState.uploadRingLayoutFile,
        },
      };

    default:
      return state;
  }
}
