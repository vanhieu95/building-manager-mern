const asyncHandler = require('./async')

function pagination(model, selectQuery) {
  return asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const start = (page - 1) * limit
    const end = page * limit

    const total = await model.count()

    const results = {}
    const pagination = {
      page,
      limit,
      page_count: Math.ceil(total / limit),
      total_count: total
    }

    if (start > 0) {
      pagination.previous = {
        page: page - 1,
        limit: limit
      }
    }

    if (end < total) {
      pagination.next = {
        page: page + 1,
        limit: limit
      }
    }

    results.pagination = pagination
    results.data = await model.findMany({
      skip: start,
      take: limit,
      select: selectQuery
    })

    res.results_pagination = results
    next()
  })
}

module.exports = pagination
