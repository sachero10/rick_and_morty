import { React, useState } from "react";
import styles from "./Form.module.css";
import validator from "./validation";

const Form = (props) => {
  const { login } = props;

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors(validator({ ...userData, [e.target.name]: e.target.value }));
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">EMAIL</label>
      <input
        type="text"
        name="email"
        placeholder="Email..."
        value={userData.email}
        onChange={handleChange}
      />
      {errors.e1 ? (
        <p>{errors.e1}</p>
      ) : errors.e2 ? (
        <p>{errors.e2}</p>
      ) : (
        <p>{errors.e3}</p>
      )}

      <label htmlFor="password">PASSWORD</label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
      />
      {errors.p1 ? <p>{errors.p1}</p> : <p>{errors.e2}</p>}
      <button type="submit">ENTRAR</button>
    </form>
  );
};

export default Form;
