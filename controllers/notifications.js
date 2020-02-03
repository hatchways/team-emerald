const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Notification = require('../models/Notification');

/**
 * @api {get} /api/v1/users/:userId/notifications
 * @apiName getNotifications
 * @apiGroup notifications
 * @apiPermission protected
 *
 * @apiDescription Get the user's notifications
 */
const getNotifications = asyncHandler(async (req, res, next) => {
  // Check if user is authorized to get notifications
  const { userId } = req.params;
  const user = req.user.toJSON();

  if (userId !== user.id) {
    return next(
      new ErrorResponse(
        `User with id ${user.id} is not authorized to get notifications`,
        401,
      ),
    );
  }

  const notifications = await Notification.find({
    user: userId,
    viewed: false,
  })
    .select('-user')
    .populate({
      path: 'product',
      select: 'name link imageUrl',
    });

  return res.status(200).json({ success: true, notifications });
});

/**
 * @api {put} /api/v1/users/:userId/notifications/notificationId
 * @apiName dismissNotification
 * @apiGroup notifications
 * @apiPermission protected
 *
 * @apiDescription Change the Notification's viewed status to true
 */
const dismissNotification = asyncHandler(async (req, res, next) => {
  // Check if user is authorized to get notifications
  const { userId, notificationId } = req.params;
  const user = req.user.toJSON();

  const notification = await Notification.findById(notificationId);

  if (notification.user.toString() !== userId && userId !== user.id) {
    return next(
      new ErrorResponse(
        `User with id ${userId} is not authorized to dismiss notification`,
        401,
      ),
    );
  }

  if (notification.viewed) {
    return next(new ErrorResponse(`Notification is already dismissed`, 400));
  }

  notification.viewed = true;
  await notification.save();

  return res.status(200).json({ success: true, notificationId });
});

module.exports = {
  getNotifications,
  dismissNotification,
};
