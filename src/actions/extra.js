import axios from "axios";
import { newError } from "./error";

const FETCH_ALL_EXTRAS = "FETCH_ALL_EXTRAS";
const ONE_EXTRA_ADDED = "ONE_EXTRA_ADDED";
const ONE_EXTRA_REMOVED = "ONE_EXTRA_REMOVED";

const fetchExtrasSuccess = extras => ({
  type: FETCH_ALL_EXTRAS,
  extras
});

export const fetchExtras = () => (dispatch, getState) => {
  axios
    .get(`/extra/all`)
    .then(response => {
      dispatch(fetchExtrasSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const addExtrasSuccess = extra => ({
  type: ONE_EXTRA_ADDED,
  extra
});

export const addExtra = text => (dispatch, getState) => {
  const { advertReducer } = getState();
  const { selectedAdvert } = advertReducer;

  axios
    .post(`/extra/add/${selectedAdvert.id}`, { text })
    .then(response => {
      dispatch(addExtrasSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const ExtraRemoveSuccess = extra => ({
  type: ONE_EXTRA_REMOVED,
  extra
});

export const removeExtra = extraId => (dispatch, getState) => {
  const { advertReducer } = getState();
  const { selectedAdvert } = advertReducer;

  axios
    .delete(`/extra/${extraId}/remove/${selectedAdvert.id}`)
    .then(response => {
      dispatch(ExtraRemoveSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};
