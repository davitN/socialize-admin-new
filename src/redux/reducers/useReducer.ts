const state = {};

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'USER_FETCH_REQUESTED':
      return { ...state, response: null, loading: true };
    case 'USER_FETCH_SUCCEEDED':
      return { ...state, response: action.response, loading: false };
    default:
      return {
        response: 'Default State',
      };
  }
};

export default userReducer;
