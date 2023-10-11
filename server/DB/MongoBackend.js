const { MongoClient, Code } = require("mongodb");

const data = require("../data.json");

class MongoBackend {
  constructor() {
    this.mongoUrl = "mongodb://localhost:37017/cart";
    // this.mongoUrl = "mongodb+srv://Cart:Alireza15@cart.mnaodxu.mongodb.net/?retryWrites=true&w=majority";
    this.dbName = "cart";
    this.client = null;
    this.collection = null;
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    this.client = await mongoClient.connect();
    this.collection = this.client.db(this.dbName).collection("Items");
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      return this.client.close();
    }
    return false;
  }

  async insert(item) {
    console.log(item);
    const documents = [];
    // Object.entries(item).forEach((entry) => {
    //   console.log(entry);
    //   documents.push({
    //     id: entry[1],
    //     selectedSize: entry[1],
    //     selectedColor: entry[1],
    //     quantity: entry[1],
    //     productName: entry[1],
    //   });
    // });
    documents.push(item);
    return this.collection.insertMany(documents);
  }

  async run(item) {
    console.info("Connection to MongoDB");
    console.time("mongodb-connect");
    const client = await this.connect();
    if (client) {
      console.info("Successfully connected to MongoDB");
    } else {
      throw new Error("Connecting to MongoDB failed");
    }
    console.timeEnd("mongodb-connect");

    console.info("Inserting into mongo db");
    console.time("mongodb-insert");
    const insertResult = await this.insert(item);
    console.timeEnd("mongodb-insert");
    console.info(
      `Inserted ${insertResult.insertedCount} documents into MongoDB`
    ); // n is the number of documetns inserted

    console.info("Disconnecting from MongoDB");
    console.time("mongodb-disconnect");
    await this.disconnect();
    console.timeEnd("mongodb-disconnect");

    return {
      color: data.color,
    };
  }
}

module.exports = MongoBackend;
