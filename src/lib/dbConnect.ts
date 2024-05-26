import mongoose from "mongoose";

// response object from DB
type ConnectionObject = {
  isConnected?: number;
};

// create connection
const connection: ConnectionObject = {};

// DB Connection
export async function dbConnect(): Promise<void> {
  // check DB is already connected or not!
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }
  // connect to MONGODB_URI
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      // connection options
    });
    connection.isConnected = db.connections[0].readyState;

    // console.log(db);
    // console.log(db.connections);
    console.log("DB connected succesfully");
  } catch (error) {
    console.log("DB connection failed", error);

    // stop the connection
    process.exit(1);
  }
}
