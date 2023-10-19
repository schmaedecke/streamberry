const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const MovieDB = require("./database/streamberry");
const { raw } = require("mysql2");



connection
  .authenticate()
  .then(() => {})
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post("/movie", (req, res) => {
    var { title, genre , year, rate} = req.body;
  
    MovieDB.create({
      title: title,
      genre: genre,
      year: year,
      rate: rate
    })
    res.sendStatus(200);
    console.log("Filme adicionado ao catálogo com sucesso")
  });



app.get("/movies", (req, res) => {
MovieDB.findAll({raw: true, order: [["id", "DESC"]]}).then((movies) =>{
  res.json(MovieDB)
  console.log("Lista de filmes: ")
  console.log("index", {movies: movies});
})
res.statusCode = 200;
});


app.put("/movies/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    
    const updatedMovie = MovieDB.findOne({where: {id: id},}).then((movie)=>{
      if (movie != undefined) {
        var { title, genre, year, rate } = req.body;
        if (title != undefined) {
          movie.title = title;
        }
        if (genre != undefined) {
          movie.genre = genre;
        }
        if (year != undefined) {
          movie.year = year;
        }
        if (rate != undefined) {
          movie.rate = rate
        }
        try {
          MovieDB.update({title, genre, year, rate},{where: {id}})
          res.sendStatus(200);
          console.log(`Aleração feita com sucesso`)
        } catch (error) {
          console.log(error)
        }
  }});
  }
});

app.delete("/movie/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var title = req.body.title

    var index = MovieDB.destroy({where: {id:id},}).then((movie)=>{
      if (index == -1) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
        console.log(`Filme com id ${id} deletado com sucesso`)
      }
    })  
  }
});

app.get("/movies/:id", (req, res) => {
    if (isNaN(req.params.id)) {
      res.sendStatus(400);
    } else {
      var id = parseInt(req.params.id);
  
      var movie = MovieDB.findOne({where: {id:id}},).then((movie)=>{
        if (movie != undefined) {
          res.statusCode = 200;
          res.json({ movie });
          console.log(movie.dataValues)
        }else{
          console.log("Filme não encontrado")
        }});
    }
});

app.get("/movies/search/:rate", (req, res) => {
  var rate = parseInt(req.params.rate);
  MovieDB.findAll({where: {rate: rate},}).then((movie)=>{
    if (movie != undefined) {
      res.statusCode = 200;
      res.json({movie})
      var movieData = JSON.stringify(movie)
      var movieJson = JSON.parse(movieData)
      console.log(movieJson)
    }else{
      console.log("Nenhum filme com essa nota foi encontrada.")
    }})
});

app.get("/movies/search/year/:year", (req, res) => {
  var year = parseInt(req.params.year);
  MovieDB.findAll({where: {year: year},}).then((movie)=>{
    if (movie != undefined) {
      res.statusCode = 200;
      res.json({movie})
      var movieData = JSON.stringify(movie)
      var movieJson = JSON.parse(movieData)
      console.log(movieJson)
    }else{
      console.log("Nenhum filme com essa nota foi encontrada.")
    }})
});

app.get("/movies/search/genre/:genre", (req, res) => {
  var genre = req.params.genre.toLowerCase();
  MovieDB.findAll({where: {genre: genre},}).then((movie)=>{
    if (movie != undefined) {
      res.statusCode = 200;
      res.json({movie})
      var movieData = JSON.stringify(movie)
      var movieJson = JSON.parse(movieData)
      console.log(movieJson)
    }else{
      console.log("Nenhum filme com essa nota foi encontrada.")
    }})
});
app.listen(3031, () => {
  console.log(`==== Streamberry ====
  1. Cadastrar
  2. Listar
  3. Atualizar
  4. Deletar
  5. Pesquisar`);
});
