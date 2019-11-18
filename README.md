# grav.client

 A Gravatar API client for Node.js with Promises.
 
 ---
 
[![Build Status](https://travis-ci.com/mrtillman/grav.client.svg?branch=master)](https://travis-ci.com/mrtillman/grav.client)
[![Coverage Status](https://coveralls.io/repos/github/mrtillman/grav.client/badge.svg?branch=master)](https://coveralls.io/github/mrtillman/grav.client?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/mrtillman/grav.client/badge.svg)](https://snyk.io/test/github/mrtillman/grav.client)
[![npm version](https://badge.fury.io/js/grav.client.svg)](https://badge.fury.io/js/grav.client)

[![NPM](https://nodei.co/npm/grav.client.png)](https://nodei.co/npm/grav.client/)

 Please refer to the official Gravatar XML-RPC API documentation for more details:
 https://en.gravatar.com/site/implement/xmlrpc. 
 
 You can also try it out using [Postman](https://learning.getpostman.com/):

 [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e27a4edf756f4cbe80b5)

To learn more, see the [unofficial API docs](https://documenter.getpostman.com/view/1403721/Rztpr87i).

## Table of Contents

- [Installation](#Installation)
- [Tests](#Tests)
- [Usage](#Usage)
    + [Methods](#Methods)
    + [Parsers](#Parsers)
    + [Examples](#Examples)
- [License](#License)


## Installation

```sh
  npm install grav.client
```

## Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# acceptance tests
$ npm run test:spec
```

## Usage

```javascript
 
  const { Grav } = require('grav.client');

  const grav = Grav.login("user@example.com", "password");

  grav.test().then(data => ... );

 ```
 
## Methods
 
|Method     | Description  |
|-----------|--------------|
| `grav.exists()` | returns a gravatar if the account exists |
| `grav.addresses()` | returns all email addresses for this account |
| `grav.userImages()` | returns all gravatar images for this account  |
| `grav.saveImage(imageFilePath,rating)` | upload an image |
| `grav.saveEncodedImage(base64String,mimetype,rating)` | upload a base64 encoded image |
| `grav.saveUrl(imageUrl,rating)` | save image url |
| `grav.useUserImage(imageName)` | set primary gravatar icon using an image from this account  |
| `grav.removeImage()` | set default Gravatar logo as the primary icon for this account |
| `grav.deleteUserImage(imageName)` | remove an image from this account |
| `grav.test()` | sanity check |
 
 For more examples, be sure to check out the [demos](https://github.com/mrtillman/grav.client/tree/master/demo).

 Sample method responses may be found [here](https://github.com/mrtillman/grav.client/tree/master/spec/responses).

## License
[MIT](https://github.com/mrtillman/grav.client/blob/master/LICENSE.md)
