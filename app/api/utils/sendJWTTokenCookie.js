const sendJWTTokenCookie = (user, statusCode, req, res) => {
  //this function will send the JWT token generated to the client in a cookie file for security reasons
  console.log('Inside sendJWTTokenCookie'); // Add logs
  const token = getJWTToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), //converts days into ms

    //secure: true , we should removed from here, but basicly if sets to true only works for https protocol

    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true; //set cookie functionality https only into prod env
  }

  res.cookie('jwt', token, cookieOptions); //sends cookie to the client

  user.password = undefined; //removes the password from the output setting to undefined but won't save it on the db because we dont commit with .save()

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

export default sendJWTTokenCookie;

const getJWTToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    // validating the login with JWT. Check also config.env file where the secret is defined.

    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
