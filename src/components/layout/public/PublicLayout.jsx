import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import useAuth from "../../../hooks/useAuth";

export default function PublicLayout() {
  const { auth } = useAuth();
  return (
    <>
      <Header />

      <section className="layout__content">
        {!auth.id ? <Outlet /> : <Navigate to="/private" />}
      </section>
    </>
  );
}
