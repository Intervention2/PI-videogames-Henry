const { Router } = require("express");
const { Videogame, Genre, VideogameGenre } = require("../db.js");
const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
const sequelize = require("sequelize");
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async (page = 1) => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=70b52808113d4969a917920641fadfd9&page=${page}&page_size=40`
  );
  const apiInfo = await apiUrl.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      released: el.released,
      rating: el.rating,
      img: el.background_image,
      platforms: el.platforms.map((el) => el.platform.name),
      genre: el.genres.map((el) => el.name),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo(1);
  const apiInfo2 = await getApiInfo(2);
  const apiInfo3 = await getApiInfo(3);
  const dbInfo = await getDbInfo();
  const info2 = apiInfo.concat(apiInfo2);
  const info3 = info2.concat(apiInfo3);
  const infoTotal = dbInfo.concat(info3);
  return infoTotal;
};

const getVideogameName = async (name) => {
  try {
    const videogSearch = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=70b52808113d4969a917920641fadfd9`
    );
    const apiInfoName = await videogSearch.data.results.map((el) => {
      return {
        id: el.id,
        name: el.name,
        released: el.released,
        rating: el.rating,
        img: el.background_image,
        platforms: el.platforms.map((el) => el.platform.name),
        genre: el.genres.map((el) => el.name),
      };
    });
    const dbNameInfo = await Videogame.findAll({
      where: {
        name: {
          [Op.substring]: `${name}`,
        },
      },
    });
    const dbInfoTotal = apiInfoName.concat(dbNameInfo);
    if (dbInfoTotal.length > 15) {
      let dbInfo15 = [];
      for (let i = 0; i < 15; i++) {
        dbInfo15.unshift(dbInfoTotal[i]);
      }
      return dbInfo15;
    } else {
      return dbInfoTotal;
    }
  } catch (error) {
    console.log(error);
  }
};

const getVideogameId = async (id) => {
  if (id.length < 20) {
    const apiInfoId = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=70b52808113d4969a917920641fadfd9`
    );
    return apiInfoId.data;
  } else {
    const dbInfoId = await Videogame.findByPk(id, {
      include: Genre,
    });
    return dbInfoId;
  }
};

router.get("/videogames", async (req, res) => {
  try {
    let name = req.query.name;
    if (name) {
      name = name.toLowerCase();
      let videogameName = await getVideogameName(name);
      videogameName.length
        ? res.status(200).send(videogameName)
        : res.status(404).send("No existe ese videojuego");
    } else {
      let videogamesTotal = await getAllVideogames();
      res.status(200).send(videogamesTotal);
    }
  } catch (error) {
    res.status(404).json({ status: "failed", msg: error });
  }
});

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  if (id === null || id === undefined) throw new Error("La id no existe");
  try {
    let videogameId = await getVideogameId(id);
    res.status(200).send(videogameId);
  } catch (error) {
    res.status(404).json({ status: "failed", msg: error });
  }
});

router.post("/videogames", async (req, res) => {
  try {
    const { name, description, platforms, released, rating, genre } = req.body;
    if (!name || !description || !platforms)
      throw new Error("Faltan enviar datos");
    let obj = { ...req.body, name: req.body.name.toLowerCase() };
    const [newVideogame, created] = await Videogame.findOrCreate({
      where: {
        name: obj.name,
      },
      defaults: {
        ...obj,
      },
    });
    if (created) {
      if (genre.length) {
        console.log(genre);
        let generos = await Genre.findAll({
          where: {
            name: genre,
          },
        });
        await newVideogame.addGenres(generos);
      }
      return res.status(200).send("El videojuego ha sido creado.");
    } else {
      res.status(200).send("Ese videojuego ya existe.");
    }
    console.log(newVideogame);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/genres", async (req, res) => {
  const allGenres = await Genre.findAll();
  return res.status(200).json({ count: allGenres.length, data: allGenres });
});

// router.get("/videogames/:id", async (req, res) => {
//     const id = req.params.id
//     try{
//         let vid = await Videogame.findByPk(id);
//         return res.json(vid)
//     }catch (error){
//         console.log(error)
//     }
// })

// router.get("/videogames", async (req, res)=>{
//     const videogames = await Videogame.findAll();
//     res.json(videogames)
// })

// router.get("/videogames?name=", async (req, res) =>{
//     const { name } = req.query;
//     const videogames = await Videogame.findAll(name, {limit: 15})

//     if(!name) return res.send(`No existe el juego con el nombre ${name}`)
//     res.json(videogames)
// })

// // router.get("/videogame/:id", async (req, res) => {
// //     const { }
// // })

// router.post("/videogames", async (req, res) => {
//    const { name, description, launch_date, rating, platforms } = req.body;
//    if(!name || !description || !launch_date || !rating || !platforms) return res.status(404).send("Falta enviar datos");
//    try {
//     const videogame = await Videogame.create(req.body);
//     res.status(201).json(videogame)
//    }catch(error){
//     res.status(404).send("Hubo un error.")
//    }
// })

// router.get("/genres", async (req, res) => {

// })

module.exports = router;
