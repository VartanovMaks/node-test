const { Film } = require('../dataBase/index');

module.exports = {
  paginateData: async (req, res) => {
    const page = +req.query.page;
    const limit = +req.query.limit;
    const queryField = req.query.field;
    const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    const results = {};
    const totalElements = await Film.countDocuments();
    const totalPages = Math.ceil(totalElements / limit);
    results.totalPages = totalPages;
    // if (startIndex > limit) {
    //   results.previousPage = page - 1;
    // }
    // if (endIndex < await totalElements - limit) {
    //   results.nextPage = page + 1;
    // }

    try {
      results.result = await Film.find({}, {
        actors: 0,
        category: 0,
        country: 0,
        director: 0,
        name: 0,
        rating: 0,
        trailer: 0,
        viewsNumber: 0,
        year: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        [queryField]: { $slice: 1 },
      })
        .limit(limit).skip(startIndex);
      res.paginatedResult = results;
      console.log('res.paginatedResult', res.paginatedResult);
      res.json(res.paginatedResult);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
