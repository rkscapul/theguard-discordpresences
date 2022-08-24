// Class imports
import { getCurrentDateTime } from '../../helpers/date.js';

class ConsoleLogging {
  constructor(enableTime = process.env.LOGGING_ENABLE_TIME) {
    this.enableTime = enableTime;
  }

  send(message, source = '') {
    console.log(`${source ? `[${source}] ` : ''}${message}`);
  }

  sendError(message, errorCode, source = '') {
    console.log(
      `${source ? `[${source}] ` : ''}[ERROR] ${message} Code: ${
        errorCode}`);
  }
}

export default ConsoleLogging;