import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import { getFollows, clearGetFollowsErrors } from '../../actions/follows';

import FollowButton from '../FollowButton';

const defaultImage = `${process.env.PUBLIC_URL}/assets/image-upload-icon.png`;

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    width: '100%',
    fontSize: theme.typography.fontSize * 1.6,
  },
  followButtonContainer: {
    marginRight: theme.spacing(3),
  },
  avatar: {
    width: '17rem',
    height: '17rem',
    margin: theme.spacing(4),
  },
}));

function FolloweeListItem({ name, photoUrl, id, classes }) {
  return (
    <Paper className={classes.root}>
      <Link to={`/public/${id}`}>
        <Avatar
          src={photoUrl || defaultImage}
          alt="Profile Image"
          className={classes.avatar}
        />
      </Link>
      <Typography className={classes.name}>{name}</Typography>
      <span className={classes.followButtonContainer}>
        <FollowButton userId={id} className={classes.followButton} />
      </span>
    </Paper>
  );
}

function FolloweesList(props) {
  // eslint-disable-next-line no-shadow
  const { user, discover, getFollows, clearGetFollowsErrors } = props;
  const classes = useStyles();

  const followees = Object.values(discover).filter(person => person.isFollowed);

  useEffect(() => {
    if (!user) return;

    clearGetFollowsErrors();
    getFollows(user.id);
  }, [user, getFollows, clearGetFollowsErrors]);
  return (
    <Container maxWidth="lg">
      {followees.map(person => (
        <FolloweeListItem {...person} classes={classes} key={person.id} />
      ))}
    </Container>
  );
}

FolloweeListItem.propTypes = {
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

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
