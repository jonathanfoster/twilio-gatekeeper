/* eslint-disable arrow-body-style */
require('dotenv').config();
const { assert } = require('chai');
const request = require('axios');

describe('POST /hello', () => {
  it('should return 200', () => {
    return request.post(`${process.env.TEST_URL}/hello`)
      .then((res) => {
        assert.equal(res.status, 200);
      });
  });

  it('content type should be `application/xml`', () => {
    return request.post(`${process.env.TEST_URL}/hello`)
      .then((res) => {
        assert.equal(res.headers['content-type'], 'application/xml');
      });
  });

  it('should say `please enter the passcode`', () => {
    return request.post(`${process.env.TEST_URL}/hello`)
      .then((res) => {
        assert.equal(res.data, '<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">Please enter the passcode.</Say></Response>');
      });
  });
});
