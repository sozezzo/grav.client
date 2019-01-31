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
| `grav.exists()` | check whether a hash has a gravatar |
| `grav.addresses()` | get a list of addresses for this account |
| `grav.userimages()` | return an array of userimages for this account |
| `grav.saveData()` | save binary image data as a userimage for this account  |
| `grav.saveUrl()` | read an image via its URL and save that as a userimage for this account |
| `grav.useUserimage()` | use a userimage as a gravatar for one of more addresses on this account |
| `grav.removeImage()` | remove the userimage associated with one or more email addresses |
| `grav.deleteUserimage()` | remove a userimage from the account and any email addresses with which it is associated |
| `grav.test()` | a test function |
 
### Parsers

Parsers are helper modules designed to normalize the raw JSON response data.

```js
grav.test().then(data => console.log(data)) // raw
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

```js
const { 
    ParseContext,
    TestParser
} = require('../index');

const testParser = new TestParser();
const parseContext = new ParseContext(testParser);
const grav = Grav.login("user@example.com", "password");

grav.test().then(data => {
  const response = parseContext.parse(data); // parsed
  console.log(data);
})
```

```js
{ response: 1548903405 }
```

Notice how the `testParser` is instantiated and then passed to the `parseContext`. This allows us to define a family of parsers that may be interchanged during runtime:

```js
const {
  Grav, ParseContext,
  UserImagesParser, UseUserImageParser
} = require('../index');

const userImagesParser = new UserImagesParser();
const context = new ParseContext(userImagesParser);
const grav = Grav.login(creds.email, creds.password);

// collect all avatars
grav.userimages().then(userImagesResponse => {
  // pick one
  const images = context.parse(userImagesResponse);
  const selectedImage = images[0];
  // set as primary avatar
  grav.useUserimage(selectedImage.name).then(useUserimageResponse => {
    context.parser = new UseUserImageParser();
    const response = context.parse(useUserimageResponse);
    console.log(response);
  }).catch(err => console.log(err));
}).catch(err => console.log(err));
```
```js
{ response: true }
```

### Examples
 
 For more demos, be sure to check out the [examples](https://github.com/mrtillman/grav.client/tree/master/examples) folder.

## License
[MIT](https://github.com/mrtillman/grav.client/blob/master/LICENSE.md)
