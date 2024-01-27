export default (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    console.error('Error in API route:', error);
    next(error);
  }
};
