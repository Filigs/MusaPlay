// exemplo catchy CMS

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import dbConnect from "../dbConnect";
// import User from "../../../models/User";
// import sendConfirmationEmail from "./send-confirmation-email";
// import generateToken from "./GenerateToken";

// export async function GET(request) {
//   const baseUrl = request.nextUrl.clone().origin;
//   const pathname = request.nextUrl.pathname;
//   const email = request.nextUrl.searchParams.get("email");
//   if (email) {
//     // Handle email verification logic
//     await dbConnect();
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (user) {
//       return new NextResponse(
//         JSON.stringify({ message: "Email already in use", exists: true }),
//         {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } else {
//       return new NextResponse(
//         JSON.stringify({ message: "Email available", exists: false }),
//         {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
//   }
//   if (pathname.endsWith("/register")) {
//     // Redirect to the registration page
//     return NextResponse.redirect(`${baseUrl}/register`);
//   } else if (pathname.includes("/register/verify")) {
//     // Handle verification logic here or redirect to the verification page
//     // Extract token from the query and proceed with verification logic
//     const token = request.nextUrl.searchParams.get("token");
//     // ... Verification logic ...

//     // After successful verification, redirect to a success page
//     return NextResponse.redirect(`${baseUrl}/app/register/finish`);
//   } else {
//     // For any other path under '/register', decide how to handle
//     return new NextResponse("Not Found", { status: 404 });
//   }
// }

// async function parseJSONBody(request) {
//   const { readable, writable } = new TransformStream();
//   request.body.pipeTo(writable);
//   const stream = new Response(readable).body;
//   const reader = stream.getReader();
//   let receivedValue = "";

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     receivedValue += new TextDecoder().decode(value, { stream: true });
//   }

//   return JSON.parse(receivedValue);
// }

// export async function POST(request) {
//   try {
//     await dbConnect();

//     // Parse the JSON body from the request stream
//     const body = await parseJSONBody(request);
//     let { firstName, lastName, email, password } = body;
//     function formatSingleName(name) {
//       return name
//         .split(" ")[0] // Take only the first part if there's more than one name
//         .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
//     }
//     // Trim and sanitize inputs
//     firstName = formatSingleName(firstName.trim());
//     lastName = formatSingleName(lastName.trim());
//     email = email.trim().toLowerCase(); // Ensuring email is in lower case
//     password = password.trim();

//     // Check if all fields are provided and not empty after trimming
//     if (!firstName || !lastName || !email || !password) {
//       return new NextResponse(
//         JSON.stringify({ message: "All fields are required" }),
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return new NextResponse(
//         JSON.stringify({ message: "Email already in use" }),
//         { status: 409 }
//       );
//     }

//     // Hash the password
//     const hashedPassword = bcrypt.hashSync(password, 10);

//     // Generate token

//     const emailToken = generateToken();
//     const emailTokenExpires = new Date(Date.now() + 3600000);
//     console.log("Generated token:", emailToken); // Directly log the token
//     // Create user in the database
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       emailToken: emailToken,
//       emailTokenExpires: emailTokenExpires,
//       isVerified: false,
//     });
//     // Log the user object to verify the token is attached
//     console.log("Created user:", user);

//     // Check if the token is undefined for some reason
//     if (typeof user.emailToken === "undefined") {
//       throw new Error("Email token is undefined.");
//     }

//     // Ensure user creation and token generation were successful
//     if (!user || !user.emailToken) {
//       throw new Error("Failed to create user or generate email token.");
//     }

//     // Send verification email
//     await sendConfirmationEmail(email, user.emailToken);

//     return new NextResponse(
//       JSON.stringify({
//         message:
//           "Registration successful. Please check your email to verify your account.",
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return new NextResponse(
//       JSON.stringify({
//         message: "Internal server error",
//         error: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

// Additional handlers (GET, PUT, DELETE, etc.) as needed
