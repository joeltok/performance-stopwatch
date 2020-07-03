class Stopwatch {
  constructor(options = {}) {
    this.loggerFunc = options.loggerFunc;
    this.timings = []
  }

  start(message) {
    const now = new Date().valueOf();
    this.timings.push(now)
    this._log(message, `stopwatch started`)
  }

  lap(message) {
    if (this.timings.length == 0) {
      this._log(message, 'stopwatch not started');
      return;
    }

    const now = new Date().valueOf();
    const lapTime = now - this.timings[this.timings.length-1];
    this.timings.push(now)
    this._log(message, `${lapTime} ms from previous lap`)
    return lapTime
  }

  total(message) {
    if (this.timings.length == 0) {
      this._log(message, 'stopwatch not started');
      return;
    }
    const now = new Date().valueOf();
    const totalTime = now - this.timings[0];
    this._log(message, `${totalTime} ms since start`)
    return totalTime
  }

  _log(message, appendment) {
    let logString = '';
    if (message) { logString += `${message} - ` };
    logString += appendment

    if (this.loggerFunc) {
      try {
        this.loggerFunc(logString)
      } catch (err) {
        console.error(`loggerFunc options needs to be a function`)
      }
    } else {
      console.log(logString)
    }
  }
}

module.exports = {
  Stopwatch,
};
