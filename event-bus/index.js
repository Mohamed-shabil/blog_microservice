const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());
app.post("/events", async (req, res) => {
  let event = req.body;
  console.log(event);
  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4002/events", event);
  await axios.post("http://localhost:4003/events", event);
   
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on Port 4005");
});
