import axios from "axios";
import {baseUrl} from '../actions/configs';
import { logMeOut } from "../actions/user";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

axios.defaults.baseURL = baseUrl;
axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("authToken");

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
/** Axios Request Intercept */
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

/** Axios Response Intercept */
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(err) {
    const originalRequest = err.config;
    if (
      err.response.status === 401 &&
      originalRequest.url === "/user/refresh"
    ) {
      const history = useHistory();
      const dispatch = useDispatch();
      dispatch(logMeOut());
      logoutUser();
      history.push("/login")
      return Promise.reject(err);
    }
    if (err.response.status === 401) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;
      const refreshToken = localStorage.getItem("refreshToken");
      setAuthToken(refreshToken);
      return new Promise(function(resolve, reject) {
        postdata("/user/refresh")
          .then((res) => {
            setAuthToken(res.jwt);
            originalRequest.headers["Authorization"] = "Bearer " + res.jwt;
            localStorage.setItem("authToken", res.jwt);
            localStorage.setItem("refreshToken", res.jwt_refresh);
            processQueue(null, res.jwt);
            resolve(axios(originalRequest));
          })
          .catch(() => {
            processQueue(err, null);
            reject(err);
          })
          .finally(()=>isRefreshing=false)
      });
    }
    return Promise.reject(err);
  }
)

async function postdata(endpoint, params, headers) {
  var res = await axios({
    method: "post",
    url: `${endpoint}`,
    data: params,
    headers: headers,
  });
  if (res.status !== 200) {
    return res;
  } else {
    var postresult = res.data;
    return postresult;
  }
}

const setAuthToken = (token) => {
  if (token) {
    // Apply to every axios request
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete Auth Header
    delete axios.defaults.headers["Authorization"];
  }
};
const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  //location.href="/";
};
