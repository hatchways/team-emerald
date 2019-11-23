import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',
  },
  addIconStyles: {
    marginBottom: theme.spacing(2),
    fontSize: '6rem',
  },
  cardText: {
    display: 'block',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

function CreateListCard(props) {
  const classes = useStyles();

  const { handleClickOpen } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={handleClickOpen}
      >
        <AddIcon
          fontSize="large"
          color="primary"
          className={classes.addIconStyles}
        />

        <Typography variant="body2" className={classes.cardText}>
          add new list
        </Typography>
      </CardActionArea>
    </Card>
  );
}

CreateListCard.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
};

export default CreateListCard;
