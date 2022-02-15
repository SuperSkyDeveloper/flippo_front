import axios from "axios";
import { clearErrors } from "./error";
import { toast } from 'react-toastify';

const SIGN_UP_USER = "SIGN_UP_USER";
const LOG_IN_USER = "LOG_IN__USER";
const FETCH_USER_TICKETS = "FETCH_USER_TICKETS";
const LOG_OUT_USER = "LOG_OUT_USER";
const USER_ACTION_ERROR = "USER_ACTION_ERROR";
const ADD_EXTRA_ADVERTS = "ADD_EXTRA_ADVERTS";


const userCreateError = error => {
  // console.log(error)
  if (typeof error == 'string'){
    return {
      type: USER_ACTION_ERROR,
      error: error
    };
  } else {
    return {
      type: USER_ACTION_ERROR,
      error: error.data.message
    };
  }
  
};

const userCreateSuccess = user => ({
  type: SIGN_UP_USER,
  user
});

export const createUser = data => dispatch => {
  axios
    .post(`/user/create`, { ...data })
    .then(response => {
      dispatch(userCreateSuccess(response.data));
      dispatch(clearErrors());
    })
    .catch(err => dispatch(userCreateError(err.response)));
};

const userLoginSuccess = user => ({
  type: LOG_IN_USER,
  user
});

export const loginUser = data => dispatch => {
  axios
    .post(`/user/login`, { ...data })
    .then(response => {
      console.log(response,"response")
      dispatch(userLoginSuccess(response.data));
      dispatch(clearErrors());
      toast.success("login successfully");
    })
    .catch(err => {
       console.log({...err},"error");
       let data = {...err}
       console.log(data?.response?.data?.message,"daras")
      toast.error(data?.response?.data?.message);
      dispatch(userCreateError(err.response))});
};

const userTicketsFetchSuccess = user => ({
  type: FETCH_USER_TICKETS,
  tickets: user.tickets
});

export const fetchUserTickets = userId => dispatch => {
  axios
    .get(`/user/${userId}`)
    .then(response => {
      dispatch(userTicketsFetchSuccess(response.data));
    })
    .catch(err => dispatch(userCreateError(err.response)));
};

const userLogOutSuccess = () => ({
  type: LOG_OUT_USER,
  logout: true
});

export const logMeOut = () => dispatch => {
  dispatch(userLogOutSuccess());
};

export const creditAddSuccess = user => ({
  type: ADD_EXTRA_ADVERTS,
  user
});
