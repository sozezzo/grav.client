# grav.client

 A Gravatar API client for Node.js with Promises.
 
 ---
 
 Please refer to the official Gravatar XML-RPC API documentation for more details:
 https://en.gravatar.com/site/implement/xmlrpc

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
    + [Methods](#Methods)
    + [Parsers](#Parsers)
    + [Examples](#Examples)
- [License](#License)


## Installation

```sh
  npm install grav.client
```

## Usage

```javascript
 
  const { Grav } = require('grav.client');

  const grav = Grav.login("user@example.com", "password");

  grav.test().then(data => ... );

 ```
 
### Methods
 
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
 
### Parsers

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

The global `autoParse` flag will enable parsing everywhere:

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
  userImagesParser, UseUserImageParser
} = require('grav.client');

const userImagesParser = new userImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login("user@example.com", "password");

grav.userImages()
    .then(userImages => context.parse(userImages))
    .then(images => images[0])
    .then(image => grav.useUserImage(image.name))
    .then(useUserImageResponse => {
      context.parser = new UseUserImageParser();
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
 
 For more demos, be sure to check out the [examples](https://github.com/mrtillman/grav.client/tree/master/examples).

## License
[MIT](https://github.com/mrtillman/grav.client/blob/master/LICENSE.md)
