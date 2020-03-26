import React from 'react';
import {connect} from 'react-redux';
import {withFirestore} from "react-redux-firebase";
import {Grid} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedComments from "./EventDetailedComments";
import EventDetailedSidebar from "./EventDetailedSidebar";
import {objectToArr} from "../../../app/common/helpers";
import {signUpToEvent, cancelSignUpToEvent} from "../../user/userActions";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {};
  }

  return {
    event,
    auth: state.firebase.auth
  }
};

const actions = {
  signUpToEvent,
  cancelSignUpToEvent
};

class EventDetailedPage extends React.Component {

  async componentDidMount() {
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {event, auth, signUpToEvent, cancelSignUpToEvent} = this.props;
    const attendees = event && event.attendees && objectToArr(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            signUpToEvent={signUpToEvent}
            cancelSignUpToEvent={cancelSignUpToEvent}
          />
          <EventDetailedInfo event={event}/>
          <EventDetailedComments/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirestore(connect(mapStateToProps, actions)(EventDetailedPage));