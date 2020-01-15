# grav.client

 A Node.js client for the [Gravatar XML-RPC API](https://en.gravatar.com/site/implement/xmlrpc)
 
 ---
 
[![Build Status](https://travis-ci.com/mrtillman/grav.client.svg?branch=master)](https://travis-ci.com/mrtillman/grav.client)
[![Coverage Status](https://coveralls.io/repos/github/mrtillman/grav.client/badge.svg?branch=master)](https://coveralls.io/github/mrtillman/grav.client?branch=master)
[![npm version](https://badge.fury.io/js/grav.client.svg)](https://github.com/mrtillman/grav.client/releases/tag/v2.2.5)

[![NPM](https://nodei.co/npm/grav.client.png)](https://www.npmjs.com/package/grav.client)

If you are just getting started, be sure to see the [Wiki](https://github.com/mrtillman/grav.client/wiki) and [API docs](https://documenter.getpostman.com/view/1403721/Rztpr87i).

 [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e27a4edf756f4cbe80b5)

## Installation

```sh
$  npm install grav.client
```

## Tests

```bash
# unit tests
$ npm run test

# end-to-end tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# acceptance tests
$ npm run test:spec
```

## Usage

```javascript
import { GravatarClient } from 'grav.client';

const client = new GravatarClient('user@example.com', 'password');

client.test().then(data => ... );
 ```
 
## Methods
 
|Method     | Description  |
|-----------|--------------|
| `client.exists()` | check if a primary image is set |
| `client.addresses()` | list account email addresses |
| `client.userImages()` | list account images |
| `client.saveImage(imageFilePath)` | upload an image |
| `client.saveEncodedImage(base64String,mimetype)` | upload an encoded image |
| `client.saveImageUrl(imageUrl)` | upload image from URL |
| `client.useUserImage(imageName)` | update primary image |
| `client.removeImage()` | remove primary image |
| `client.deleteUserImage(imageName)` | delete an image |
| `client.test()` | sanity check |


# Use Cases

**`grav.client`** ships with several [use case classes](https://github.com/mrtillman/grav.client/wiki/Use-Cases) that model different programming scenarios:

- `GetPrimaryImageUseCase`
- `LoadNextImageUseCase`
- `LoadPreviousImageUseCase`
- `SetNewImageUseCase`
- `SignInUseCase`
- `VerifyAccountUseCase`

Example:

```js
import { 
  GravatarClient,
  GetPrimaryImageUseCase
} from 'grav.client';

...

// create use case
const getPrimaryImageUseCase = new GetPrimaryImageUseCase();

// connect client
getPrimaryImageUseCase.client = new GravatarClient(email, password);

// let it rip
const primaryImageName = await getPrimaryImageUseCase.execute();
```

## License
[MIT](https://github.com/mrtillman/grav.client/blob/master/LICENSE.md)
