import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const tileStyles = {
  width: 240,
  height: 330,
  padding: 0,
  margin: 10,
  borderRadius: 7,
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0px 2px 6px #ccf',
};

const imgStyles = {
  height: 245,
};

const tileTextStyles = {
  height: 80,
  display: 'flex',
  flexFlow: 'column nowrap',
  overflow: 'scroll',
  justifyContent: 'center',
  alignItems: 'center',
};

const tileTitleStyles = {
  textStyle: 'bold',
  fontSize: '1em',
};

const itemCountStyles = {
  color: '#999',
  fontSize: '0.8em',
};

export default function Shoppintlists(props) {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    setTiles(mockData);
  }, []);
  return (
    <Container maxWidth={'lg'}>
      <h3>My Shopping Lists:</h3>
      <GridList>
        {tiles.map(tile => (
          <GridListTile key={tile.img} style={tileStyles}>
            <img src={tile.img} alt={tile.title} style={imgStyles} />
            <div style={tileTextStyles}>
              <span style={tileTitleStyles}>{tile.title}</span>
              <span style={itemCountStyles}>
                {tile.items.length + ' items'}
              </span>
            </div>
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}

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
  {
    img: 'https://www.candles4less.com/assets/images/lavender-4x6-candles.jpg',
    title: 'Scented Candles',
    items: [],
  },
];
