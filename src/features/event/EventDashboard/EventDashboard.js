import React from 'react';
import { Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';
import EventList from "../EventList/EventList";
import {createEvent, updateEvent, deleteEvent} from "../eventActions";
import SpinnerComponent from "../../../app/layout/SpinnerComponent";

const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
};

class EventDashboard extends React.Component {

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const {events, loading} = this.props;
    if (loading) return <SpinnerComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, actions)(EventDashboard);