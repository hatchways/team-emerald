import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Input, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DropZone from './DropZone';
import ThemeButton from '../ThemeButton';

import { createList, clearPostListErrors } from '../../actions/lists';
import { POST_LIST } from '../../actions/types';

import { createLoadingSelector } from '../../reducers/loading';
import { createErrorMessageSelector } from '../../reducers/error';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(9),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),

    height: '70rem',
  },
  input: {
    textAlign: 'center',
    boxShadow: theme.boxShadowTheme,
  },
}));

function CreateListForm(props) {
  const [name, setName] = useState('');

  const dropZoneFilesRef = useRef(null);
  const dropZoneSetFilesRef = useRef(null);

  const classes = useStyles();

  // eslint-disable-next-line no-shadow
  const { createList, clearErrors, error, loading } = props;

  useEffect(() => {
    clearErrors(); // Clear previous errors when the component mounts
  }, [clearErrors]);

  const handleSubmit = event => {
    event.preventDefault();

    createList(name, dropZoneFilesRef.current[0]);

    // Clear Data
    setName('');
    dropZoneSetFilesRef.current([]);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <Typography variant="body1">Add a title &nbsp;</Typography>
        <Typography variant="body1" color="primary">
          *
        </Typography>
      </div>

      <Input
        placeholder="Enter Name"
        name="name"
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
        classes={{ input: classes.input }}
        disableUnderline
      />

      <Typography variant="body1">Add a cover</Typography>

      <DropZone filesRef={dropZoneFilesRef} setFilesRef={dropZoneSetFilesRef} />

      {error && <Box>{error}</Box>}

      <ThemeButton
        text="Create List"
        type="submit"
        padding="2rem 3rem"
        width="26rem"
        height="6.3rem"
        disabled={!name || loading}
        loading={loading}
      />
    </form>
  );
}

CreateListForm.propTypes = {
  createList: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const errorSelector = createErrorMessageSelector([POST_LIST]);
const loadingSelector = createLoadingSelector([POST_LIST]);

const mapStateToProps = state => ({
  error: errorSelector(state),
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  createList,
  clearErrors: clearPostListErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListForm);
