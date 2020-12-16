const express = require("express");
const { Kafka } = require("kafkajs");

const app = express();
app.use(express.json());

const kafka = new Kafka({
    clientId: "recive_product",
    brokers: ["localhost:9092"]
})

app.post("/", async(request, response) => {
    const { name, quantity } = request.body;

    const product = {
        id: Math.floor(Date.now() / 100),
        name,
        quantity
    }

    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
        topic: "proccess_order",
        messages: [
            { value: JSON.stringify(product) }
        ]
    });
    await producer.disconnect();

    return response.status(200).json({
        message: "success",
        product
    });
});

app.listen(3000);