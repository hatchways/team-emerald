const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../middleware/error');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const { BUCKET_NAME, UPLOAD_DIRNAME } = process.env;

const upload = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.file) {
    next(new ErrorResponse('File is undefined', 400));
    return;
  }

  const { file } = req.files;
  const filename = uuid();

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${UPLOAD_DIRNAME}/${filename}`,
    Body: file.data,
  };

  s3.upload(params, (s3Err, s3Res) => {
    if (s3Err) return next(s3Err);
    const location = s3Res.Location;

    // TODO: Save filename and location to current user in db

    return res.status(201).json({ url: location });
  });
});

module.exports = { upload };
