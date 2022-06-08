import Serverless from "serverless";

class ServerlessPlugin {
  serverless: Serverless;
  options: any;

  commands: {};
  hooks: { [key: string]: Function }
  log: Console;

  constructor(serverless: Serverless, options: any, {log}: {log: Console}) {
    this.serverless = serverless;
    this.options = options;
    this.log = log;

    this.commands = {
      welcome: {
        usage: "Helps you start your first Serverless plugin",
        lifecycleEvents: ["hello", "world"],
        options: {
          message: {
            usage:
              "Specify the message you want to deploy " +
              "(e.g. \"--message 'My Message'\" or \"-m 'My Message'\")",
            required: true,
            shortcut: "m",
          },
        },
      },
    };

    this.hooks = {
      "before:welcome:hello": this.beforeWelcome.bind(this),
      "welcome:hello": this.welcomeUser.bind(this),
      "welcome:world": this.displayHelloMessage.bind(this),
      "after:welcome:world": this.afterHelloWorld.bind(this),
    };
  }

  beforeWelcome() {
    this.log.info("Hello from Serverless!");
  }

  welcomeUser() {
    this.log.info("Your message:");
  }

  displayHelloMessage() {
    this.log.info(`${this.options.message}`);
  }

  afterHelloWorld() {
    this.log.info("Please come again!");
  }
}

module.exports = ServerlessPlugin;