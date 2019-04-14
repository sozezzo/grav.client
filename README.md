# grav.client

 A Gravatar API client for Node.js with Promises.
 
 ---
 
[![Build Status](https://travis-ci.com/mrtillman/grav.client.svg?branch=master)](https://travis-ci.com/mrtillman/grav.client)
[![Coverage Status](https://coveralls.io/repos/github/mrtillman/grav.client/badge.svg?branch=dev)](https://coveralls.io/github/mrtillman/grav.client?branch=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/mrtillman/grav.client/badge.svg)](https://snyk.io/test/github/mrtillman/grav.client)

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

```sh
  Test Suites: 15 passed, 15 total
  Tests:       127 passed, 127 total
  Snapshots:   0 total
  Time:        27.278s
  Ran all test suites.
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
 
## Parsers

The raw response is verbose:

```js
grav.test().then(data => console.log(data))
```
```json
{
    "_declaration": {
        "_attributes": {
            "version": "1.0"
        }
    },
    "methodResponse": {
        "params": {
            "param": {
                "value": {
                    "struct": {
                        "member": {
                            "name": {
                                "_text": "response"
                            },
                            "value": {
                                "int": {
                                    "_text": "1548902781"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Parsers are helper classes designed to normalize the raw response data:

```js
const { 
    Grav,
    ParseContext,
    TestParser
} = require('grav.client');

const testParser = new TestParser();
const context = new ParseContext(testParser);
const grav = Grav.login("user@example.com", "password");

grav.test()
    .then(data => context.parse(data))
    .then(console.log)
    .catch(console.log);
```

```js
{ response: 1548903405 }
```

The `autoParse` switch enables parsing everywhere:

```js
grav.autoParse = true;

grav.test()
    // .then(data => context.parse(data))
    .then(console.log) // auto-parsed
```

The `ParseContext` allows us to interchange different parsers at runtime:

```js
const {
  Grav, ParseContext,
  UserImagesParser, UseUserImageParser
} = require('grav.client');

const userImagesParser = new UserImagesParser();

// create context to parse user images
const context = new ParseContext(userImagesParser);
const grav = Grav.login("user@example.com", "password");

grav.userImages()
    .then(userImages => context.parse(userImages))
    .then(images => images[0])
    .then(image => grav.useUserImage(image.name))
    .then(useUserImageResponse => {

      // update context to parse the
      // "use user image" response
      context.parser = new UseUserImageParser();
      return context.parse(useUserImageResponse);
    })
    .then(console.log)
    .catch(console.log);
```

Notice how the `context` is instantiated with the `userImagesParser`, which is later swapped out for an instance of `UseUserImageParser`. We can achieve the same effect by passing the instance of `UseUserImageParser` to the `ParseContext` constructor, after the `userImagesParser`. For example: `new ParseContext(userImagesParser, useUserImageParser)`.

In general, the `ParseContext` accepts a variable number of parsers: `new ParseContext(firstParser, nextParser, ..., lastParser)`. Each call to `ParseContext.parse` executes the current parser and then loads the next one.

So, alternatively:

```js
const userImagesParser = new UserImagesParser();
const useUserImageParser = new UseUserImageParser();

// create context that will 1. parse user images
// and then 2. parse the "use user image" response
const context = new ParseContext(userImagesParser, useUserImageParser);
const grav = Grav.login(email, password);

grav.userImages()
    .then(userImages => context.parse(userImages))
    .then(images => images[0])
    .then(image => grav.useUserImage(image.name))
    .then(useUserImageResponse => {

      // context.parser = new UseUserImageParser(); // not needed
      // parser is swapped out for the next one automatically
      return context.parse(useUserImageResponse);
    })
    .then(console.log)
    .catch(console.log);
```

```js
{ response: true }
```

Each method has a corresponding parser: 

| Parser     | Method  |
|------------|--------------|
| `ExistsParser` | `grav.exists()` |
| `AddressParser` | `grav.addresses()` |
| `userImagesParser` | `grav.userImages()` |
| * `SaveUrlParser` | `grav.saveImage(imageUrl,rating)` |
| * `SaveUrlParser` | `grav.saveEncodedImage(base64String,mimetype,rating)`|
| `SaveUrlParser` | `grav.saveUrl(imageUrl,rating)` |
| `UseUserImageParser` | `grav.useUserImage(imageName)` |
| `RemoveImageParser` | `grav.removeImage()` |
| `DeleteUserImageParser` | `grav.deleteUserImage(imageName)` |
| `TestParser`| `grav.test()` |

&ast; `grav.saveImage` and `grav.saveEncodedImage` rely on `grav.saveUrl`.

### Examples
 
 For more examples, be sure to check out the [demos](https://github.com/mrtillman/grav.client/tree/master/demo).

 Sample method responses may be found [here](https://github.com/mrtillman/grav.client/tree/master/spec/responses).

## License
[MIT](https://github.com/mrtillman/grav.client/blob/master/LICENSE.md)
