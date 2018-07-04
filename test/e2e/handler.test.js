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

  it('should forward call to operator when requested', () => {
    return request.post(`${config.baseURL}/authorize`, querystring.stringify({ Digits: '0' }))
      .then((res) => {
        xml2js.parseString(res.data, (err, result) => {
          if (err) {
            assert.fail(err);
            return;
          }

          assert.equal(result.Response.Dial[0], config.operator);
        });
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

          assert.equal(result.Response.Gather[0].$.action, `${config.baseURL}/authorize?attempt=2`);
          assert.equal(result.Response.Gather[0].$.method, 'POST');
          assert.exists(result.Response.Gather[0].Say);
        });
      });
  });

  it('should disconnect after 3 incorrect attempts', () => {
    return request.post(`${config.baseURL}/authorize?attempt=3`)
      .then((res) => {
        xml2js.parseString(res.data, (err, result) => {
          if (err) {
            assert.fail(err);
            return;
          }

          assert.exists(result.Response.Hangup[0]);
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
          assert.exists(result.Response.Gather[0].Say);
        });
      });
  });
});

describe('GET /version', () => {
  it('should return 200', () => {
    return request(`${config.baseURL}/version`)
      .then((res) => {
        assert.equal(res.status, 200);
      });
  });

  it('should return version', () => {
    return request(`${config.baseURL}/version`)
      .then((res) => {
        assert.exists(res.data.version);
      });
  });
});
