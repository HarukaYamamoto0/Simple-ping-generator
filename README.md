# Simple-ping-generator

### install using npm:
```shell
npm install simple-ping-generator
```

### Mode of use:
```js
// import the package into your project:
const Manager = require("simple-ping-generator");

// create an instance of the manager:
const manager = new Manager();

// record events:
manager.on("on", () => {
  console.log("ping sent successfully");
})

manager.on("off", () => {
  console.log("failed to send ping");
})

// start the ping generator:
manager.start(["Link", "Link"], 30000);
```