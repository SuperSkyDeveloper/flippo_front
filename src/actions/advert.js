import axios from "axios";
import { newError } from "./error";
import { toast } from 'react-toastify';


const CREATE_NEW_ADVERT = "CREATE_NEW_ADVERT";
const FETCH_ALL_ADVERTS = "FETCH_ALL_ADVERTS";
const FETCH_SEARCHED_ADVERTS = "FETCH_SEARCHED_ADVERTS";
const FETCH_ONE_ADVERT = "FETCH_ONE_ADVERT";
const GET_AGENCY_AGENTS = "GET_AGENCY_AGENTS";
const TOGGLE_AGENT_CONFIRMATION = "TOGGLE_AGENT_CONFIRMATION";
const GET_MY_ADVERTS = "GET_MY_ADVERTS";
const CLEAR_SEARCHED_ADVERTS = "CLEAR_SEARCHED_ADVERTS";
const CREATE_NEW_ADVERT_ERROR = "CREATE_NEW_ADVERT_ERROR";

const advertCreateSuccess = advert => ({
  type: CREATE_NEW_ADVERT,
  advert: { ...advert.newAdvert },
  user: { ...advert.user }
});
const advertCreateError = advert => ({
  type: CREATE_NEW_ADVERT_ERROR,
  advert: { ...advert, showAddForm: false },
});

export const createAdvert = data => (dispatch) => {

  axios
    .post(`/advert`, {
      ...data
    })
    .then(response => {
      toast.success('advert created successfully !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      dispatch(advertCreateSuccess(response.data));
    })
    .catch(err => {
      toast.error( err?.response?.data?.message || err?.message ,{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      dispatch(newError(err.response))
      dispatch(advertCreateError({ ...data }))
    });
};

const advertsFetchSuccess = adverts => ({
  type: FETCH_ALL_ADVERTS,
  adverts
});

export const fetchAdverts = page => dispatch => {
  axios
    .get(`/advert/all?offset=${page}`)
    .then(response => {
      dispatch(advertsFetchSuccess(response));
    })
    .catch(err => dispatch(newError(err.response)));
};

const advertFetchSuccess = advert => ({
  type: FETCH_ONE_ADVERT,
  advert
});

export const fetchAdvert = id => dispatch => {
  axios
    .get(`/advert/${id}`)
    .then(res => {
      dispatch(advertFetchSuccess(res.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const gotAgencyAgents = agency => ({
  type: GET_AGENCY_AGENTS,
  agency
});

export const getAgencyAgents = () => (dispatch) => {

  axios
    .get(`/agency`)
    .then(response => {
      dispatch(gotAgencyAgents(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const toggleAgentSuccess = agent => ({
  type: TOGGLE_AGENT_CONFIRMATION,
  agent
});

export const toggleAgentAcc = (id, action) => (dispatch) => {

  axios
    .get(`/agency/agent/${id}?action=${action}`)
    .then(response => {
      dispatch(toggleAgentSuccess(response.data));
    })
    .catch(err => console.log(err));
};

const getMyAdvertsSuccess = adverts => ({
  type: GET_MY_ADVERTS,
  adverts
});

export const getMyAdverts = () => (dispatch) => {
  axios
    .get(`/advert/myadvert`)
    .then(response => {
      dispatch(getMyAdvertsSuccess(response.data));
    })
    .catch(err => console.log(err));
};

const searchedAdvertsFetchSuccess = adverts => ({
  type: FETCH_SEARCHED_ADVERTS,
  adverts
});

export const fetchAdvertsBySearchTerm = (
  page,
  searchBy,
  searchFor,
  searchObj
) => dispatch => {
  let url;
  if (searchObj) {
    let { priceFrom, priceTo, forRent, forSale } = searchObj;
    priceFrom = priceFrom ? `&pricefrom=${priceFrom}` : "";
    priceTo = priceTo ? `&priceto=${priceTo}` : "";
    forRent = forRent ? `&forrent=true` : "";
    forSale = forSale ? `&forsale=true` : "";

    url = `/advert/all?${searchBy}=${searchFor}&offset=${page}${priceFrom}${priceTo}${forRent}${forSale}`;
  } else {
    url = `/advert/all?${searchBy}=${searchFor}&offset=${page}`;
  }
  axios
    .get(url)
    .then(response => {
      dispatch(searchedAdvertsFetchSuccess(response));
    })
    .catch(err => dispatch(newError(err.response)));
};

export const clearSearchedAdverts = () => dispatch => {
  dispatch({ type: CLEAR_SEARCHED_ADVERTS });
};