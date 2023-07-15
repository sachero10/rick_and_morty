const { Router } = require("express");
const login = require("../controllers/login");
const deleteFav = require("../controllers/deleteFav");
const postUser = require("../controllers/postUser");
const postFav = require("../controllers/postFav");

const getCharById = require("../controllers/getCharById");
// const { postFav, deleteFav } = require("../controllers/handleFavorites");
// const login = require("../controllers/login");

const router = Router();

router.get("/character/:id", getCharById);
router.get("/login", login);
router.post("/login", postUser); //nuevo
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;
