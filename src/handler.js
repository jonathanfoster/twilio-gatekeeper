module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'twilio-gatekeeper function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
