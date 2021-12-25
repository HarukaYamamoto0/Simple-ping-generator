const axios = require("axios");

class ManagerEvents {
  constructor() {
    this.events = {
      on: [],
      off: []
    };
  }

  on(event, call) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(call);
  }

  emit(event, ...rest) {
    if (event in this.events === false) {
      throw new Error(`the ${event} event does not exist`);
    }
    this.events[event].forEach(e => {
      e(...rest);
    });
  }

  /*
   * function that starts the ping generator
   * @params [urls] - an array of urls
   * @params [time] - the time in timestamp of delay between each ping, is optional
   * @result start the generator
   */
  start(urls, time = 300000) {
    if (Array.isArray(urls)) {
      function get() {
        urls.forEach(url => {
          axios.get(url)
            .then(res => this.emit("on", res))
            .catch(err => this.emit("off", err));
        });
      }

      setInterval(get, time);
    } else {
      throw new Error("the received value is not an array");
    }
  }
}

module.exports = ManagerEvents;
