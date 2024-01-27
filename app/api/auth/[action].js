import User from '../../models/user';
import catchAsync from '../../utils/catchAsync';
import Email from '../../services/email';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AppError from '../utils/AppError';

const getJWTToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendJWTTokenCookie = (user, statusCode, res) => {
  const token = getJWTToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    profile: req.body.profile,
    type: req.body.type,
  });

  const url = `${req.protocol}://${req.get('host')}/myDetails`;
  await new Email(newUser, url).sendWelcome();

  sendJWTTokenCookie(newUser, 201, res);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Provide an email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  sendJWTTokenCookie(user, 200, res);
});

export const isLoggedIn = catchAsync(async (req, res) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new AppError(
      "You are not logged in, because you don't have a token",
      401
    );
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(verifyToken.id);

  if (!currentUser) {
    throw new AppError('The user no longer exists', 401);
  }

  if (currentUser.changedPasswordAfter(verifyToken.iat)) {
    throw new AppError('User recently changed password. Log in again', 401);
  }

  req.user = currentUser;
  res.locals.user = currentUser;

  res.status(200).json({ status: 'success', user: currentUser });
});

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

export const forgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new AppError('There is no user with that email address', 404);
  }

  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  const buildResetURL = `${req.protocol}://${req.get(
    'host'
  )}/user/resetPassword/${resetToken}`;

  try {
    await new Email(user, buildResetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'URL to reset password sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new AppError('Something went wrong in the email service', 500);
  }
});

export const resetPassword = catchAsync(async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = getJWTToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

export const updatePassword = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.checkPassword(req.body.passwordCurrent, user.password))) {
    throw new AppError('Your current password is wrong.', 401);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  sendJWTTokenCookie(user, 200, res);
});
