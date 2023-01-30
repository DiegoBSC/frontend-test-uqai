import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import useAuth from "../../../hooks/useAuth";

export default function PrivateLayout() {
  const { auth, loading } = useAuth();

  if (loading) {
    return(<h1>Cargando.....</h1>)
  } else {
    return (
      <>
        <Header />
        <section className="layout__content">
          {auth.id ? <Outlet /> : <Navigate to="/login" />}
        </section>
        <Sidebar/>
      </>
    );
  }
}
