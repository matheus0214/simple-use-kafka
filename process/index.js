const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "recive_product",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({ groupId: 'proccess_order' });
const producer = kafka.producer();

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "proccess_order", fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, message, partition }) => {
            console.log("\x1b[41m Processing... \x1b[0m");
            console.log(JSON.parse(message.value));
            process_payment(JSON.parse(message.value));
        }
    });
}

const process_payment = async (datas) => {
    const paid = Object.assign(datas, { paid: true });

    await producer.connect();
    await producer.send({
        messages: [ { value: JSON.stringify(paid) } ],
        topic: "final_order"
    });
    await producer.disconnect();
}

run();