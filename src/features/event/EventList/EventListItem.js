import React, {Component} from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from "./EventListAttendee";
import {Link} from "react-router-dom";

class EventListItem extends Component {
  render() {
    const {event, deleteEvent} = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src={event.hostPhotoURL}
              />
              <Item.Content>
                <Item.Header>{event.title}</Item.Header>
                <Item.Description>
                  Hosted by {event.hostedBy}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <p>
            <Icon name="clock" /> {event.date} |
            <Icon name="marker" /> {event.venue}, {event.city}
          </p>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && event.attendees.map(attendee => (
              <EventListAttendee key={attendee.id} attendee={attendee}/>
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <p>{event.description}</p>
          <Button
            onClick={() => deleteEvent(event.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          />
          <Button
            as={Link}
            to={`/events/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;