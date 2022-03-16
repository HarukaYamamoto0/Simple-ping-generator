const axios = require("axios");

class Manager {
  constructor() {
    this.events = {
      on: [],
      off: []
    }
  }

  on(event, call) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(call);
  }

  emit(event, ...rest) {
    if (event in this.events === false) {
      throw new Error(`the ${event} event does not exist`);
    }
    this.events[event].forEach((e) => {
      e(...rest);
    });
  }

  start(urls, time = 300000) {
    if (!Array.isArray(urls) return throw new Error("You didn't pass valid urls");

      setInterval(async () => {
        for (const url of urls) {
          await axios.get(url)
          .then((res) => this.emit("on", res))
          .catch((err) => this.emit("off", err));
        }
      },
        time);
    }
  }

  module.exports = Manager;