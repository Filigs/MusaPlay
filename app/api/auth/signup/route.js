import dbConnect from '../../dbConnect';
import User from '@/app/models/User';
import sendJWTTokenCookie from '../../utils/sendJWTTokenCookie';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  try {
    // Connect to the database
    await dbConnect();

    const req = await request.json();
    console.log(req);

    const {
      name,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      profile,
      type,
    } = req;
    console.log(name);

    const requiredFields = [
      'name',
      'firstName',
      'lastName',
      'email',
      'password',
      'passwordConfirm',
      'profile',
      'type',
    ];
    const missingFields = requiredFields.filter((field) => !req[field]);

    if (missingFields.length > 0) {
      return new NextResponse(
        JSON.stringify({
          status: 'fail',
          errors: missingFields.reduce((errors, field) => {
            errors[field] = `Please provide your ${field}`;
            return errors;
          }, {}),
        }),
        { status: 400 }
      );
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          status: 'fail',
          errors: {
            email: 'Email is already in use',
          },
        }),
        { status: 400 }
      );
    }

    const newUser = await User.create({
      name,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      profile,
      type,
    });

    //sendJWTTokenCookie(newUser, 201, req.res);

    return new NextResponse(
      JSON.stringify({ status: 'success', user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      return new NextResponse(
        JSON.stringify({
          status: 'fail',
          errors: validationErrors,
        }),
        { status: 400 }
      );
    }

    // Handle MongoDB duplicate key error
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const duplicateValue = error.keyValue[duplicateField];

      return new NextResponse(
        JSON.stringify({
          status: 'fail',
          errors: {
            [duplicateField]: `${duplicateField} '${duplicateValue}' is already in use`,
          },
        }),
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Error in signup route:', error);
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: 'An error occurred during signup',
      }),
      { status: 500 }
    );
  }
};

export default { POST };
