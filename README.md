# grav.client

 [gravatar xml-rpc](https://en.gravatar.com/site/implement/xmlrpc/) api client

### installation

```sh
  npm install grav
```

### usage

```javascript
 
  const Grav = require('grav');

  const grav = Grav.create("user@example.com", "password");

  // sanity check
  grav.test().then(...);

  // add new image
  const imageUrl = "https://via.placeholder.com/150";
  grav.saveUrl(imageUrl).then(...);

  // get all user images
  grav.userimages().then(...);
  
  //use imageName from grav.userimages
  const imageName = "0fa6e24a27f544abb2536746b5b9d5f0";

  // set primary avatar
  grav.useUserimage(imageName).then(...);

 ```