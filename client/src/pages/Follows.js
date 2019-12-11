/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { getPeople } from '../actions/people';

function Follows(props) {
  // eslint-disable-next-line no-shadow
  const { people, getPeople } = props;

  useEffect(() => {
    getPeople();
  }, [getPeople]);
  return <Container>Follows</Container>;
}

Follows.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  people: PropTypes.object.isRequired,
  getPeople: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  people: state.people,
});

const mapDispatchToProps = {
  getPeople,
};

export default connect(mapSateToProps, mapDispatchToProps)(Follows);
