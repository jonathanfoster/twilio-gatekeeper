# Twilio Gatekeeper

[![Build Status](https://travis-ci.org/jonathanfoster/twilio-gatekeeper.svg?branch=master)](https://travis-ci.org/jonathanfoster/twilio-gatekeeper)
[![Coverage Status](https://coveralls.io/repos/github/jonathanfoster/twilio-gatekeeper/badge.svg?branch=master)](https://coveralls.io/github/jonathanfoster/twilio-gatekeeper?branch=master)

Twilio Gatekeeper is an automated access control system (ACS) for gated communities and apartment buildings. Gatekeeper prompts 
visitors for a passcode and if correct, dials a specific number to grant access using the standard telephone entry 
systems found in most communities.

Gatekeeper uses [Twilio](https://www.twilio.com), [Serverless](https://serverless.com), and [AWS Lambda](https://aws.amazon.com/lambda/).

## Features

Gatekeeper provides the following features:

* Grant access using passcode
* Restrict passcode attempts
* Dial operator for assistance

## Prerequisites

Before getting started, make sure the following prerequisites are met:

* [AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
* [Twilio account](https://www.twilio.com/try-twilio)
* [Node.js](https://nodejs.org/)

## Getting Started

1. Clone this repo
2. Install dependencies

    ```bash
    npm install
    ```

3. Configure your environment

    ```bash
    echo "GATEKEEPER_ACCESS_TONE=$YOUR_ACCESS_TONE
    GATEKEEPER_MAX_ATTEMPTS=$YOUR_MAX_ATTEMPTS
    GATEKEEPER_OPERATOR=$YOUR_OPERATOR_NUMBER
    GATEKEEPER_PASSCODE=$YOUR_PASSCODE
    GATEKEEPER_URL=$YOUR_SERVICE_URL" > .env
    ```

4. Deploy to AWS

    ```bash
    npm run deploy
    ```

5. Run end-to-end tests to confirm deployment

    ```bash
    npm run test:e2e
    ```

## Configuring Twilio

To configure Twilio to respond to incoming calls from your ACS, you must:

1. Buy and configure a Twilio phone number
2. Configure the phone number to send a request to your service when a call comes in

Twilio already has these steps covered in their [Responding to Incoming Phone Calls](https://www.twilio.com/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls-node-js#buy-and-configure-a-phone-number)
tutorial.

## Updating ACS Contact Number

Finally, contact your community manager and have them change your ACS phone number to the Twilio number above. 

You may want to use a [Google Voice](https://voice.google.com/) number for the initial call and then forward to your 
Twilio number. This way you don't have contact your community manager again to change numbers in the future.

## Using a Custom Domain

You can use a custom domain for your service by using the [Serverless Domain Manager](https://github.com/amplify-education/serverless-domain-manager)
plugin. See [How to set up a custom domain name for Lambda & API Gateway with Serverless](https://serverless.com/blog/serverless-api-gateway-domain/)
for more details on setting up a custom domain and certificate using Route53 and Certificate Manager.

Add the following to `serverless.yml`.

```yaml
plugins:
  - serverless-domain-manager

custom:
  customDomain:
    domainName: $YOUR_DOMAIN_NAME
    certificateName: $YOUR_CERTIFICATE_NAME
    createRoute53Record: true
```

**Note:** `serverless.yml` is configured for a custom domain and certificate by default. If this is not necessary for 
your use case, then simply remove the `customDomain` section.
