/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { getFollows, clearGetFollowsErrors } from '../actions/follows';

function Follows(props) {
  // eslint-disable-next-line no-shadow
  const { discover, getFollows, clearGetFollowsErrors } = props;

  useEffect(() => {
    clearGetFollowsErrors();
    getFollows();
  }, [getFollows, clearGetFollowsErrors]);
  return <Container>Follows</Container>;
}

Follows.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  discover: PropTypes.object.isRequired,
  getFollows: PropTypes.func.isRequired,
  clearGetFollowsErrors: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  discover: state.discover,
});

const mapDispatchToProps = {
  getFollows,
  clearGetFollowsErrors,
};

export default connect(mapSateToProps, mapDispatchToProps)(Follows);
