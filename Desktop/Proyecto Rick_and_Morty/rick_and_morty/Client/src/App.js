import "./App.css";
import Card from "./components/Card/Card.jsx";
import Cards from "./components/Cards/Cards.jsx";
// import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Nav from "./components/Nav/Nav";
// import characters, { Rick } from "./data.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const [characters, setCharacters] = useState([]);

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  const URL = "http://localhost:3001/rickandmorty/";

  async function login({ email, password }) {
    // if (userData.password === PASSWORD && userData.email === EMAIL) {
    //   setAccess(true);
    //   navigate("/home");
    // }
    try {
      const { data } = await axios(
        `${URL}/login?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch ({ response }) {
      const { data } = response;
      alert(data.message);
    }
  }

  const onSearch = async (id) => {
    if (characters.find((char) => char.id === id)) {
      return alert(`Ya existe el personaje con el id ${id}`);
    }
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );
      setCharacters((oldChars) => [...oldChars, data]);
    } catch (error) {
      alert(error.response.data);
    }

    // .then(
    //   ({ data }) => {
    //     if (data.name) {
    //       setCharacters((oldChars) => [...oldChars, data]);
    //     } else {
    //       window.alert("¡No hay personajes con este ID!");
    //     }
    //   }
    // );
  };

  const onClose = (id) => {
    const filter = characters.filter((char) => {
      return char.id !== Number(id);
    });
    setCharacters(filter);
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  return (
    <div className="App">
      {pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
