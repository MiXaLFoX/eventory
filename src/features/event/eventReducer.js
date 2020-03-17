import {createReducer} from "../../app/common/reducerUtils";
import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT} from "./eventConstants";

const initialState = [
  {
    id: '1',
    title: 'Trip to Theatre',
    date: '2020-03-08',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'Grodno, BY',
    venue: "Drama Theatre, Mostovaya Street, Grodno, BY",
    hostedBy: 'Mike',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/85.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Mike',
        photoURL: 'https://randomuser.me/api/portraits/men/85.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/36.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Koritsa Pub',
    date: '2020-03-06',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'Grodno, BY',
    venue: 'Koritsa, Vilenskaya Street, Grodno, BY',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/36.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/36.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/46.jpg'
      },
      {
        id: 'c',
        name: 'Jack',
        photoURL: 'https://randomuser.me/api/portraits/men/33.jpg'
      }
    ]
  }
];

const createEvent = (state, payload) => {
  return [...state, payload.event]
};

const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    payload.event
  ]
};

const deleteEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.eventId)
  ]
};

export default createReducer (initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent
})