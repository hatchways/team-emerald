/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  AppBar,
  Avatar,
  Container,
  List,
  ListItem,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import { getFollows, clearGetFollowsErrors } from '../../actions/follows';
import { getPeople, clearGetPeopleErrors } from '../../actions/discover';

import FollowButton from '../FollowButton';

const defaultImage = `${process.env.PUBLIC_URL}/assets/image-upload-icon.png`;

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: 'white',
    minHeight: '70vh',
    boxShadow: theme.boxShadowTheme,
  },
  listItem: {
    borderBottom: '1px solid #d9d9d9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: theme.spacing(30),
  },
  indicator: {
    backgroundColor: '#f25350',
    height: '3px',
  },
  appBar: {
    backgroundColor: 'transparent',
    color: '#202020',
    boxShadow: 'none',
    marginTop: theme.spacing(4),
  },
  name: {
    width: '100%',
    fontSize: theme.typography.fontSize * 1.6,
  },
  followButtonContainer: {
    marginRight: theme.spacing(3),
  },
  avatar: {
    height: '15rem',
    width: '15rem',
    margin: theme.spacing(4),
  },
}));

function FolloweeListItem({ name, photoUrl, id, classes }) {
  return (
    <ListItem className={classes.listItem}>
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
    </ListItem>
  );
}

function FolloweesList(props) {
  const {
    user,
    discover,
    getFollows,
    clearGetFollowsErrors,
    getPeople,
    clearGetPeopleErrors,
  } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  const following = Object.values(discover)
    .filter(person => person.isFollowed)
    .map(person => (
      <FolloweeListItem {...person} classes={classes} key={person.id} />
    ));

  const suggested = Object.values(discover)
    .filter(person => !person.isFollowed)
    .map(person => (
      <FolloweeListItem {...person} classes={classes} key={person.id} />
    ));

  const handleChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (!user) return;

    // getFollows fetch all of the user's followees
    clearGetFollowsErrors();
    getFollows(user.id);

    // getPeople fetches all the users in the db.
    // TO DO: fetch suggested users instead
    clearGetPeopleErrors();
    getPeople(user.id);
  }, [
    clearGetFollowsErrors,
    clearGetPeopleErrors,
    getFollows,
    getPeople,
    user,
  ]);

  return (
    <div>
      <Container maxWidth="md">
        <AppBar position="static" classes={{ root: classes.appBar }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="fullWidth"
            classes={{ indicator: classes.indicator }}
          >
            <Tab label="Following" />
            <Tab label="Suggested" />
          </Tabs>
        </AppBar>
        <List className={classes.list} value={tabIndex} hidden={tabIndex !== 0}>
          {following}
        </List>
        <List className={classes.list} value={tabIndex} hidden={tabIndex !== 1}>
          {suggested}
        </List>
      </Container>
    </div>
  );
}

FolloweeListItem.propTypes = {
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

FolloweesList.propTypes = {
  user: PropTypes.object.isRequired,
  discover: PropTypes.object.isRequired,
  getFollows: PropTypes.func.isRequired,
  clearGetFollowsErrors: PropTypes.func.isRequired,
  getPeople: PropTypes.func.isRequired,
  clearGetPeopleErrors: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
  user: state.auth.user,
  discover: state.discover,
});

const mapDispatchToProps = {
  getFollows,
  clearGetFollowsErrors,
  getPeople,
  clearGetPeopleErrors,
};

export default connect(mapSateToProps, mapDispatchToProps)(FolloweesList);
