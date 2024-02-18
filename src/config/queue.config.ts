import client, { Connection, Channel, ConsumeMessage } from "amqplib";

var rmqUser = "guest";
var rmqPass = "guest";
var rmqhost = "localhost";
var NOTIFICATION_QUEUE = "article/new";

export type HandlerConsumer = (msg: ConsumeMessage ) => any;

class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);

      this.connection = await client.connect(
        process.env.MQ_CONNECTION_STRING ||
          `amqp://${rmqUser}:${rmqPass}@${rmqhost}:5672`
      );

      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);

      this.connected = true;
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }

  async consume(queue: string, handleIncomingNotification: HandlerConsumer ) {
    await this.channel.assertQueue(queue, {
      durable: false,
    });

    this.channel.consume(
      queue,
      (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }
          if (msg )
          handleIncomingNotification(msg);
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;
