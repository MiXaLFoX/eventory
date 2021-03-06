import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {withFirestore} from "react-redux-firebase";
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate';
import { Segment, Form, Button, Grid, Header} from "semantic-ui-react";
import {cancelToggle, createEvent, updateEvent} from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {};
  }

  return {
    initialValues: event,
    event
  }
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const validate = combineValidators({
  title: isRequired({message: 'Event title is required'}),
  category: isRequired({message: 'Event category is required'}),
  description: composeValidators(
    isRequired({message: 'Event description is required'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters long'})
  )(),
  city: isRequired({message: 'City name is required'}),
  venue: isRequired('venue'),
  date: isRequired('date')
});

const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'}
];

class EventForm extends Component {

  async componentDidMount() {
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);

  }

  onFormSubmit = async values => {
    try {
      if (this.props.initialValues.id) {
        this.props.updateEvent(values);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/events/${createdEvent.id}`);
      }
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    const {history, initialValues, invalid, submitting, pristine, event, cancelToggle} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name='title' component={TextInput} placeholder="Event title" />
              <Field name='category' component={SelectInput} options={category} placeholder="Event category" />
              <Field name='description' component={TextArea} rows={3} placeholder="Event description" />
              <Header sub color='teal' content='Event location details' />
              <Field name='city' component={TextInput} placeholder="Event city" />
              <Field name='venue' component={TextInput} placeholder="Event venue" />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect timeFormat='HH:mm'
                placeholder="Event date"
              />
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={
                initialValues.id ? () => history.push(`/events/${initialValues.id}`) : () => history.push('/events')
              }
              >Cancel</Button>
              <Button
                type="button"
                color={event.cancelled ? 'green' : 'red'}
                floated="right"
                content={event.cancelled ? 'Reactivate event' : 'Cancel event'}
                onClick={() => cancelToggle(!event.cancelled, event.id)}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(mapStateToProps, actions)(reduxForm({form: 'eventForm', validate, enableReinitialize: true})(EventForm))
);
