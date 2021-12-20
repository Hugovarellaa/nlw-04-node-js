import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "deu certo caralhoooo" });
});

app.post("/", (request, response) => {
  return response.json({ message: "Os dados foram salvos com suceso" });
});

app.listen(3333, () => {
  console.log("Servidor Rodando!!");
});
