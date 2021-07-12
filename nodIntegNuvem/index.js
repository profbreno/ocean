const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

(async () => {
  const uri = "mongodb://localhost:27017";
  const dbname = "ocean_node";

  console.info("Conectando ao banco de dados...");

  const client = await MongoClient.connect(uri, { useUnifiedTopology: true });

  console.info("MongoDB conectado com sucesso!");

  const db = client.db(dbname);

  const app = express();
  app.use(express.json());

  const filmes = db.collection("filmes");

  app.get("/", async (req, res) => {
    res.send(await filmes.find().toArray());
  });

  /*
[POST] -> Create
[GET] -> Read
[PUT/PATCH] -> Update
[DELETE] -> Delete
*/

  const lista = ["Senhor dos Aneis", "Harry Potter", "Star Trek"];

  //Read all
  app.get("/filmes", async (req, res) => {
    const listaFilmes = await filmes.find().toArray();
    res.send(listaFilmes);
  });

  //Read id
  app.get("/filmes/:id", async (req, res) => {
    const idF = req.params.id;
    const filmeId = await filmes.findOne({ _id: ObjectId(idF) });
    res.send(filmeId);
  });

  //Create element
  app.post("/filmes", async (req, res) => {
    const item = req.body;
    await filmes.insertOne(item);
    res.send(item);
  });

  //Update id
  app.put("/filmes/:id", async (req, res) => {
    const id = req.params.id;
    const item = req.body;

    await filmes.updateOne({ _id: ObjectId(id) }, { $set: item });

    res.send(item);
  });

  //Delete id
  app.delete("/filmes/:id", async (req, res) => {
    const id = req.params.id;

    await filmes.deleteOne({ _id: ObjectId(id) });
    res.send("Item removido com sucesso!");
  });

  app.listen(3000);
  // Resumo dos endpoints:
  // [POST] - /filmes -> Adicionar um elemento
  // [GET] - /filmes/:id -> Ler um único elemento
  // [GET] - /filmes -> Let todos os elementos
  // [PUT] - /filmes/:id -> Alterar um único elemento
  // [DELETE] - /filmes/:id -> Apagar um único elemento
})();
