const { MongoClient } = require("mongodb");

class MongoBackend {
  constructor(uri, dbName, table) {
    this.uri = uri;
    this.dbName = dbName;
    this.table = table;
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    await this.client.connect();
    console.log("Connected to MongoDB");
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.table); // Fixed reference to this.table
  }

  async disconnect() {
    await this.client.close();
    console.log("Disconnected from MongoDB");
  }

  async addColor(color) {
    // Renamed from insertColor for consistency
    try {
      const result = await this.collection.insertOne({ color });
      console.log(`New color inserted with the id ${result.insertedId}`);
    } catch (e) {
      console.error(`Failed to insert color: ${e}`);
    }
  }

  async removeColor(color) {
    try {
      const result = await this.collection.deleteOne({ color: color });
      console.log(
        result.deletedCount === 0
          ? `${color} not found`
          : `${color} removed successfully`
      );
    } catch (e) {
      console.error(`Failed to remove color: ${e}`);
    }
  }

  async getColors() {
    try {
      return await this.collection.find({}).toArray();
    } catch (e) {
      console.error(`Failed to get colors: ${e}`);
      return []; // Returning an empty array in case of error
    }
  }
}

module.exports = MongoBackend;
