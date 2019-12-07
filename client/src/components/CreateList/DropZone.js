/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '20rem',
    height: '20.8rem',

    boxShadow: theme.boxShadowTheme,

    padding: theme.spacing(2),

    '& img': {
      margin: theme.spacing(1),
    },
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgIcon: {
    width: '4.6rem',
    height: '4.6rem',
  },
  imgSelected: {
    width: '70%',
    height: '70%',
  },
}));

// HOC that takes a dropHandler and returns a function with
// takes a list of accepted files and returns their previews
const withPreviews = dropHandler => (accepted, rejected) => {
  const acceptedWithPreview = accepted.map(file => {
    const newFile = file;
    newFile.preview = URL.createObjectURL(file);
    return newFile;
  });

  dropHandler(acceptedWithPreview, rejected);
};

const clearPreviews = files =>
  files.forEach(file => URL.revokeObjectURL(file.preview));

function DropZone(props) {
  const [files, setFiles] = useState([]);

  useEffect(() => () => clearPreviews(files));

  const handleDrop = useCallback(accepted => setFiles(accepted), []);

  const onDrop = withPreviews(handleDrop);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false, // disable select or drop multiple files
    maxSize: 1048576,
    onDrop,
  });

  const { filesRef, setFilesRef } = props;
  filesRef.current = files;
  setFilesRef.current = setFiles;

  const classes = useStyles();
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <div className={classes.root}>
        {files.length ? (
          files.map(file => {
            return (
              <div key={file.path} className={classes.imgContainer}>
                <img
                  src={file.preview}
                  className={classes.imgSelected}
                  alt={file.path}
                />
                <Typography variant="caption">{file.path}</Typography>
              </div>
            );
          })
        ) : (
          <>
            <img
              className={classes.imgIcon}
              src={`${process.env.PUBLIC_URL}/assets/image-upload-icon.png`}
              alt="img upload icon"
            />
            <Typography variant="caption">Drop an image here</Typography>
            <Typography variant="caption">or select a file</Typography>
          </>
        )}
      </div>
    </div>
  );
}

DropZone.propTypes = {
  filesRef: PropTypes.shape({ current: PropTypes.array }).isRequired,
  setFilesRef: PropTypes.shape({ current: PropTypes.func }).isRequired,
};

export default DropZone;
