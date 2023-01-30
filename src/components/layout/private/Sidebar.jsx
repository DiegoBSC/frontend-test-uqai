import React, { useState } from "react";

import useAuth from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";

export const Sidebar = () => {
  const {
    auth,
    carsTotal,
    brandsTotal,
    usersTotal,
    dataAllBrands,
    setCarsTotal,
  } = useAuth();
  const { form, changed } = useForm({});
  const [stored, setStored] = useState("not_stored");
  var selectedBrand = dataAllBrands[0];
  var statusSelected = "NEW";

  const handleBrand = (event) => {
    selectedBrand = dataAllBrands[event.target.value];
  };

  const handleStatus = (event) => {
    statusSelected = event.target.value;
  };

  const saveCars = async (e) => {
    e.preventDefault();

    let newCar = form;
    newCar.brand = selectedBrand;
    newCar.status = statusSelected;

    const requestCar = await fetch(Global.url + "v1/car", {
      method: "POST",
      body: JSON.stringify(newCar),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await requestCar.json();

    if (requestCar.status == 200) {
      setCarsTotal(carsTotal + 1);
      setStored("stored");
    } else {
      setStored("error");
    }

    const fileInput = document.querySelector("#file");

    if (requestCar.status == 200 && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const uploadRequest = await fetch(
        Global.url + "v1/car/upload-image?typeFile=CAR&carId=" + data.id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (uploadRequest.status == 201) {
        setStored("stored");
      } else {
        setStored("error");
      }

      if (requestCar.status == 200 && uploadRequest.status == 201) {
        const formSend = document.querySelector("#form-car");
        formSend.reset();
      }
    }
    window.location.href = window.location.href;
  };

  return (
    <aside className="layout__aside">
      <div className="aside__container">
        <div className="profile-info__stats">
          <div className="stats__following">
            <a href="#" className="following__link">
              <i className="fa-solid fa-car"></i>
              <span className="following__title">Autos</span>
              <span className="following__number">
                {carsTotal > 0 ? carsTotal : 0}
              </span>
            </a>
          </div>
          <div className="stats__following">
            <a href="#" className="following__link">
              <i className="fa-solid fa-star"></i>
              <span className="following__title">Marcas</span>
              <span className="following__number">
                {brandsTotal > 0 ? brandsTotal : 0}
              </span>
            </a>
          </div>

          <div className="stats__following">
            <a href="#" className="following__link">
              <i className="fa-solid fa-users"></i>
              <span className="following__title">Usuarios</span>
              <span className="following__number">
                {usersTotal > 0 ? usersTotal : 0}
              </span>
            </a>
          </div>
        </div>

        <br />
        {stored == "stored" ? (
          <strong className="alert alert-success">
            Automovil guardado correctamente
          </strong>
        ) : (
          ""
        )}
        {stored == "error" ? (
          <strong className="alert alert-danger">Automovil no guardado</strong>
        ) : (
          ""
        )}

        <div className="aside__container-form">
          <h3>Agregar Automovil</h3>
          <br />
          <form
            id="form-car"
            className="container-form__form-post"
            onSubmit={saveCars}
          >
            <div className="form-post__inputs">
              <label htmlFor="name" className="form-post__label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                className="form-post__textarea"
                onChange={changed}
              ></input>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="description" className="form-post__label">
                Descripcion
              </label>
              <textarea
                name="description"
                className="form-post__textarea"
                onChange={changed}
              ></textarea>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="kilometres" className="form-post__label">
                kilómetros
              </label>
              <input
                type="number"
                name="kilometres"
                className="form-post__textarea"
                onChange={changed}
              ></input>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="yearCar" className="form-post__label">
                Año
              </label>
              <input
                type="number"
                name="yearCar"
                className="form-post__textarea"
                onChange={changed}
              ></input>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="brand" className="form-post__label">
                Marca
              </label>
              <select
                name="brand"
                className="form-post__textarea"
                onChange={handleBrand}
              >
                {dataAllBrands.map((element, index) => (
                  <option key={element.id} value={index}>
                    {element.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="status" className="form-post__label">
                Estado
              </label>

              <select
                name="status"
                className="form-post__textarea"
                onChange={handleStatus}
              >
                <option key="NEW" value="NEW">
                  Nuevo
                </option>
                <option key="USE" value="USE">
                  Usado
                </option>
              </select>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="file0" className="form-post__label">
                Fotografia
              </label>
              <input
                type="file"
                name="file0"
                className="form-post__image"
                id="file"
              />
            </div>

            <input
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};
