module.exports = {
  paginateData: async (model, req, res) => {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (startIndex > 0) {
      results.previousPage = { page: page - 1, limit };
    }
    if (endIndex < model.length) {
      results.nextPage = { page: page + 1, limit };
    }
    results.result = model.slice(startIndex, endIndex);
    res.json(results);
  },
};
