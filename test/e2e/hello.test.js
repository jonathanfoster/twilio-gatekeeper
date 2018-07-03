/* eslint-disable arrow-body-style */
require('dotenv').config();
const { assert } = require('chai');
const request = require('axios');

describe('GET /hello', () => {
  it('should return 200', () => {
    return request(`${process.env.TEST_URL}/hello`)
      .then((res) => {
        assert.equal(res.status, 200);
      });
  });
});
