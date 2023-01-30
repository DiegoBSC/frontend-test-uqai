import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

export default function Login() {
  const { form, changed } = useForm({});
  const [saved, setLogin] = useState("not_login");
  const {setAuth} = useAuth()

  const loginUser = async (e) => {
    e.preventDefault();

    // Envio a Backend
    const request = await fetch(Global.url + "public/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (request.status == 200) {
      setLogin("login");
      setTimeout(() => {
        setAuth(data.user);
        window.location.reload();
      }, 800)
    } else {
      setLogin("error");
    }
  };

  return (
    <>
      {" "}
      <header className="content__header content__header__public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__post">
        {saved == "login" ? (
          <strong className="alert alert-success">
            Usuario ingreso correctamente
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">Usuario invalido</strong>
        ) : (
          ""
        )}
        <form className="form-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="username">Usuario o correo</label>
            <input type="text" name="username" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Clave</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input type="submit" value="Ingresar" className="btn btn-sucess" />
        </form>
      </div>
    </>
  );
}
