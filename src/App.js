import React from 'react';
import './App.css';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

const ALL_LIFTS_QUERY = gql`
  query {
    allLifts {
      id
      name
      status
      trails {
        name
      }
    }
  }
`;

const LIFT_STATUS_MUTATION = gql`
  mutation LiftStatusMutation($id: String!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;

const Button = styled.div`
  border-radius: 50%;
  background-color: ${props => (props.selected ? props.color : 'none')};
  border: 1px solid black;
  width: 30px;
  height: 30px;
`;

const App = props => (
  <Query query={ALL_LIFTS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Loading</div>;
      }
      if (error) {
        return <div>Error: ${error.message}</div>;
      }
      return data.allLifts.map(lift => (
        <div key={lift.id}>
          <p>
            {lift.name}
            <Mutation mutation={LIFT_STATUS_MUTATION}>
              {changeStatus => (
                <Button
                  selected={lift.status == 'OPEN'}
                  color="green"
                  onClick={() =>
                    changeStatus({ variables: { id: lift.id, status: 'OPEN' } })
                  }
                />
              )}
            </Mutation>
            <Mutation mutation={LIFT_STATUS_MUTATION}>
              {changeStatus => (
                <Button
                  selected={lift.status == 'HOLD'}
                  color="yellow"
                  onClick={() =>
                    changeStatus({ variables: { id: lift.id, status: 'HOLD' } })
                  }
                />
              )}
            </Mutation>
            <Mutation mutation={LIFT_STATUS_MUTATION}>
              {changeStatus => (
                <Button
                  selected={lift.status == 'CLOSED'}
                  color="red"
                  onClick={() =>
                    changeStatus({
                      variables: { id: lift.id, status: 'CLOSED' },
                    })
                  }
                />
              )}
            </Mutation>
            {/* <h3>Trails</h3>
            <ul>
              {lift.trails.map(trail => (
                <li
                  // key={trail.id}
                  style={{ paddingLeft: '20px' }}
                >
                  {trail.name}
                </li>
              ))}
            </ul> */}
          </p>
          {console.log('trails!', lift.trails)}
        </div>
      ));
    }}
  </Query>
);

export default App;
