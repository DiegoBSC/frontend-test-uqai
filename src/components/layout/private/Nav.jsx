import React from "react";
import { Navigate, NavLink } from "react-router-dom";

import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";

export const Nav = () => {
  const { auth } = useAuth();
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/private/cars" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <a href="#" className="list-end__link-image">
            <img
              src={auth.avatar != null ? auth.avatar : avatar}
              className="list-end__img"
              alt="Imagen de perfil"
            />
          </a>
        </li>
        <li className="list-end__item">
          <NavLink to="/private/user-edit" className="list-end__link">
            <i className="fa-solid fa-gear"></i>
            <span className="list-end__name">Perfil</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to="/private/logout" className="list-end__link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name">Cerrar Sesion</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
