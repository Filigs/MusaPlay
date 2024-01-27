export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode.startsWith('4') ? 'fail' : 'error'}`; // Fix the syntax error here
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
