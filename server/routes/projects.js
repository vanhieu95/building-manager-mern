const express = require('express')
const { db } = require('../utils/db')

const router = express.Router()

router.post('/', (req, res) => {
  const { name, active = true, parentId } = req.body

  const investment = db.investment.create({
    data: {
      name,
      active,
      parentId
    }
  })

  res.json(investment)
})

module.exports = router
