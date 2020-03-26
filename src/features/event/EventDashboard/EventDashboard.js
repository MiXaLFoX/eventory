import React from 'react';
import { Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';
import EventList from "../EventList/EventList";
import {createEvent, updateEvent} from "../eventActions";
import SpinnerComponent from "../../../app/layout/SpinnerComponent";
import EventActivity from "../EventActivity/EventActivity";
import {firestoreConnect, isLoaded} from "react-redux-firebase";

const mapStateToProps = (state) => ({
  events: state.firestore.ordered.events,

});

const actions = {
  createEvent,
  updateEvent
};

class EventDashboard extends React.Component {

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const {events, loading} = this.props;
    if (!isLoaded(events)) return <SpinnerComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard));