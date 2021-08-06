import app from "./App";
import * as dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 1337;

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    process.abort();
  }
  console.log(`Server is listening on port ${port}.`);
  return;
});
