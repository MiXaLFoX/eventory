import React from 'react';
import {Grid, Header, Segment, Item, Image} from "semantic-ui-react";
import differenceInYears from 'date-fns/differenceInYears';
import LazyLoad from 'react-lazyload';

const UserDetailedHeader = ({profile}) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
  } else {
    age = 'age unknown'
  }
    return (
      <Grid.Column width={16}>
        <Segment>
          <Item.Group>
            <Item>
              <LazyLoad height={150} placeholder={<Image avatar size='small' src='/assets/user.png' />}>
                <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}/>
              </LazyLoad>
              <Item.Content verticalAlign='bottom'>
                <Header as='h1'>{profile.displayName}</Header>
                <br/>
                <Header as='h3'>{profile.occupation}</Header>
                <br/>
                <Header as='h3'>{age} y.o., Lives in {profile.city || 'no information'}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Grid.Column>
    );
};

export default UserDetailedHeader;