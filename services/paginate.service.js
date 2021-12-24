const { Film } = require('../dataBase/index');

module.exports = {
  paginateData: async (req, res) => {
    const page = +req.query.page;
    const limit = +req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    const totalElements = await Film.countDocuments();
    const totalPages = Math.ceil(totalElements / limit);
    results.totalPages = totalPages;
    if (startIndex > 0) {
      results.previousPage = page - 1;
    }
    if (endIndex < await totalElements) {
      results.nextPage = page + 1;
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
