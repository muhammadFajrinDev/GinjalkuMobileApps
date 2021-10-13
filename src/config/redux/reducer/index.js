const initialState = {
    isLogin : false,
    isLoading : false,
    dataUser  :{},
    dataEGFR : {},
  }

  const reducer = (state=initialState ,action) =>{
    if(action.type === 'CHANGE_ISLOGIN'){
      return {
        ...state,
        isLogin : action.value
      }
    }
    if(action.type === 'CHANGE_USER'){
        return {
          ...state,
          dataUser : action.value
        }
      }
      if(action.type === 'CHANGE_LOADING'){
        return {
          ...state,
          isLoading : action.value
        }
      }
      if(action.type === 'CHANGE_EGFR'){
        return {
          ...state,
          dataEGFR : action.value
        }
      }
    return state;
  }

  export default reducer;