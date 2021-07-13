const express = require("express");

const app = express();
const http = require("http").createServer(app);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
