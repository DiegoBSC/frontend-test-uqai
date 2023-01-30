import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { SerializeForm } from "../../helpers/SerializeForm";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";

export default function UserEdit() {
  const { auth, setAuth } = useAuth();

  const [saved, setSaved] = useState("not_saved");
  const updateUser = async (e) => {
    e.preventDefault();

    let newDataUser = SerializeForm(e.target);
    delete newDataUser.file0;

    const request = await fetch(Global.url + "v1/user/" + auth.id, {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (request.status == 200) {
      setSaved("saved");
      setAuth(data);
    } else {
      setSaved("error");
    }

    const fileInput = document.querySelector("#file");

    if (request.status == 200 && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const uploadRequest = await fetch(Global.url + "v1/user/upload-image?typeFile=USER&userId="+ data.id, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const uploadData = await uploadRequest.json();

      data.avatar = uploadData.fieldUpdate;

      if(uploadRequest.status == 201){
        setAuth(data)
        setSaved("saved")
      }
    }
  };

  return (
    <>
      <header className="content__header content__header__public">
        <h1 className="content__title">Editar usuario</h1>
      </header>

      <div className="content__post">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            Usuario actualizado correctamente
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">Usuario no actualizado</strong>
        ) : (
          ""
        )}
        <form className="form-update-user" onSubmit={updateUser}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input type="text" name="username" defaultValue={auth.username} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input type="email" name="email" defaultValue={auth.email} />
          </div>

          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
            <div className="general-info__container-avatar">
              <img
                src={auth.avatar != null ? auth.avatar : avatar}
                className="container-avatar__img"
                alt="Foto de perfil"
              />
            </div>
            <br />
            <input type="file" name="file0" id="file" />
          </div>
          <br />
          <input type="submit" value="Regitrar" className="btn btn-sucess" />
        </form>
      </div>
    </>
  );
}
