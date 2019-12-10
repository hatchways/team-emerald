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

import ListDetailsDialog from './ListDetailsDialog';
import {
  getPublicProfile,
  clearGetPublicListsErrors,
  clearGetPublicUserErrors,
} from '../../actions/public-profile';
import { GET_PUBLIC_LISTS } from '../../actions/types';

import { createLoadingSelector } from '../../reducers/loading';
import { createErrorMessageSelector } from '../../reducers/error';

const defaultImage = `${process.env.PUBLIC_URL}/assets/image-upload-icon.png`;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
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
  const hrefParams = window.location.href.split('/');
  const userId =
    hrefParams[hrefParams.length - 2] === 'public'
      ? hrefParams[hrefParams.length - 1]
      : '';
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [listToDisplay, setlistToDisplay] = useState(null);

  const handleClickOpen = list => {
    setOpen(true);
    setlistToDisplay(list);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line no-unused-vars, no-shadow
  const {
    name,
    getPublicProfile,
    clearGetPublicListsErrors,
    clearGetPublicUserErrors,
    // eslint-disable-next-line no-unused-vars
    error,
    lists,
    loading,
  } = props;

  useEffect(() => {
    // clearGetPublicUserErrors();
    // clearGetPublicListsErrors();
    if (userId) getPublicProfile(userId);
  }, [
    clearGetPublicListsErrors,
    clearGetPublicUserErrors,
    getPublicProfile,
    userId,
  ]);

  return (
    <Container className={classes.root}>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">{`${name}'s Shopping Lists:`}</Typography>

          <div className={classes.cardContainer}>
            {mapListsToCards(lists, classes, handleClickOpen)}
            <ListDetailsDialog
              open={open}
              handleClose={handleClose}
              list={listToDisplay}
            />
          </div>
        </Box>
      )}
    </Container>
  );
}

ShoppinglistsPublic.propTypes = {
  name: PropTypes.string.isRequired,
  getPublicProfile: PropTypes.func.isRequired,
  clearGetPublicUserErrors: PropTypes.func.isRequired,
  clearGetPublicListsErrors: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

const errorSelector = createErrorMessageSelector([GET_PUBLIC_LISTS]);
const loadingSelector = createLoadingSelector([GET_PUBLIC_LISTS]);

const mapStateToProps = state => ({
  name: state.publicProfile.user ? state.publicProfile.user.name : '',
  lists: state.publicProfile.lists,
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
