import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { getFollows, clearGetFollowsErrors } from '../../actions/follows';

function FolloweesList(props) {
  // eslint-disable-next-line no-shadow
  const { user, getFollows, clearGetFollowsErrors } = props;

  useEffect(() => {
    if (!user) return;

    clearGetFollowsErrors();
    getFollows(user.id);
  }, [user, getFollows, clearGetFollowsErrors]);
  return <Container>Follows</Container>;
}

FolloweesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  discover: PropTypes.object.isRequired,
  getFollows: PropTypes.func.isRequired,
  clearGetFollowsErrors: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  user: state.auth.user,
  discover: state.discover,
});

const mapDispatchToProps = {
  getFollows,
  clearGetFollowsErrors,
};

export default connect(mapSateToProps, mapDispatchToProps)(FolloweesList);
