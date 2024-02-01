import "dotenv/config";
import connectDB from "./db/connect.js";
import app from "./app.js";

const port = process.env.PORT || 8000;


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    })
  })
  .catch((err) => {
    console.log('MongoDB Connection Failed', err);
  })
