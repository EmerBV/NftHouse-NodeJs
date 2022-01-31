'use strict'

/**
 * APP ROUTES (ROUTER)
*/

const express = require('express')
const createError = require('http-errors')
const Nft = require('../../models/Nft')

const { imgRoute } = require('../../lib/utils')

const router = express.Router()

// GET /api/nfts
// Devuelve una lista de nfts
router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name
    const price = req.query.price
    const lowestPrice = req.query.lowestPrice
    const highestPrice = req.query.highestPrice
    const category = req.query.category
    const skip = req.query.skip
    const limit = req.query.limit
    const select = req.query.select // campos que quiero
    const sort = req.query.sort

    const filtros = {}

    if (name) filtros.name = name

    if (price) filtros.price = price

    if (lowestPrice) filtros.price = { $gte: lowestPrice }

    if (highestPrice) filtros.price = { $lte: highestPrice }

    if (highestPrice && lowestPrice) filtros.price = { $gte: lowestPrice, $lte: highestPrice }

    if (category) filtros.category = category

    const nfts = await Nft.lista(filtros, skip, limit, select, sort)

    for (const Nft of nfts) {
      if (Nft.image) {
        Nft.image = imgRoute(req, Nft.image)
      }
    }

    res.json({ results: nfts })
  } catch (err) {
    next(err)
  }
})

// GET /api/nfts/category/:id
// Devuelve categorías por Id
router.get('/category/:id', async (req, res, next) => {
  try {
    const categoryId = req.params.id

    const categoryById = await Nft.find({ category: categoryId })

    for (const Nft of categoryById) {
      if (Nft.image) {
        Nft.image = imgRoute(req, Nft.image)
      }
    }

    if (!categoryById) {
      next(createError(404))
      return
    }

    res.json({ result: categoryById })
  } catch (err) {
    next(err)
  }
})

// GET /api/nfts/:id
// Devuelve un nft
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const nft = await Nft.findOne({ _id: id })

    if (!nft) {
      next(createError(404))
      return
    }

    res.json({ result: nft })
  } catch (err) {
    next(err)
  }
})

// POST /api/nfts
// Crea un nuevo nft
router.post('/', async (req, res, next) => {
  try {
    const nftData = req.body

    // creo un objeto de nft EN MEMORIA
    const nft = new Nft(nftData)

    const nftGuardado = await nft.save()

    res.status(201).json({ result: nftGuardado })
  } catch (error) {
    next(err)
  }
})

// DELETE /api/nfts/:id
// Elimina un nft
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    await Nft.deleteOne({ _id: id })

    res.json()
  } catch (error) {
    next(err)
  }
})

// PUT /api/nfts:id
// Actualizar un nft
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const nftData = req.body

    let nftActualizado
    try {
      nftActualizado = await Nft.findByIdAndUpdate(id, nftData, {
        new: true // esta opción sirve para que nos devuelva el estado final del documento
      })
    } catch (err) {
      next(createError(422, 'invalid id'))
      return
    }

    if (!nftActualizado) {
      next(createError(404))
      return
    }

    res.json({ result: nftActualizado })
  } catch (error) {
    next(err)
  }
})

module.exports = router
