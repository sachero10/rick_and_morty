const axios = require("axios");
const errorHandler = require("../utils/errors")

const URL_BASE = "https://rickandmortyapi.com/api/character";

const getCharById = async (req, res) => {
  const { id } = req.params;
  try {
    const {data} = await axios(`${URL_BASE}/${id}`)

    const { name, status, species, gender, origin, image } = data;
    const character = { id, name, status, species, gender, origin, image };

    res.status(200).json(character)
    // .then(({ data }) => {
    //   const { name, status, species, gender, origin, image } = data;

    //   const character = { id, name, status, species, gender, origin, image };

    //   return character.name
    //     ? res.status(200).json(character)
    //     : res.status(404).send("Not found");
    // })
  } catch (error) {
    errorHandler(res, error);
  }
    // .catch((err) => res.status(500).send(err.message));
};



module.exports = getCharById;
