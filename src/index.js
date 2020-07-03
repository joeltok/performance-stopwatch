class Stopwatch {
  constructor(options = {}) {
    this.loggerFunc = options.loggerFunc;
    this.divider = options.divider;
    this.timings = []
  }

  start(message) {
    const now = new Date().valueOf();
    this.timings.push(now)
    this._log(message, `stopwatch started`)
  }

  lap(message) {
    this._checkStarted()
    const now = new Date().valueOf();
    const lapTime = now - this.timings[this.timings.length-1];
    this.timings.push(now)
    this._log(message, `${lapTime} ms from previous lap`)
    return lapTime
  }

  total(message) {
    this._checkStarted()
    const now = new Date().valueOf();
    const totalTime = now - this.timings[0];
    this._log(message, `${totalTime} ms since start`)
    return totalTime
  }

  _checkStarted() {
    if (this.timings.length == 0) {
      throw new Error('stopwatch not started');
    }
  }

  _log(message, appendment) {
    let logString = '';
    if (message) { logString += `${message} ${this.divider || '-'} ` };
    logString += appendment

    if (this.loggerFunc) {
      try {
        this.loggerFunc(logString)
      } catch (err) {
        throw new Error(`option loggerFunc needs to be a function`)
      }
    } else {
      console.log(logString)
    }
  }
}

module.exports = {
  Stopwatch,
};
