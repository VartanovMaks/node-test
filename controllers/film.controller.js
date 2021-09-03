const films = require('../baseFilms');

module.exports = {

    getAllFilms : (req,res)=>{

        res.json(films);
    },

    getFilmById : (req,res)=>{

        id= req.params.filmID;
        res.json(films[id]);
    }
    
    // getPoster : (req,res)=>{
    //     const response = `<img src="http://localhost:3000/data/0/poster/${films[0].poster}" />`
    //     res.json(response)
    // }
}