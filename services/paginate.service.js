const { Film } = require('../dataBase/index');

module.exports = {
  paginateData: async (req, res) => {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (startIndex > 0) {
      results.previousPage = { page: page - 1, limit };
    }
    if (endIndex < await Film.countDocuments()) {
      results.nextPage = { page: page + 1, limit };
    }

    try {
      results.result = await Film.find().limit(limit).skip(startIndex);
      res.paginatedResult = results;
      res.json(res.paginatedResult);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
