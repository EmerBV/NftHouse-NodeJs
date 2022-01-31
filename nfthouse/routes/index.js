'use strict'

/**
 * CONTROLLER
 */

const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const Nft = require('../models/Nft')

const { imgRoute } = require('../lib/utils')

/* GET home page. */

router.get('/', async function (req, res, next) {
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

    nfts.forEach((Nft) => {
      if (Nft.image) {
        Nft.image = imgRoute(req, Nft.image)
      }
    })

    res.render('index', { title: 'NftHouse', nfts: nfts })
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

    categoryById.forEach((Nft) => {
      if (Nft.image) {
        Nft.image = imgRoute(req, Nft.image)
      }
    })

    if (!categoryById) {
      next(createError(404))
      return
    }

    res.render('categories', { title: 'Categories', categoryById: categoryById })
  } catch (err) {
    next(err)
  }
})

module.exports = router
