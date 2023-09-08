const sendSuccess = (obj, res) => {
  let { status = 200, ...body } = obj;
  res.status(status).json(body);
};

const sendError = (obj, res) => {
  let { status = 400, ...body } = obj;
  res.status(status).json(body);
};

module.exports = { sendSuccess, sendError };
