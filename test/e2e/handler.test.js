/* eslint-disable arrow-body-style */
require('dotenv').config();
const querystring = require('querystring');
const { assert } = require('chai');
const request = require('axios');
const xml2js = require('xml2js');
const config = require('../../src/config');

describe('POST /authorize', () => {
  it('should return 200', () => {
    return request.post(`${config.baseURL}/authorize`)
      .then((res) => {
        assert.equal(res.status, 200);
      });
  });

  it('content type should be `application/xml`', () => {
    return request.post(`${config.baseURL}/authorize`)
      .then((res) => {
        assert.equal(res.headers['content-type'], 'application/xml');
      });
  });

  it('should grant access when passcode is correct', () => {
    return request.post(`${config.baseURL}/authorize`, querystring.stringify({ Digits: config.passcode }))
      .then((res) => {
        xml2js.parseString(res.data, (err, result) => {
          if (err) {
            assert.fail(err);
            return;
          }

          assert.equal(result.Response.Play[0].$.digits, config.accessTone);
        });
      });
  });

  it('should try again when passcode is incorrect', () => {
    return request.post(`${config.baseURL}/authorize`)
      .then((res) => {
        xml2js.parseString(res.data, (err, result) => {
          if (err) {
            assert.fail(err);
            return;
          }

          assert.equal(result.Response.Gather[0].$.action, `${config.baseURL}/authorize`);
          assert.equal(result.Response.Gather[0].$.method, 'POST');
          assert.equal(result.Response.Gather[0].Say, 'The passcode you entered is incorrect. Please try again.');
        });
      });
  });
});

describe('POST /hello', () => {
  it('should return 200', () => {
    return request.post(`${config.baseURL}/hello`)
      .then((res) => {
        assert.equal(res.status, 200);
      });
  });

  it('content type should be `application/xml`', () => {
    return request.post(`${config.baseURL}/hello`)
      .then((res) => {
        assert.equal(res.headers['content-type'], 'application/xml');
      });
  });

  it('should gather passcode', () => {
    return request.post(`${config.baseURL}/hello`)
      .then((res) => {
        xml2js.parseString(res.data, (err, result) => {
          if (err) {
            assert.fail(err);
            return;
          }

          assert.equal(result.Response.Gather[0].$.action, `${config.baseURL}/authorize`);
          assert.equal(result.Response.Gather[0].$.method, 'POST');
          assert.equal(result.Response.Gather[0].Say, 'Please enter your passcode followed by the pound sign.');
        });
      });
  });
});
