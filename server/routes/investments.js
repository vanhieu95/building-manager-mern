const express = require('express')
const asyncHandler = require('../middlewares/async')
const { db } = require('../utils/db')
const { itemResponse, listResponse } = require('../utils/apiResponse')
const pagination = require('../middlewares/pagination')
const { prisma, Prisma } = require('@prisma/client')

const router = express.Router()

router.get(
  '/',
  pagination(db.investment, {
    id: true,
    name: true,
    active: true,
    parentId: true
  }),
  asyncHandler(async (req, res, next) => {
    const investments = res.results_pagination
    res.json({ success: true, ...investments })
  })
)

router.get(
  '/children',
  asyncHandler(async (req, res, next) => {
    const investments = await db.$queryRaw`
        SELECT id, name "parentId" 
        FROM "Investment" i1
        WHERE NOT EXISTS (
          SELECT 1 FROM "Investment" i2
          WHERE i1.id = i2."parentId"
        )`

    res.json({ success: true, data: investments })
  })
)

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { name, active = true, parentId } = req.body

    const investment = await db.investment.create({
      data: {
        name,
        active,
        parentId
      },
      select: {
        id: true,
        name: true,
        active: true,
        parentId: true
      }
    })

    res.json(itemResponse(investment))
  })
)

module.exports = router
