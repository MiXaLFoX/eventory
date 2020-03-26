import React from 'react';
import {Card, Grid, Header, Image, Menu, Segment} from "semantic-ui-react";

const UserDetailedEvents = () => {
    return (
      <Grid.Column width={12}>
        <Segment attached>
          <Header icon='calendar' content='Events' />
          <Menu secondary pointing>
            <Menu.Item name='All events' active />
            <Menu.Item name='Past events' />
            <Menu.Item name='Future events' />
            <Menu.Item name='Events hosted' />
          </Menu>

          <Card.Group itemsPerRow={5}>
            <Card>
              <Image src={'/assets/categoryImages/drinks.jpg'} />
              <Card.Content>
                <Card.Header textAlign='center'>Event Title</Card.Header>
                <Card.Meta textAlign='center'>01 May 2020 at 18:00</Card.Meta>
              </Card.Content>
            </Card>
            <Card>
              <Image src={'/assets/categoryImages/drinks.jpg'} />
              <Card.Content>
                <Card.Header textAlign='center'>Event Title</Card.Header>
                <Card.Meta textAlign='center'>01 May 2020 at 18:00</Card.Meta>
              </Card.Content>
            </Card>
          </Card.Group>
        </Segment>
      </Grid.Column>
    );
};

export default UserDetailedEvents;