import {SET_AUTH_USERS} from "../action-type";
import {authAPI} from "../../api/api";

let initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  isFetching: true,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USERS:
      return {
        ...state,
        ...action.data,
        isAuth: action.isAuth,
        isFetching: false,
      }
    default:
      return {...state}
  }
}

const setAuthUserAC = (id, login, email, isAuth) => ({
  type: SET_AUTH_USERS,
  data: {id, login, email},
  isAuth
})

export const getAuthUserTC = () => (dispatch) => {
  authAPI.checkAuth().then(data => {
    if (data.resultCode === 0) {
      let {id, login, email} = data.data
      dispatch(setAuthUserAC(id, login, email, true))
    } else {
      dispatch(setAuthUserAC(null, null, null, false))
    }
  })
}


