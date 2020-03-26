import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import {connect} from 'react-redux';
import EventList from "../EventList/EventList";
import {getEventsForDashboard} from "../eventActions";
import SpinnerComponent from "../../../app/layout/SpinnerComponent";
import EventActivity from "../EventActivity/EventActivity";
import {firestoreConnect} from "react-redux-firebase";

const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading,
  loadedEvents: []
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends React.Component {

  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events]
      })
    }
  }

  getMoreEvents = async () => {
    const {events} = this.props;
    let lastEvent = events && events[events.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  render() {
    const {loading} = this.props;
    const {moreEvents, loadedEvents} = this.state;
    if (this.state.loadingInitial) return <SpinnerComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList loading={loading} events={loadedEvents} moreEvents={moreEvents} getMoreEvents={this.getMoreEvents}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading}/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard));