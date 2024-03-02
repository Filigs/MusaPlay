// catchAsync.js
export default (handler) => async (req, res, customNext) => {
  try {
    await handler(req, res, customNext);
  } catch (error) {
    console.error('Error in API route:', error);
    customNext(error);
  }
};
