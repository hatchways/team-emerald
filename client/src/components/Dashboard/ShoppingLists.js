import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CreateList from '../CreateList/CreateList';

const mockData = [
  {
    img: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    title: 'Scented Candles',
    items: [],
  },
  {
    img: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    title: 'Scented Candles',
    items: [],
  },
  {
    img: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    title: 'Scented Candles',
    items: [],
  },
];

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    maxWidth: 1100,
    padding: '60px 0',
  },
  media: {
    height: 240,
  },
  cardContent: {
    height: 90,
    margin: 0,
    padding: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
});

export default function Shoppintlists() {
  const [cards, setCards] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setCards(mockData);
  }, []);
  return (
    <Container>
      <div className={classes.container}>
        <Typography variant="h5" gutterBottom style={{ width: '100%' }}>
          My Shopping Lists:
        </Typography>
        {cards.map(card => (
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={card.img}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.cardContent}>
                <Typography noWrap variant="h6" align="center">
                  {card.title}
                </Typography>
                <Typography
                  noWrap
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  {`${card.items.length} items`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <CreateList />
        {/* <Card className={classes.card}>
            <CardActionArea>
              <CardContent 
                className={classes.cardContent}
                style={{ height: 330 }}
              >
                <Typography 
                  variant='h2'
                  color='primary'
                  align='center'
                  >
                  +
                </Typography>
                <Typography 
                  gutterBottom
                  variant='h6'
                  align='center'
                  >
                  ADD NEW LIST
                </Typography>
              </CardContent>
          </CardActionArea>
        </Card> */}
      </div>
    </Container>
  );
}
