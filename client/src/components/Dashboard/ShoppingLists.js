import React, { useEffect } from 'react';
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

import CreateList from '../CreateList/CreateList';

import { getLists, clearGetListsErrors } from '../../actions/lists';
import { GET_LISTS } from '../../actions/types';

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

function mapListsToCards(shoppingLists, classes, handleClickOpenList) {
  return shoppingLists.map(sl => (
    <Card key={sl.id}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => handleClickOpenList(sl)}
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

function Shoppinglists(props) {
  const classes = useStyles(props);

  const {
    getLists, // eslint-disable-line no-shadow
    clearErrors,
    error, // eslint-disable-line no-unused-vars
    lists,
    loading,
    handleClickOpenList,
    listToDisplay,
    setListToDisplay,
  } = props;

  useEffect(() => {
    clearErrors(); // Clear previous errors when the component mounts
    getLists();
  }, [clearErrors, getLists]);

  useEffect(() => {
    if (listToDisplay) {
      setListToDisplay(lists.find(list => list.id === listToDisplay.id));
    }
  }, [listToDisplay, setListToDisplay, lists]);

  return (
    <Container className={classes.root}>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">My Shopping Lists:</Typography>

          <div className={classes.cardContainer}>
            {mapListsToCards(lists, classes, handleClickOpenList)}
            <CreateList />
          </div>
        </Box>
      )}
    </Container>
  );
}

Shoppinglists.defaultProps = {
  listToDisplay: null,
};

Shoppinglists.propTypes = {
  getLists: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  handleClickOpenList: PropTypes.func.isRequired,
  listToDisplay: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    coverUrl: PropTypes.string,
    creator: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }),
  setListToDisplay: PropTypes.func.isRequired,
};

const errorSelector = createErrorMessageSelector([GET_LISTS]);
const loadingSelector = createLoadingSelector([GET_LISTS]);

const mapStateToProps = state => ({
  lists: state.list.lists,
  error: errorSelector(state),
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  getLists,
  clearErrors: clearGetListsErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shoppinglists);
