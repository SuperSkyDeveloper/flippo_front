import axios from "axios";
import { newError } from "./error";


const LIKE_ADVERT = "LIKE_ADVERT";
const DISLIKE_ADVERT = "DISLIKE_ADVERT";
const GET_USER_FAVORITES = "GET_USER_FAVORITES";

const likeAdvertSuccess = liked => {
  if (liked.removed) {
    return {
      type: DISLIKE_ADVERT,
      advertId: liked.advertId
    };
  } else {
    return {
      type: LIKE_ADVERT,
      liked
    };
  }
};

export const likeAdvert = id => (dispatch) => {

  axios
    .get(`/advert/${id}/like`)
    .then(response => {
      dispatch(likeAdvertSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const gotUserFavorites = likes => ({
  type: GET_USER_FAVORITES,
  likes
});

export const getFavorites = () => (dispatch) => {

  axios
    .get(`/advert/favorites`)
    .then(response => {
      dispatch(gotUserFavorites(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};
