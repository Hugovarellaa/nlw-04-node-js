import express from "express";

const app = express();

app.get("/users", (reqquest, response) => {
  return response.send({ message: "Certinho caralho!!!!" });
});

app.post("/users", (reqquest, response) => {
  return response.json({ message: "Certinho caralho" });
});

app.listen(3333, () => console.log("Server is running"));
