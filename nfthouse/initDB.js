"use strict";

const fsPromise = require("fs").promises;
// import readline from "readline";
const readline = require("readline");

// conexión a la base de datos
const dbConnection = require("./lib/connectMongoose");
const nftData = require("./initDB.nfts.json");

// cargar modelos
const Nft = require("./models/Nft");

dbConnection.once("open", () => {
  main().catch((err) => console.log("Hubo un error", err));
});

async function main() {
  const borrar = await pregunta(
    "Estas seguro de que quieres borrar la base de datos? "
  );
  if (!borrar) {
    process.exit(0);
  }
  // inicializar nfts
  await initNfts();

  // desconectar la base de datos
  dbConnection.close();
}

async function initNfts() {
  // borrar todos los documentos de agentes que haya en la colección
  const deleted = await Nft.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} nfts.`);

  const data = await fsPromise.readFile("initDB.nfts.json", "utf-8");
  const nftData = JSON.parse(data);

  // crear agentes iniciales
  const nfts = await Nft.insertMany(nftData);
  console.log(`Creados ${nfts.length} nfts.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline a la consola
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // hacemos pregunta
    rl.question(texto, (respuesta) => {
      rl.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}