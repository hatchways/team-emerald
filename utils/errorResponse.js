/**
 * A class for creating errors for http responses.
 * @class ErrorResponse
 * @extends {Error}
 */
class ErrorResponse extends Error {
  /**
   * Creates an instance of ErrorResponse.
   * @param {string} message - the error message
   * @param {number} statusCode - the http status code
   * @memberof ErrorResponse
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
