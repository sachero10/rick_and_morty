const Favorite = require("../DB_connection");

const deleteFav = async (req, res) => {
  try {
    const { id } = req.params;
    const fav = Favorite.findByPk(id);
    // const aux = { ...fav };
    await fav.destroy();
    // res.status(200).json(aux);
    const favs = await Favorite.findAll();
    return res.status(200).json(favs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteFav;
