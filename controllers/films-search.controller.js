const { responseCodesEnum } = require('../constants');
const { Film } = require('../dataBase');

module.exports = {
  getFilteredFilms: async (req, res, next) => {
    try {
      const { dataToSearch: filmsQuery } = req.body;

      // filmsQuery = /[0-9]/.test(filmsQuery) ? +filmsQuery : filmsQuery;
      console.log('filmsQuery', filmsQuery);

      const regexReq = { $regex: filmsQuery, $options: 'i' };

      const films = await Film.find({
        $or: [
          { country: regexReq },
          { name: regexReq },
          { year: regexReq },
          { category: regexReq },
          // { director[ 0 ]: { name:regexReq } }
        ],
      });

      console.log('FILMS', films);

      res.status(responseCodesEnum.SUCCESS).json(films);
    } catch (e) {
      next(e);
    }
  },
};
