import React from 'react';
import {Segment, Header, Comment, Form, Button} from "semantic-ui-react";

const EventDetailedComments = () => {
  return (
    <React.Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{border: 'none'}}
      >
        <Header>Comments</Header>
      </Segment>

      <Segment>
        <Form reply>
          <Form.TextArea/>
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Segment>
    </React.Fragment>
  );
};

export default EventDetailedComments;