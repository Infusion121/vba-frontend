import { InfoSheet } from '@app/model/infoSheet.model';
import * as InfoSheetsActions from '../actions/infoSheets.actions';

export interface State {
  infoSheetsList: {
    itemsObject: { [key: string]: InfoSheet };
    itemsArray: InfoSheet[];
    itemsCount: number;
    loading: boolean;
    error: any;
  };
  infoSheetNew: {
    item: InfoSheet;
    loading: boolean;
    error: any;
  };
  infoSheetCurrent: {
    item: InfoSheet;
    loading: boolean;
    error: any;
    update: {
      loading: boolean;
      item: InfoSheet;
      error: any;
    };
  };
  infoSheetDelete: {
    item: InfoSheet;
    loading: boolean;
    error: any;
  };
  uploadInfoSheetFile: {
    file: File;
    item: any;
    loading: boolean;
    error: any;
  };
}

const initialState: State = {
  infoSheetsList: {
    itemsObject: null,
    itemsArray: null,
    itemsCount: null,
    loading: false,
    error: null,
  },
  infoSheetNew: {
    item: null,
    loading: false,
    error: null,
  },
  infoSheetCurrent: {
    item: null,
    loading: false,
    error: null,
    update: {
      loading: false,
      item: null,
      error: null,
    },
  },
  infoSheetDelete: {
    item: null,
    loading: false,
    error: null,
  },
  uploadInfoSheetFile: {
    file: null,
    item: null,
    loading: false,
    error: null,
  },
};

export function infoSheetsReducer(state: State = initialState, action: InfoSheetsActions.InfoSheetsActions) {
  switch (action.type) {
    // load infosheets list
    case InfoSheetsActions.GET_INFOSHEETS_START:
      return {
        ...state,
        infoSheetsList: {
          ...state.infoSheetsList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: true,
          error: null,
        },
      };
    case InfoSheetsActions.GET_INFOSHEETS_SUCCESS:
      return {
        ...state,
        infoSheetsList: {
          ...state.infoSheetsList,
          itemsObject: action.itemsObject,
          itemsArray: action.itemsArray,
          itemsCount: action.itemsArray.length,
          loading: false,
          error: null as null,
        },
      };
    case InfoSheetsActions.GET_INFOSHEETS_FAIL:
      return {
        ...state,
        infoSheetsList: {
          ...state.infoSheetsList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: false,
          error: action.payload,
        },
      };

    // create new info sheet
    case InfoSheetsActions.POST_INFOSHEET_START:
      return {
        ...state,
        infoSheetNew: {
          ...state.infoSheetNew,
          item: null,
          loading: true,
          error: null,
        },
      };
    case InfoSheetsActions.POST_INFOSHEET_SUCCESS:
      return {
        ...state,
        infoSheetNew: {
          ...state.infoSheetNew,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case InfoSheetsActions.POST_INFOSHEET_FAIL:
      return {
        ...state,
        infoSheetNew: {
          ...state.infoSheetNew,
          item: null,
          loading: false,
          error: action.payload,
        },
      };
    case InfoSheetsActions.RESET_POST_INFOSHEET_STATE:
      return {
        ...state,
        infoSheetNew: {
          ...initialState.infoSheetNew,
        },
      };

    // get info sheet by id
    case InfoSheetsActions.GET_INFOSHEET_BY_ID_START:
      return {
        ...state,
        infoSheetCurrent: {
          ...state.infoSheetCurrent,
          item: null,
          loading: true,
          error: null,
        },
      };
    case InfoSheetsActions.GET_INFOSHEET_BY_ID_SUCCESS:
      return {
        ...state,
        infoSheetCurrent: {
          ...state.infoSheetCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case InfoSheetsActions.GET_INFOSHEET_BY_ID_FAIL:
      return {
        ...state,
        infoSheetCurrent: {
          ...state.infoSheetCurrent,
          item: null as null,
          loading: false,
          error: action.payload,
        },
      };

    // update info sheet by id
    case InfoSheetsActions.PUT_INFOSHEET_BY_ID_START:
      return {
        ...state,
        infoSheetCurrent: {
          ...state.infoSheetCurrent,
          update: {
            ...state.infoSheetCurrent.update,
            item: null,
            loading: true,
            error: null,
          },
        },
      };
    case InfoSheetsActions.PUT_INFOSHEET_BY_ID_SUCCESS:
      return {
        ...state,
        infoSheetCurrent: {
          ...state.infoSheetCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
          update: {
            ...state.infoSheetCurrent.update,
            item: action.payload,
            loading: false,
            error: null as null,
          },
        },
      };
    case InfoSheetsActions.PUT_INFOSHEET_BY_ID_FAIL:
      return {
        ...state,
        infoSheetCurrent: {
          ...state.infoSheetCurrent,
          update: {
            ...state.infoSheetCurrent.update,
            item: null,
            loading: false,
            error: action.payload,
          },
        },
      };

    // reset Info sheet Current state
    case InfoSheetsActions.RESET_INFOSHEET_CURRENT_STATE:
      return {
        ...state,
        infoSheetCurrent: {
          ...initialState.infoSheetCurrent,
        },
      };

    // delete Info sheet by id
    case InfoSheetsActions.DELETE_INFOSHEET_BY_ID_START:
      return {
        ...state,
        infoSheetDelete: {
          item: null,
          loading: true,
          error: null,
        },
      };
    case InfoSheetsActions.DELETE_INFOSHEET_BY_ID_SUCCESS:
      return {
        ...state,
        infoSheetDelete: {
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case InfoSheetsActions.DELETE_INFOSHEET_BY_ID_FAIL:
      return {
        ...state,
        infoSheetDelete: {
          item: null,
          loading: false,
          error: action.payload,
        },
      };

    // reset Info sheet Delete state
    case InfoSheetsActions.RESET_DELETE_INFOSHEET_STATE:
      return {
        ...state,
        infoSheetDelete: {
          ...initialState.infoSheetDelete,
        },
      };

    // upload info sheet file
    case InfoSheetsActions.UPLOAD_INFOSHEET_FILE_START:
      return {
        ...state,
        uploadInfoSheetFile: {
          ...state.uploadInfoSheetFile,
          file: action.file,
          item: null as null,
          loading: true,
          error: null as null,
        },
      };

    case InfoSheetsActions.UPLOAD_INFOSHEET_FILE_SUCCESS:
      return {
        ...state,
        uploadInfoSheetFile: {
          ...state.uploadInfoSheetFile,
          file: null as null,
          loading: false,
          item: action.payload.image,
          error: null as null,
        },
      };

    case InfoSheetsActions.UPLOAD_INFOSHEET_FILE_FAIL:
      return {
        ...state,
        uploadInfoSheetFile: {
          ...state.uploadInfoSheetFile,
          file: null as null,
          loading: false,
          item: null as null,
          error: action.payload,
        },
      };
    case InfoSheetsActions.RESET_UPLOAD_INFOSHEET_FILE_STATE:
      return {
        ...state,
        uploadInfoSheetFile: {
          ...initialState.uploadInfoSheetFile,
        },
      };

    default:
      return state;
  }
}
