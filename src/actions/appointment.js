import axios from "axios";
import { newError } from "./error";


const NEW_APPOINTMENT = "NEW_APPOINTMENT";
const GET_ONE_APPOINTMENT = "GET_ONE_APPOINTMENT";
const GET_APPOINTMENTS = "GET_APPOINTMENTS";
const CANCEL_APPOINTMENT = "CANCEL_APPOINTMENT";
const CHECK_APPOINTMENT = "CHECK_APPOINTMENT";
const APPOINTMENT_WAS_EDITED = "APPOINTMENT_WAS_EDITED";

const appointmentCreateSuccess = appointment => ({
  type: NEW_APPOINTMENT,
  appointment
});

export const createNewAppointment = data => (dispatch, getState) => {
  const { advertReducer } = getState();
  const { selectedAdvert } = advertReducer;

  axios
    .post(`/advert/${selectedAdvert.id}/appointment`, {
      ...data
    })

    .then(response => {
      dispatch(appointmentCreateSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const gotAppointment = appointment => ({
  type: GET_ONE_APPOINTMENT,
  appointment
});

export const getAppointment = randAddress => dispatch => {
  axios
    .get(`/appointment/${randAddress}`)
    .then(res => {
      dispatch(gotAppointment(res.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const gotAppointments = appointments => ({
  type: GET_APPOINTMENTS,
  appointments
});

export const getAppointments = () => (dispatch) => {

  axios
    .get(`/appointment/all`)
    .then(res => {
      const appointments = res.data.map(app => app.appointment);
      dispatch(gotAppointments(appointments));
    })
    .catch(err => dispatch(newError(err.response)));
};

const appointmentCanceled = appointment => ({
  type: CANCEL_APPOINTMENT,
  appointment
});

export const cancelAppointment = id => (dispatch) => {

  axios
    .put(`/appointment/${id}`)

    .then(response => {
      dispatch(appointmentCanceled(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const AppointmentChecked = appointment => ({
  type: CHECK_APPOINTMENT,
  appointment
});

export const checkAppointment = () => (dispatch, getState) => {
  const {advertReducer } = getState();

  axios
    .get(`/appointment/${advertReducer.selectedAdvert.id}/advert`)
    .then(res => {
      dispatch(AppointmentChecked(res.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const appointmentEditSuccess = appointment => ({
  type: APPOINTMENT_WAS_EDITED,
  appointment
});

export const changeAppointment = (data, appId) => (dispatch) => {

  axios
    .put(`/appointment/${appId}/edit`, {
      ...data
    })

    .then(response => {
      dispatch(appointmentEditSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};
