const express = require("express");
const app = express();

app.use(express.json());

app.get("/hello", function (req, res) {
  res.send("Hello World");
});

/*
[POST] -> Create
[GET] -> Read
[PUT/PATCH] -> Update
[DELETE] -> Delete
*/

const lista = ["Senhor dos Aneis", "Harry Potter", "Star Trek"];

//Read all
app.get("/filmes", (req, res) => {
  res.send(lista.filter(Boolean));
});
//Read id
app.get("/filmes/:id", (req, res) => {
  res.send(lista[req.params.id - 1]);
});
//Create element
app.post("/filmes", (req, res) => {
  const nome = req.body.nome;
  lista.push(nome);
  res.send("Item criado com sucesso");
});

//Update id
app.put("/filmes/:id", (req, res) => {
  const nome = req.body.nome;
  lista[req.params.id - 1] = nome;

  res.send("Item editado com sucesso!");
});

//Delete id
app.delete("/filmes/:id", (req, res) => {
  //delete lista[req.params.id - 1];
  //lista.splice(req.params.id - 1);
  lista.splice(req.params.id - 1, 1);

  res.send("Item removido com sucesso!");
});

app.listen(3000);
