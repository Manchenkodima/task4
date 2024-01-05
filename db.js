// const { MongoClient } = require("mongodb");

// const url = "mongodb+srv://manchenkodimajs:Dima123@cluster0.9sdaqn3.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(url);

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         const database = client.db("USER")
//         const movies = database.collection("users");
//         console.log("Connected to the mongoDB");
//     } catch (error) {
//         console.error("Error connecting to the database:", error);
//     }
// }

// // connectToDatabase();

// process.on("SIGINT", async () => {
//     await client.close();
//     console.log("Connection to the database closed");
//     process.exit();
//   });
//   module.exports = {connectToDatabase}