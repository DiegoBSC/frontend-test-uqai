import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export default function Register() {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const saveUser = async (e) => {
    e.preventDefault();
    // Recoger los datos del formulario
    let newUser = form;

    // Envio a Backend
    const request = await fetch(Global.url + "public/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //const data = await request.json();

    if (request.status == 200) {
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      {" "}
      <header className="content__header content__header__public">
        <h1 className="content__title">Registrar</h1>
      </header>
      <div className="content__post">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            Usuario registrado correctamente
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">
            Usuario no registrado
          </strong>
        ) : (
          ""
        )}
        <form className="form-register" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input type="text" name="username" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input type="email" name="email" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Clave</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input type="submit" value="Regitrar" className="btn btn-sucess" />
        </form>
      </div>
    </>
  );
}
