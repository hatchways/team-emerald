import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@material-ui/core';

import CreateList from '../CreateList/CreateList';

// mock data to test out the component's functionality
// the actual data will be passed as props from the redux store
const mockData = [
  {
    img: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    title: 'Scented Candles',
    items: ['item1', 'item2', 'item3'],
  },
  {
    img: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    title: 'Scented Candles',
    items: ['item1', 'item2'],
  },
  {
    img: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    title: 'Scented Candles',
    items: ['item1'],
  },
];

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

function mapListsToCards(shoppingLists, classes) {
  return shoppingLists.map(sl => (
    <Card>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => console.log('Add New Item Form Dialog should trigger')} // eslint-disable-line
      >
        <CardMedia
          component="img"
          src={sl.img}
          title={sl.title}
          className={classes.cardMedia}
        />
        <CardContent>
          <Typography noWrap variant="body1" align="center">
            {sl.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {`${sl.items.length} item${sl.items.length > 1 ? 's' : ''}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
}

function Shoppinglists(props) {
  const classes = useStyles(props);

  return (
    <Container className={classes.root}>
      <Typography variant="h6">My Shopping Lists:</Typography>

      <div className={classes.cardContainer}>
        {mapListsToCards(mockData, classes)}
        <CreateList />
      </div>
    </Container>
  );
}

export default Shoppinglists;
