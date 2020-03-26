import {FETCH_EVENTS} from "./eventConstants";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import {fetchData} from "../../app/data/mockApi";
import {toastr} from 'react-redux-toastr';
import {createNewEvent} from "../../app/common/helpers";

export const createEvent = (event) => {
  return async (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add('events', newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success('Success', 'Event has been created');
      return createdEvent;
    } catch (error) {
      toastr.error('Sorry', 'Something went wrong');
    }
  }
};

export const updateEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success', 'Event has been updated');
    } catch (error) {
      toastr.error('Sorry', 'Something went wrong');
    }
  }
};

export const cancelToggle = (cancelled, eventId) =>
  async (dispatch, getState, {getFirestore}) => {
    const firestore =getFirestore();
    try {
      await firestore.update(`events/${eventId}`, {
        cancelled: cancelled
      })
    } catch (error) {
      console.log(error);
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
