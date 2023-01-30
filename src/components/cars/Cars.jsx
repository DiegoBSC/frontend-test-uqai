import React, { useEffect, useState } from "react";

import avatar from "../../assets/img/car-default.png";

import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Cars = () => {
  const { setCarsTotal } = useAuth();
  const token = localStorage.getItem("token");

  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars(page);
  }, []);

  const getCars = async (nextPage, newcharge = false) => {
    setLoading(true);
    const requestCars = await fetch(
      Global.url + "v1/car?page=" + nextPage + "&size=5",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await requestCars.json();
    if (requestCars.status == 200) {
      let newCars = data.content;

      if (!newcharge && cars.length >= 1) {
        newCars = [...cars, ...data.content];
      }

      if (newcharge) {
        newCars = data.content;
      }

      setCars(newCars);

      setLoading(false);
      setCarsTotal(data.totalElements);

      if (newCars.length >= data.totalElements) {
        setMore(false);
      }
    }
  };

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getCars(next);
  };

  const deleteCar = async (carId) => {
    const requestDelete = await fetch(Global.url + "v1/car/" + carId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (requestDelete.status == 200) {
      setPage(0);
      setMore(true);
      getCars(0, true);
    }
  };

  const chargeBatchCars = async () => {
    setLoading(true);
    const fileInput = document.querySelector("#file");

    if (fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const uploadRequest = await fetch(
        Global.url + "v1/car/upload-data-cars",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (uploadRequest.status == 200) {
        setPage(0);
        setMore(true);
        getCars(0, true);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div class="fa-3x">
          <span>Cargando..</span>
          <i class="fas fa-sync fa-spin"></i>
        </div>
      ) : (
        <header className="content__header">
          <div>
            <label htmlFor="file">Carga Masiva: &nbsp;&nbsp;</label>
          </div>
          <div>
            <input type="file" id="file" name="file" />
          </div>
          <div>
            <button onClick={chargeBatchCars}>Cargar</button>
          </div>
        </header>
      )}
      <h3>Automoviles</h3>

      {cars.map((car) => {
        return (
          <article className="content__posts" key={car.id}>
            
            <div className="posts__post">
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    <img
                      src={car.image != null ? car.image : avatar}
                      className="post__user-image"
                      alt="Foto del auto"
                    />
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {car.name}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <b>Precio:$</b> {car.price}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <b>Marca:</b> {car.brand.name}
                    </a>
                  </div>
                  <div className="post__user-info">
                    <a href="#" className="user-info__create-date">
                      <b>Año:</b> {car.yearCar}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      <b>Kilometraje:</b> {car.kilometres}
                    </a>
                  </div>
                  <h4 className="post__content">{car.description}</h4>
                </div>
              </div>

              <div className="post__buttons">
                <button
                  onClick={() => deleteCar(car.id)}
                  className="post__button"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </article>
        );
      })}

      {loading ? <div>Cargando...</div> : ""}

      {more && (
        <div className="content__container-btn">
          <button className="content__button" onClick={nextPage}>
            Mostrar mas
          </button>
        </div>
      )}
    </>
  );
};
