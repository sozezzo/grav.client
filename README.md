# grav.client

 [gravatar xml-rpc](https://en.gravatar.com/site/implement/xmlrpc/) api client

### installation

```sh
  npm install grav-client
```

### usage

```javascript
 
  const Grav = require('grav-client');

  const grav = Grav.login("user@example.com", "password");

  // sanity check
  grav.test().then(...);

  // add new avatar
  const imageUrl = "https://via.placeholder.com/150";
  grav.saveUrl(imageUrl).then(...);

  // get all avatars
  grav.userimages().then(...);
  
  // use an avatar from grav.userimages()
  const image = "0fa6e24a27f544abb2536746b5b9d5f0";

  // set primary avatar
  grav.useUserimage(image).then(...);

 ```