/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';

import ListDetailsDialog from '../Dashboard/ListDetailsDialog';
import TopPanel from './TopPanel';

import {
  getPublicProfile,
  clearGetPublicListsErrors,
  clearGetPublicUserErrors,
} from '../../actions/public-profile';

import { GET_PUBLICPROFILE_LISTS } from '../../actions/types';

import { createLoadingSelector } from '../../reducers/loading';
import { createErrorMessageSelector } from '../../reducers/error';

const defaultImage = `${process.env.PUBLIC_URL}/assets/image-upload-icon.png`;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '80vh',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(4),
  },
  cardActionArea: {
    width: '100%',
    height: '100%',
  },
  cardMedia: {
    height: '80%',
  },
}));

function mapListsToCards(shoppingLists, classes, handleOpen) {
  return shoppingLists.map(sl => (
    <Card key={sl.id}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => handleOpen(sl)}
      >
        <CardMedia
          component="img"
          src={sl.coverUrl ? sl.coverUrl : defaultImage}
          title={sl.name}
          className={classes.cardMedia}
        />
        <CardContent>
          <Typography noWrap variant="body1" align="center">
            {sl.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {`${sl.products.length} item${sl.products.length > 1 ? 's' : ''}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
}

function ShoppinglistsPublic(props) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [listToDisplay, setlistToDisplay] = useState(null);

  const {
    userId,
    discover,
    getPublicProfile,
    clearGetPublicListsErrors,
    clearGetPublicUserErrors,
    // eslint-disable-next-line no-unused-vars
    error,
    lists,
    loading,
  } = props;

  const handleClickOpen = list => {
    setOpen(true);
    setlistToDisplay(list);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    clearGetPublicListsErrors();
    clearGetPublicUserErrors();
    if (userId) getPublicProfile(userId);
  }, [
    userId,
    getPublicProfile,
    clearGetPublicListsErrors,
    clearGetPublicUserErrors,
  ]);

  return (
    <Container className={classes.root}>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {userId && discover[userId] ? (
            <>
              <TopPanel userId={userId} />

              <Typography variant="h6" className={classes.typography}>
                {`${discover[userId].name.toUpperCase()}'s Shopping Lists:`}
              </Typography>
            </>
          ) : null}

          {lists ? (
            <div className={classes.cardContainer}>
              {mapListsToCards(lists, classes, handleClickOpen)}
              <ListDetailsDialog
                open={open}
                handleClose={handleClose}
                list={listToDisplay}
                isPublic
              />
            </div>
          ) : null}
        </Box>
      )}
    </Container>
  );
}

ShoppinglistsPublic.propTypes = {
  userId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  discover: PropTypes.object.isRequired,
  getPublicProfile: PropTypes.func.isRequired,
  clearGetPublicUserErrors: PropTypes.func.isRequired,
  clearGetPublicListsErrors: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

const errorSelector = createErrorMessageSelector([GET_PUBLICPROFILE_LISTS]);
const loadingSelector = createLoadingSelector([GET_PUBLICPROFILE_LISTS]);

const mapStateToProps = state => ({
  lists: state.publicProfile.lists,
  discover: state.discover,
  error: errorSelector(state),
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  getPublicProfile,
  clearGetPublicUserErrors,
  clearGetPublicListsErrors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppinglistsPublic);
