function itemResponse(item) {
  return {
    success: true,
    data: item
  }
}

function listResponse(list) {
  return {
    success: true,
    total: list.length,
    data: list
  }
}

module.exports = {
  itemResponse,
  listResponse
}
