const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "recive_product",
    brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "final_order" });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "final_order", fromBeginning: true });
    await consumer.run({
        eachMessage: ({ message }) => {
            console.log("\x1b[44m Recive final order \x1b[0m")
            console.log(JSON.parse(message.value));
        }
    });
}

run();