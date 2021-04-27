import { MemberInfo } from '@app/model/memberInfo.model';
import * as MemberInfosActions from '../actions/memberInfos.actions';

export interface State {
  memberInfosList: {
    itemsObject: { [key: string]: MemberInfo };
    itemsArray: MemberInfo[];
    itemsCount: number;
    loading: boolean;
    error: any;
  };
  memberInfoNew: {
    item: MemberInfo;
    loading: boolean;
    error: any;
  };
  memberInfoCurrent: {
    item: MemberInfo;
    loading: boolean;
    error: any;
    update: {
      loading: boolean;
      item: MemberInfo;
      error: any;
    };
  };
  memberInfoDelete: {
    item: MemberInfo;
    loading: boolean;
    error: any;
  };
  uploadMemberInfoFile: {
    file: File;
    item: any;
    loading: boolean;
    error: any;
  };
}

const initialState: State = {
  memberInfosList: {
    itemsObject: null,
    itemsArray: null,
    itemsCount: null,
    loading: false,
    error: null,
  },
  memberInfoNew: {
    item: null,
    loading: false,
    error: null,
  },
  memberInfoCurrent: {
    item: null,
    loading: false,
    error: null,
    update: {
      loading: false,
      item: null,
      error: null,
    },
  },
  memberInfoDelete: {
    item: null,
    loading: false,
    error: null,
  },
  uploadMemberInfoFile: {
    file: null,
    item: null,
    loading: false,
    error: null,
  },
};

export function memberInfosReducer(state: State = initialState, action: MemberInfosActions.MemberInfosActions) {
  switch (action.type) {
    // load memberinfos list
    case MemberInfosActions.GET_MEMBERINFOS_START:
      return {
        ...state,
        memberInfosList: {
          ...state.memberInfosList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: true,
          error: null,
        },
      };
    case MemberInfosActions.GET_MEMBERINFOS_SUCCESS:
      return {
        ...state,
        memberInfosList: {
          ...state.memberInfosList,
          itemsObject: action.itemsObject,
          itemsArray: action.itemsArray,
          itemsCount: action.itemsArray.length,
          loading: false,
          error: null as null,
        },
      };
    case MemberInfosActions.GET_MEMBERINFOS_FAIL:
      return {
        ...state,
        memberInfosList: {
          ...state.memberInfosList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: false,
          error: action.payload,
        },
      };

    // create new member info
    case MemberInfosActions.POST_MEMBERINFO_START:
      return {
        ...state,
        memberInfoNew: {
          ...state.memberInfoNew,
          item: null,
          loading: true,
          error: null,
        },
      };
    case MemberInfosActions.POST_MEMBERINFO_SUCCESS:
      return {
        ...state,
        memberInfoNew: {
          ...state.memberInfoNew,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case MemberInfosActions.POST_MEMBERINFO_FAIL:
      return {
        ...state,
        memberInfoNew: {
          ...state.memberInfoNew,
          item: null,
          loading: false,
          error: action.payload,
        },
      };
    case MemberInfosActions.RESET_POST_MEMBERINFO_STATE:
      return {
        ...state,
        memberInfoNew: {
          ...initialState.memberInfoNew,
        },
      };

    // get member info by id
    case MemberInfosActions.GET_MEMBERINFO_BY_ID_START:
      return {
        ...state,
        memberInfoCurrent: {
          ...state.memberInfoCurrent,
          item: null,
          loading: true,
          error: null,
        },
      };
    case MemberInfosActions.GET_MEMBERINFO_BY_ID_SUCCESS:
      return {
        ...state,
        memberInfoCurrent: {
          ...state.memberInfoCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case MemberInfosActions.GET_MEMBERINFO_BY_ID_FAIL:
      return {
        ...state,
        memberInfoCurrent: {
          ...state.memberInfoCurrent,
          item: null as null,
          loading: false,
          error: action.payload,
        },
      };

    // update member info by id
    case MemberInfosActions.PUT_MEMBERINFO_BY_ID_START:
      return {
        ...state,
        memberInfoCurrent: {
          ...state.memberInfoCurrent,
          update: {
            ...state.memberInfoCurrent.update,
            item: null,
            loading: true,
            error: null,
          },
        },
      };
    case MemberInfosActions.PUT_MEMBERINFO_BY_ID_SUCCESS:
      return {
        ...state,
        memberInfoCurrent: {
          ...state.memberInfoCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
          update: {
            ...state.memberInfoCurrent.update,
            item: action.payload,
            loading: false,
            error: null as null,
          },
        },
      };
    case MemberInfosActions.PUT_MEMBERINFO_BY_ID_FAIL:
      return {
        ...state,
        memberInfoCurrent: {
          ...state.memberInfoCurrent,
          update: {
            ...state.memberInfoCurrent.update,
            item: null,
            loading: false,
            error: action.payload,
          },
        },
      };

    // reset Member info Current state
    case MemberInfosActions.RESET_MEMBERINFO_CURRENT_STATE:
      return {
        ...state,
        memberInfoCurrent: {
          ...initialState.memberInfoCurrent,
        },
      };

    // delete Member info by id
    case MemberInfosActions.DELETE_MEMBERINFO_BY_ID_START:
      return {
        ...state,
        memberInfoDelete: {
          item: null,
          loading: true,
          error: null,
        },
      };
    case MemberInfosActions.DELETE_MEMBERINFO_BY_ID_SUCCESS:
      return {
        ...state,
        memberInfoDelete: {
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case MemberInfosActions.DELETE_MEMBERINFO_BY_ID_FAIL:
      return {
        ...state,
        memberInfoDelete: {
          item: null,
          loading: false,
          error: action.payload,
        },
      };

    // reset Member info Delete state
    case MemberInfosActions.RESET_DELETE_MEMBERINFO_STATE:
      return {
        ...state,
        memberInfoDelete: {
          ...initialState.memberInfoDelete,
        },
      };

    // upload member info file
    case MemberInfosActions.UPLOAD_MEMBERINFO_FILE_START:
      console.log(action);
      return {
        ...state,
        uploadMemberInfoFile: {
          ...state.uploadMemberInfoFile,
          file: action.file,
          item: null as null,
          loading: true,
          error: null as null,
        },
      };

    case MemberInfosActions.UPLOAD_MEMBERINFO_FILE_SUCCESS:
      return {
        ...state,
        uploadMemberInfoFile: {
          ...state.uploadMemberInfoFile,
          file: null as null,
          loading: false,
          item: action.payload.image,
          error: null as null,
        },
      };

    case MemberInfosActions.UPLOAD_MEMBERINFO_FILE_FAIL:
      return {
        ...state,
        uploadMemberInfoFile: {
          ...state.uploadMemberInfoFile,
          file: null as null,
          loading: false,
          item: null as null,
          error: action.payload,
        },
      };
    case MemberInfosActions.RESET_UPLOAD_MEMBERINFO_FILE_STATE:
      return {
        ...state,
        uploadMemberInfoFile: {
          ...initialState.uploadMemberInfoFile,
        },
      };

    default:
      return state;
  }
}