import {toastr} from "react-redux-toastr";
import nanoid from 'nanoid';
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../async/asyncActions";

export const updateProfile = user =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const {isLoaded, isEmpty, ...updatedUser} = user;
    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Done', 'Your profile has been updated');
    } catch (error) {
      console.log(error)
    }
  };

export const uploadProfileImage = (file, fileName) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const imageName = nanoid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {name: fileName};
    try {
      dispatch(asyncActionStart());
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      let userDoc = await firestore.get(`users/${user.uid}`);
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({photoURL: downloadURL});
        await user.updateProfile({photoURL: downloadURL});
      }
      await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        name: imageName,
        url: downloadURL
      });
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError())
    }
  };

export const deletePhoto = (photo) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos', doc: photo.uid}]
      })
    } catch (error) {
      console.log(error);
      throw new Error('There is a problem with deleting the photo')
    }
  };

export const setMainPhoto = (photo) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      return await firebase.updateProfile({
        photoURL: photo.url
      })
    } catch (error) {
      throw new Error('Problem setting the main photo')
    }
  };

export const signUpToEvent = (event) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const profile = getState().firebase.profile;
    const attendee = {
      going: true,
      joinDate: firestore.FieldValue.serverTimestamp(),
      photoURL: profile.photoURL || '/assets/user.png',
      displayName: profile.displayName,
      host: false
    };
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: attendee
      });
      await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false
      });
      toastr.success('Done', 'You have signed up to the event')
    } catch (error) {
      console.log(error);
      toastr.error('Sorry', 'Problem signing up to the event')
    }
};

export const cancelSignUpToEvent = (event) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
      toastr.success('Done', 'You have signed out of the event');
    } catch (error) {
      console.log(error);
      toastr.error('Sorry', 'Something went wrong')
    }
  };
