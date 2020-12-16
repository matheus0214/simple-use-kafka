### Learning use Kafka<br />

**Run applicaton**<br />
```
docker-compose up
- cd recive
    - node index.js
- cd process
    - node index.js
- cd final
    - node index.js
```

After all services run, do request to <br />
**POST http://localhost:3000**<br />
    body:
    {
        "name": "Name product",
        "quantity": Quantity itens"
    }

OBS: see console.log in each microservice