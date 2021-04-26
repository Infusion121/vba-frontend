import { Newsletter } from '@app/model/newsletter.model';
import * as NewslettersActions from '../actions/newsletters.actions';

export interface State {
  newslettersList: {
    itemsObject: { [key: string]: Newsletter };
    itemsArray: Newsletter[];
    itemsCount: number;
    loading: boolean;
    error: any;
  };
  newsletterNew: {
    item: Newsletter;
    loading: boolean;
    error: any;
  };
  newsletterCurrent: {
    item: Newsletter;
    loading: boolean;
    error: any;
    update: {
      loading: boolean;
      item: Newsletter;
      error: any;
    };
  };
  newsletterDelete: {
    item: Newsletter;
    loading: boolean;
    error: any;
  };
  uploadNewsletterFile: {
    file: File;
    item: any;
    loading: boolean;
    error: any;
  };
}

const initialState: State = {
  newslettersList: {
    itemsObject: null,
    itemsArray: null,
    itemsCount: null,
    loading: false,
    error: null,
  },
  newsletterNew: {
    item: null,
    loading: false,
    error: null,
  },
  newsletterCurrent: {
    item: null,
    loading: false,
    error: null,
    update: {
      loading: false,
      item: null,
      error: null,
    },
  },
  newsletterDelete: {
    item: null,
    loading: false,
    error: null,
  },
  uploadNewsletterFile: {
    file: null,
    item: null,
    loading: false,
    error: null,
  },
};

export function newslettersReducer(state: State = initialState, action: NewslettersActions.NewslettersActions) {
  switch (action.type) {
    // load newsletters list
    case NewslettersActions.GET_NEWSLETTERS_START:
      return {
        ...state,
        newslettersList: {
          ...state.newslettersList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: true,
          error: null,
        },
      };
    case NewslettersActions.GET_NEWSLETTERS_SUCCESS:
      return {
        ...state,
        newslettersList: {
          ...state.newslettersList,
          itemsObject: action.itemsObject,
          itemsArray: action.itemsArray,
          itemsCount: action.itemsArray.length,
          loading: false,
          error: null as null,
        },
      };
    case NewslettersActions.GET_NEWSLETTERS_FAIL:
      return {
        ...state,
        newslettersList: {
          ...state.newslettersList,
          itemsObject: null,
          itemsArray: null,
          itemsCount: null,
          loading: false,
          error: action.payload,
        },
      };

    // create new newsletter
    case NewslettersActions.POST_NEWSLETTER_START:
      return {
        ...state,
        newsletterNew: {
          ...state.newsletterNew,
          item: null,
          loading: true,
          error: null,
        },
      };
    case NewslettersActions.POST_NEWSLETTER_SUCCESS:
      return {
        ...state,
        newsletterNew: {
          ...state.newsletterNew,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case NewslettersActions.POST_NEWSLETTER_FAIL:
      return {
        ...state,
        newsletterNew: {
          ...state.newsletterNew,
          item: null,
          loading: false,
          error: action.payload,
        },
      };
    case NewslettersActions.RESET_POST_NEWSLETTER_STATE:
      return {
        ...state,
        newsletterNew: {
          ...initialState.newsletterNew,
        },
      };

    // get newsletter by id
    case NewslettersActions.GET_NEWSLETTER_BY_ID_START:
      return {
        ...state,
        newsletterCurrent: {
          ...state.newsletterCurrent,
          item: null,
          loading: true,
          error: null,
        },
      };
    case NewslettersActions.GET_NEWSLETTER_BY_ID_SUCCESS:
      return {
        ...state,
        newsletterCurrent: {
          ...state.newsletterCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case NewslettersActions.GET_NEWSLETTER_BY_ID_FAIL:
      return {
        ...state,
        newsletterCurrent: {
          ...state.newsletterCurrent,
          item: null as null,
          loading: false,
          error: action.payload,
        },
      };

    // update newsletter by id
    case NewslettersActions.PUT_NEWSLETTER_BY_ID_START:
      return {
        ...state,
        newsletterCurrent: {
          ...state.newsletterCurrent,
          update: {
            ...state.newsletterCurrent.update,
            item: null,
            loading: true,
            error: null,
          },
        },
      };
    case NewslettersActions.PUT_NEWSLETTER_BY_ID_SUCCESS:
      return {
        ...state,
        newsletterCurrent: {
          ...state.newsletterCurrent,
          item: action.payload,
          loading: false,
          error: null as null,
          update: {
            ...state.newsletterCurrent.update,
            item: action.payload,
            loading: false,
            error: null as null,
          },
        },
      };
    case NewslettersActions.PUT_NEWSLETTER_BY_ID_FAIL:
      return {
        ...state,
        newsletterCurrent: {
          ...state.newsletterCurrent,
          update: {
            ...state.newsletterCurrent.update,
            item: null,
            loading: false,
            error: action.payload,
          },
        },
      };

    // reset newsletter Current state
    case NewslettersActions.RESET_NEWSLETTER_CURRENT_STATE:
      return {
        ...state,
        newsletterCurrent: {
          ...initialState.newsletterCurrent,
        },
      };

    // delete newsletter by id
    case NewslettersActions.DELETE_NEWSLETTER_BY_ID_START:
      return {
        ...state,
        newsletterDelete: {
          item: null,
          loading: true,
          error: null,
        },
      };
    case NewslettersActions.DELETE_NEWSLETTER_BY_ID_SUCCESS:
      return {
        ...state,
        newsletterDelete: {
          item: action.payload,
          loading: false,
          error: null as null,
        },
      };
    case NewslettersActions.DELETE_NEWSLETTER_BY_ID_FAIL:
      return {
        ...state,
        newsletterDelete: {
          item: null,
          loading: false,
          error: action.payload,
        },
      };

    // reset newsletter Delete state
    case NewslettersActions.RESET_DELETE_NEWSLETTER_STATE:
      return {
        ...state,
        newsletterDelete: {
          ...initialState.newsletterDelete,
        },
      };

    // upload newsletter file
    case NewslettersActions.UPLOAD_NEWSLETTER_FILE_START:
      return {
        ...state,
        uploadNewsletterFile: {
          ...state.uploadNewsletterFile,
          file: action.file,
          item: null as null,
          loading: true,
          error: null as null,
        },
      };

    case NewslettersActions.UPLOAD_NEWSLETTER_FILE_SUCCESS:
      return {
        ...state,
        uploadNewsletterFile: {
          ...state.uploadNewsletterFile,
          file: null as null,
          loading: false,
          item: action.payload.image,
          error: null as null,
        },
      };

    case NewslettersActions.UPLOAD_NEWSLETTER_FILE_FAIL:
      return {
        ...state,
        uploadNewsletterFile: {
          ...state.uploadNewsletterFile,
          file: null as null,
          loading: false,
          item: null as null,
          error: action.payload,
        },
      };
    case NewslettersActions.RESET_UPLOAD_NEWSLETTER_FILE_STATE:
      return {
        ...state,
        uploadNewsletterFile: {
          ...initialState.uploadNewsletterFile,
        },
      };

    default:
      return state;
  }
}