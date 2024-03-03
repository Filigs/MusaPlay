// app/api/auth/login/route.js
import dbConnect from "../../dbConnect";
import User from "@/app/models/User";
import sendJWTTokenCookie from "../../utils/sendJWTTokenCookie";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // Connect to the database
    await dbConnect();

    const req = await request.json();
    console.log(req);
    const { email, password } = req;
    console.log(email);
    console.log(password);

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({
          authenticated: false,
          error: "Provide an email and password",
        }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
      return new NextResponse(
        JSON.stringify({
          authenticated: false,
          error: "Incorrect email or password",
        }),
        { status: 401 }
      );
    }

    //sendJWTTokenCookie(user, 200, res);

    // Return a success response
    return new NextResponse(JSON.stringify({ status: "success", user }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse(
      JSON.stringify({
        authenticated: false,
        error: "An error occurred during login",
      }),
      { status: 500 }
    );
  }
};
