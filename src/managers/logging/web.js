// Library imports
import { MessageBuilder, Webhook } from 'webhook-discord';

// Class imports
import { getCurrentDateTime } from '../../helpers/date.js';

class WebLogging {
  constructor(discordWebhookUrl, consoleLogger) {
    this.consoleLogger = consoleLogger;
    this.webhook = new Webhook(discordWebhookUrl);
  }

  constructErrorMessage(message, code, payload) {
    return new MessageBuilder()
      .setName("The Guard - Web Logging")
      .setText(payload)
      .setTitle("An error has occured")
      .setDescription(message)
      .setColor("#B71C1C")
      .addField("Error code", code)
      .setFooter(getCurrentDateTime());
  }

  constructInfoMessage(message) {
    const _message = `[${getCurrentDateTime()}] ${message}`;

    return new MessageBuilder()
      .setName("The Guard - Web Logging")
      .setText(_message);
  }

  sendError(message, code, payload) {
    this.consoleLogger.send('Sending web log.');
    this.webhook.send(this.constructErrorMessage(message, code, payload))
      .then(() => this.consoleLogger.send('Web log sent.'))
      .catch(() => this.consoleLogger.send('Error sending web log.'));
  }

  sendInfo(message) {
    this.consoleLogger.send('Sending web log.');
    this.webhook.send(this.constructInfoMessage(message))
      .then(() => this.consoleLogger.send('Web log sent.'))
      .catch(() => this.consoleLogger.send('Error sending web log.'));
  }
}

export default WebLogging;