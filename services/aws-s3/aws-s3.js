const uuid = require('uuid/v4');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const { BUCKET_NAME, UPLOAD_DIRNAME } = process.env;

/**
 * Uploads the file to AWS S3
 * @param {Object} file - the file to be uploaded
 * @returns {Promise} Promise object represents the success file upload to S3
 */
const upload = file => {
  const filename = uuid();

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${UPLOAD_DIRNAME}/${filename}`,
    Body: file.data,
  };

  return s3.upload(params).promise();
};

module.exports = { upload };
