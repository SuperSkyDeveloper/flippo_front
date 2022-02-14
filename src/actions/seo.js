import axios from "axios";
import { newError } from "./error";

import { baseUrl } from "./configs";


const FETCH_ALL_CITIES = "FETCH_ALL_CITIES";

const fetchCitiesSuccess = cities => ({
  type: FETCH_ALL_CITIES,
  cities
});

export const fetchCities = () => (dispatch) => {
  axios
    .get(`${baseUrl}/seo/count-cities`)
    .then(response => {
      dispatch(fetchCitiesSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};
