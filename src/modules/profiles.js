import { initialProfilesData } from "./initialProfilesData";

export const LOAD_PROFILES = "profiles/LOAD_PROFILES";
export const ADD_PROFILE = "profiles/ADD_PROFILE";
export const EDIT_PROFILE = "profiles/EDIT_PROFILE";
export const DELETE_PROFILE = "profiles/DELETE_PROFILE";
export const OPEN_MODAL = "profiles/OPEN_MODAL";
export const CLOSE_MODAL = "profiles/CLOSE_MODAL";
export const SEARCH_CHANGE = "profiles/SEARCH_CHANGE";

const initialState = {
  items: [],
  targetUser: {},
  searchTerm: "",
  isModalOpen: false,
  modalType: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILES:
      return {
        ...state,
        items: action.payload
      };
    case ADD_PROFILE:
      return {
        ...state,
        items: state.items.concat(action.payload)
      };
    case EDIT_PROFILE:
      const itemIndex = state.items
        .map(item => item.name)
        .indexOf(action.previousName);
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = action.payload;
      return {
        ...state,
        items: updatedItems
      };
    case DELETE_PROFILE:
      const newItems = state.items.filter(
        item => item.name !== action.payload.name
      );
      return {
        ...state,
        items: newItems
      };
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalType: action.modalType,
        targetUser: action.payload
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        modalType: action.modalType,
        targetUser: action.payload
      };
    case SEARCH_CHANGE:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
};

export const loadInitialProfiles = () => {
  return dispatch => {
    dispatch({
      type: LOAD_PROFILES,
      payload: initialProfilesData
    });
  };
};

export const addProfile = userData => {
  return {
    type: ADD_PROFILE,
    payload: userData
  };
};

// because users don't have unique IDs, we're passing previousName,
// which is saved before the user can edit the name, to find the user in store
export const editProfile = (userData, previousName) => {
  return {
    type: EDIT_PROFILE,
    payload: userData,
    previousName: previousName
  };
};

export const deleteProfile = targetUser => {
  return {
    type: DELETE_PROFILE,
    payload: targetUser
  };
};

// if userData is supplied, send that as the payload
// otherwise send an empty object
export const openModal = (modalType, userData) => {
  if (userData) {
    return {
      type: OPEN_MODAL,
      modalType: modalType,
      payload: userData
    };
  }
  return {
    type: OPEN_MODAL,
    modalType: modalType,
    payload: {}
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
    modalType: "",
    payload: {}
  };
};

export const searchChange = query => {
  return {
    type: SEARCH_CHANGE,
    payload: query
  };
};
