"use strict";

/**
 * MODEL
*/

const mongoose = require("mongoose");

// definir un esquema
const nftSchema = mongoose.Schema(
  {
    name: { type: String, index: true },
    price: { type: Number, index: true },
    image: { type: String, index: true },
    category: { type: [String], index: true },
    // infoDeInteres: mongoose.Schema.Types.Mixed
  },
  {
    // en caso de que queramos conectar este modelo con una colección con otro nombre
    //category: 'otro_nombre'
  }
);

nftSchema.statics.category = function() {
  return Nft.distinct('category');
}

// creamos método estático (del modelo)
nftSchema.statics.lista = function (filtros, skip, limit, select, sort) {
  const query = Nft.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
};

// creo el modelo con ese esquema
const Nft = mongoose.model("Nft", nftSchema);

// opcional - exporto el modelo
module.exports = Nft;
