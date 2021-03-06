import React, { Component, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const UserRow = ({ user }) => {
  const {
    id,
    firstName,
    lastName,
    email,
    gender,
    ipAddress,
    totalClicks,
    totalPageViews,
  } = user;

  const history = useHistory();
  const onClick = useCallback(() => {
    history.push(`user/${id}`);
  }, [history, id]);

  return (
    <tr onClick={onClick}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{ipAddress}</td>
      <td>{totalClicks}</td>
      <td>{totalPageViews}</td>
    </tr>
  );
};

class RenderRows extends Component {
  render() {
    const { statistics } = this.props;

    return (
      <tbody>
        {statistics.data.finalUsersList.map((user) => {
          return <UserRow key={user.id} user={user} />;
        })}
      </tbody>
    );
  }
}

export default RenderRows;
