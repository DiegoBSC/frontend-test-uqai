import React from "react";

import { Route, Routes, BrowserRouter, Navigate, Link } from "react-router-dom";
import { Cars } from "../components/cars/Cars";
import PrivateLayout from "../components/layout/private/PrivateLayout";

import PublicLayout from "../components/layout/public/PublicLayout";
import Login from "../components/users/Login";
import Logout from "../components/users/Logout";
import Register from "../components/users/Register";
import UserEdit from "../components/users/UserEdit";
import { AuthProvider } from "../context/AuthProvider";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" index element={<Register />} />
          </Route>

          <Route path="/private" element={<PrivateLayout />}>
            <Route index element={<Cars />} />
            <Route path="cars" element={<Cars />} />
            <Route path="user-edit" element={<UserEdit />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route
            path="*"
            element={
              <>
                <p>
                  <h1>Ups!! La Ruta no existe</h1>
                  <Link to="/">Volver al inicio</Link>
                </p>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
