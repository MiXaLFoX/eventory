import {CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT} from "./eventConstants";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import {fetchData} from "../../app/data/mockApi";

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  }
};

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  }
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchData();
      dispatch({type: FETCH_EVENTS, payload: {events}});
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
};
