const users = require("../utils/users");

const getLogin = (req, res) => {
  const { email, password } = req.query;
  let access = false;

  const autorizado = users.find(
    (user) => user.email === email && user.password === password
  );

  // autorizado ? (access = true) : (access = false);
  // return res.status(200).json({ access });
  if (autorizado) {
    access = true;
    return res.status(200).json({ access });
  } else {
    access = false;
    return res
      .status(401)
      .json({ access, message: "Usuario o contraseña inválidos" });
  }
};

module.exports = getLogin;
