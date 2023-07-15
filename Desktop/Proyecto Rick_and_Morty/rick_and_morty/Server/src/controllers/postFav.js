const Favorite = require("../DB_connection");

const postFav = async (req, res) => {
  try {
    const { id, name, origin, status, image, species, gender } = req.body;
    if (!id || !name || !origin || !status || !image || !species || !gender)
      return res.status(401).json({ error: "Faltan datos" });

    const [newFav, created] = await Favorite.findOrCreate({
      where: { id },
      default: { name, origin, status, image, species, gender },
    });

    // newFav.addUsers(users);

    const favs = await Favorite.findAll();
    return res.status(200).json(favs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postFav;
