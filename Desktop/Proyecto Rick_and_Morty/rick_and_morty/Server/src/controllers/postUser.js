const User = require("../DB_connection");

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Faltan datos" });

    // const [user, created] = await User.findOrCreate({
    const user = await User.findOrCreate({
      where: { email, password },
    });
    // if (created) {
    //   return res.status(200).json(user);
    // } else {
    //   return res.status(200).json({ response: "email ya existente" });
    // }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
