import React from 'react';
import { UsersDataServiceConsumer } from '../users-data-service-context';

const withUsersDataService = () => (Wrapped) => {
  return (props) => {
    return (
      <UsersDataServiceConsumer>
        {
          (usersDataService) => {
            return (<Wrapped {...props}
                     usersDataService={usersDataService}/>);
          }
        }
      </UsersDataServiceConsumer>
    );
  };
};

export default withUsersDataService;
