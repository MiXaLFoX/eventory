import {SubmissionError, reset} from "redux-form";
import {toastr} from "react-redux-toastr";
import {closeModal} from "../modals/modalActions";

export const login = (credentials) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({_error: error.message})
    }
  };
};

export const registerUser = (user) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    console.log(createdUser);
    await createdUser.user.updateProfile({
      displayName: user.displayName
    });
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({_error: error.message})
  }
};

export const updatePassword = (credentials) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(credentials.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Password has been changed');
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      })
    }
  };
