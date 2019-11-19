/**
 * An async express middleware function.
 * @callback asyncCallback
 */

/**
 * Wraps the asyncCallback function in a promise, which
 * replaces the try/catch required for async/await syntax.
 * @param {asyncCallback} fn
 */
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
