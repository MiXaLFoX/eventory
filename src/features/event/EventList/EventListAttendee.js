import React, {Component} from 'react';
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
  render() {
    const {attendee} = this.props;
    return (
      <div>
        <List.Item>
          <Image as='a' size='mini' circular src={attendee.photoURL}/>
        </List.Item>
      </div>
    );
  }
}

export default EventListAttendee;